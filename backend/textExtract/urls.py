from django.urls import path
from .views import OCRView

urlpatterns = [
    path("extract-text/", OCRView.as_view(), name="extract_text"),
]
