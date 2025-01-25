from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .gemini_utils import prep_image, extract_text_from_image
import os
import base64

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .gemini_utils import prep_image, extract_text_from_image
import os
import base64

class OCRView(APIView):
    def post(self, request):
        try:
            image_data = request.data.get("image")
            prompt = request.data.get("prompt", "Extract the text in the image verbatim.")

            if not image_data:
                return Response({"error": "Image is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Save the uploaded image temporarily
            image_path = "temp_image.jpg"
            with open(image_path, "wb") as f:
                f.write(base64.b64decode(image_data.split(",")[1]))

            # Process the image using Gemini API
            uploaded_file = prep_image(image_path)
            extracted_text = extract_text_from_image(uploaded_file.uri, prompt)

            os.remove(image_path)  # Clean up temporary file
            return Response({"text": extracted_text}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
