from datetime import datetime

user1 = User(
    user_id=1,
    physical_traits={'height': 'tall', 'hair_color': 'brown'},
    interests={'music', 'sports', 'travel'},
    location=(48.8566, 2.3522),
    activity_level=0.8,
    elo_score=1450
)

user2 = User(
    user_id=2,
    physical_traits={'height': 'tall', 'hair_color': 'blonde'},
    interests=['music', 'art', 'cooking'],
    location=(48.8566, 2.3622),
    activity_level=0.9,
    elo_score=1380
)


class User:
    def __init__(self, user_id: int, physical_traits: dict, interests: list,
                 location: tuple, activity_level: float, elo_score: int=1400,
                 last_active=None):
        self.user_id = user_id
        self.physical_traits = physical_traits
        self.interests = interests
        self.location = location
        self.activity_level = activity_level
        self.elo_score = elo_score
        self.creation_date = datetime.now()
        self.last_active = last_active if last_active else datetime.now()
