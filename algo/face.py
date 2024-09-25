from PIL import Image
from facenet_pytorch import MTCNN

def face(image_path):
    img = Image.open(image_path)
    mtcnn = MTCNN()
    boxes, probs = mtcnn.detect(img)
    return boxes is not None and len(boxes) > 0
