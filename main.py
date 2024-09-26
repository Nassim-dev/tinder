import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi import UploadFile
from algo.nsfw import nsfw
from algo.score import calculate_matching_score, adjust_elo_score
from algo.models import User
import tempfile
import logging

logging.basicConfig(level=logging.INFO)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"message": "Invalid request body"},
    )

@app.get("/")
async def hello():
    return {"message": "Hello World"}


@app.post("/nsfw")
async def nsfw_content(pic: UploadFile):
    logging.info(f"Received file {pic.filename}")
    try:
        contents = await pic.read()
        with (tempfile.NamedTemporaryFile(
            delete=False, suffix=os.path.splitext(pic.filename)[1]) as
            tmp_file):
            tmp_file.write(contents)
            temp_file_path = tmp_file.name
        inappropriate = nsfw(temp_file_path)
        os.remove(temp_file_path)
        return inappropriate
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Une erreur est survenue : {e}"},
        )


@app.get("/matching")
async def matching(user_a: dict, user_b: dict):
    logging.info(f"Received user_a {user_a} and user_b {user_b}")
    try:
        user_a['interests'] = set(user_a['interests'])
        user_b['interests'] = set(user_b['interests'])
        user1 = User.UserModel(**user_a)
        user2 = User.UserModel(**user_b)
        match_score = calculate_matching_score(user1, user2)
        return match_score
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Une erreur est survenue : {e}"},
        )


@app.get("/elo")
async def elo(elo_a: int, elo_b: int, liked_by_user_a: int = 1):
    logging.info(f"Received user_a {elo_a} and user_b {elo_b}")
    try:
        new_elos = adjust_elo_score(elo_a, elo_b, liked_by_user_a)
        return {"elo_a": new_elos[0], "elo_b": new_elos[1]}
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Une erreur est survenue : {e}"},
        )
