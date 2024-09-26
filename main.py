import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi import UploadFile
from algo import nsfw
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

@app.post("/profil")
async def profile_content(pic: UploadFile):
    logging.info(f"Received file {pic.filename}")
    try:
        contents = await pic.read()
        with (tempfile.NamedTemporaryFile(
            delete=False, suffix=os.path.splitext(pic.filename)[1]) as
            tmp_file):
            tmp_file.write(contents)
            temp_file_path = tmp_file.name
        profile = profil(temp_file_path)
        os.remove(temp_file_path)
        return profile
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"message": f"Une erreur est survenue : {e}"},
        )
