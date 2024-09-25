from face import face
from deepface import DeepFace

def detect_face_and_attributes(image_path):
    if face(image_path):
        try:
            analysis = DeepFace.analyze(
                img_path=image_path,
                actions=['age', 'gender'],
                enforce_detection=False
            )
            if isinstance(analysis, list):
                analysis = analysis[0]
            age = analysis.get('age', None)
            gender_data = analysis.get('gender', None)
            if gender_data:
                sexe = max(gender_data, key=gender_data.get)
                return age, sexe
        except Exception as e:
            print(f"Erreur lors de l'analyse de l'image : {e}")
    return None
