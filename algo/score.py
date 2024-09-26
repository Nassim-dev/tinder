import math

WEIGHTS = {
    'phy': 0.30,
    'int': 0.25,
    'dist': 0.15,
    'elo': 0.25,
    'act': 0.10
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
    max_distance = 10
    proximity = 1 - min(distance / max_distance, 1)
    return proximity


def calculate_elo_compatibility(user_a, user_b):
    max_elo_difference = 50
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
    return round(total_score, 4)


def calculate_k_factor(elo_a: int, elo_b: int):
    base_k = 32
    diff = abs(elo_a - elo_b)
    adjustment = diff / 50 if diff > 100 else 0
    return base_k + adjustment, base_k - adjustment


def adjust_elo_score(elo_a: int, elo_b: int, liked_by_user_a=1):
    expected_a = 1 / (1 + 10 ** ((elo_b - elo_a) / 400))
    k_a, k_b = calculate_k_factor(elo_a, elo_b)

    elo_a_change = k_a * (liked_by_user_a - expected_a)
    elo_b_change = k_b * ((1 - liked_by_user_a) - (1 - expected_a))

    elo_a += round(elo_a_change, 4)
    elo_b += round(elo_b_change, 4)

    return elo_a, elo_b


def activity_level(last_update: int) -> float:
    if last_update <= 0:
        return 1.0
    return max(0.1, min(1.0, 1 - math.log10(1 + last_update / 30)))
