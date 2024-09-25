import numpy as np
from keras.preprocessing import image
from keras.applications import EfficientNetB0
from keras.applications.efficientnet import preprocess_input, decode_predictions

model = EfficientNetB0(weights='imagenet')

def nsfw(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)

    preds = model.predict(x)
    decoded_preds = decode_predictions(preds, top=3)[0]
    inappropriate_labels = ['nude', 'weapon', 'violence']
    for pred in decoded_preds:
        label = pred[1].lower()
        if any(word in label for word in inappropriate_labels):
            return True, decoded_preds
    return False, decoded_preds
