import os
import google.generativeai as genai

os.environ["GOOGLE_API_KEY"] = "AIzaSyB6O5E2i17vu4AV0g84NReFjW2U8bLCWPg"
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def prep_image(image_path):
    """
    Uploads an image to Gemini and retrieves file details.
    """
    sample_file = genai.upload_file(path=image_path, display_name="Uploaded Image")
    return sample_file


def extract_text_from_image(image_path, prompt):
    """
    Extracts text from the given image using Gemini API.
    """
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        response = model.generate_content([image_path, prompt])
        return response.text
    except Exception as e:
        return f"Error: {str(e)}"
