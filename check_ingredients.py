from PIL import Image
import pytesseract
import cv2
import numpy as np
import os
import requests

pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
def display_info(product):
    print("\nIngredients:")
    print(product.get("ingredients_text_en", "No ingredients information available."))
def search_product(product_name):
    
    url = f"https://world.openfoodfacts.org/cgi/search.pl?search_terms={product_name}&search_simple=1&action=process&json=1"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data.get("products"):
            return data["products"]
        else:
            print("No products found.")
            return None
    else:
        print("Error searching for product data. Status code:", response.status_code)
        return None
def preprocess_image(image_path, output_path=None):
    
    image = cv2.imread(image_path)
    if image is None:
        raise FileNotFoundError(f"Image not found at {image_path}")
    
    
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    
    
    _, thresh = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    
    thresh = cv2.resize(thresh, None, fx=2, fy=2, interpolation=cv2.INTER_LINEAR)
    
   
    if output_path:
        cv2.imwrite(output_path, thresh)
    
    return thresh


def cleantext(text):
    return text.strip()


image1_path = r'C:\projects\KnowCode\Knowcode_4Grams\image.png'
preprocessed1_path = r'C:\projects\KnowCode\Knowcode_4Grams\image.png'
image1_preprocessed = preprocess_image(image1_path, preprocessed1_path)
item1_text = pytesseract.image_to_string(image1_preprocessed, config='--psm 6')
item1_clean = cleantext(item1_text)


image2_path = r'C:\projects\KnowCode\Knowcode_4Grams\image.png'
preprocessed2_path = r'C:\projects\KnowCode\Knowcode_4Grams\image.png'
image2_preprocessed = preprocess_image(image2_path, preprocessed2_path)
item2_text = pytesseract.image_to_string(image2_preprocessed, config='--psm 6')
item2_clean = cleantext(item2_text)


print("Text from Image 1:", item1_clean)
print("Text from Image 2:", item2_clean)


print(f"Preprocessed Image 1 saved at: {preprocessed1_path}")
print(f"Preprocessed Image 2 saved at: {preprocessed2_path}")
