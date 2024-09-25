from algo.face import face
import logging
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

logging.basicConfig(level=logging.INFO)


def profil(image_path):
    if face(image_path):
        model = load_model("algo/models/age.h5")
        img = image.load_img(image_path, target_size=(224, 224))
        x = image.img_to_array(img)
        x = np.expand_dims(x, axis=0)
        x = x / 255
        preds = model.predict(x)
        return preds[0][0]
