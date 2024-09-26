from pydantic import BaseModel, Field, confloat, conint
from typing import Dict, Set, Tuple
from datetime import datetime

class UserModel(BaseModel):
    user_id: int
    physical_traits: Dict[str, str]
    interests: Set[str]
    location: Tuple[float, float]
    activity_level: confloat(ge=0, le=1)
    elo_score: conint(ge=0) = 1400
    last_active: datetime = Field(default_factory=datetime.now)
