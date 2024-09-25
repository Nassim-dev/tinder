import math

WEIGHTS = {
    'phy': 0.35,
    'int': 0.30,
    'dist': 0.20,
    'elo': 0.10,
    'act': 0.05
}

def calculate_physical_compatibility(user_a, user_b):
    common_traits = 0
    total_traits = len(user_a.physical_traits)
    for trait in user_a.physical_traits:
        if trait in user_b.physical_traits and user_a.physical_traits[trait] == \
                user_b.physical_traits[trait]:
            common_traits += 1
    compatibility = common_traits / total_traits if total_traits > 0 else 0
    return compatibility


def calculate_interest_similarity(user_a, user_b):
    common_interests = user_a.interests.intersection(user_b.interests)
    total_interests = user_a.interests.union(user_b.interests)
    similarity = len(common_interests) / len(
        total_interests) if total_interests else 0
    return similarity


def calculate_geographical_proximity(user_a, user_b):
    lat1, lon1 = user_a.location
    lat2, lon2 = user_b.location
    distance = math.hypot(lat2 - lat1, lon2 - lon1)
    max_distance = 100
    proximity = 1 - min(distance / max_distance, 1)
    return proximity


def calculate_elo_compatibility(user_a, user_b):
    max_elo_difference = 400
    elo_difference = abs(user_a.elo_score - user_b.elo_score)
    normalized_difference = min(elo_difference / max_elo_difference, 1)
    compatibility = 1 - normalized_difference
    return compatibility


def calculate_activity_level(user_a, user_b):
    average_activity = (user_a.activity_level + user_b.activity_level) / 2
    return average_activity


def calculate_matching_score(user_a, user_b):
    phy = calculate_physical_compatibility(user_a, user_b)
    interests = calculate_interest_similarity(user_a, user_b)
    dist = calculate_geographical_proximity(user_a, user_b)
    elo = calculate_elo_compatibility(user_a, user_b)
    act = calculate_activity_level(user_a, user_b)

    total_score = (
            WEIGHTS['phy'] * phy +
            WEIGHTS['int'] * interests +
            WEIGHTS['dist'] * dist +
            WEIGHTS['elo'] * elo +
            WEIGHTS['act'] * act
    )
    return total_score


def adjust_elo_score(user_a, user_b, result):
    expected_a = 1 / (1 + 10 ** ((user_b.elo_score - user_a.elo_score) / 400))
    expected_b = 1 - expected_a
    user_a.elo_score += K_a * (result - expected_a)
    user_b.elo_score += K_b * ((1 - result) - expected_b)


if __name__ == "__main__":
    user1 = User(
        user_id=1,
        physical_traits={'height': 'tall', 'hair_color': 'brown'},
        interests={'music', 'sports', 'travel'},
        location=(48.8566, 2.3522),  # Paris
        activity_level=0.8,
        elo_score=1450
    )

    user2 = User(
        user_id=2,
        physical_traits={'height': 'tall', 'hair_color': 'blonde'},
        interests={'music', 'art', 'cooking'},
        location=(48.8566, 2.3622),  # Paris, légèrement décalé
        activity_level=0.9,
        elo_score=1380
    )

    # Calcul du score de matching
    match_score = calculate_matching_score(user1, user2)
    print(f"Score de matching entre User1 et User2: {match_score:.2f}")

    # Simulation d'une interaction (User1 aime User2)
    result = 1  # 1 pour un match, 0 pour un rejet
    adjust_elo_score(user1, user2, result)
    print(f"Nouveau score Elo de User1: {user1.elo_score:.2f}")
    print(f"Nouveau score Elo de User2: {user2.elo_score:.2f}")
