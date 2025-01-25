import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const Camera = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Camera Capture</h1>

      {!capturedImage ? (
        <div className="relative">
          
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="border rounded shadow-md"
          />
          <button
            onClick={capturePhoto}
            
          >
            Capture Photo
          </button>
        </div>
      ) : (
        <div className="text-center">
         
          <img src={capturedImage} alt="Captured" className="border rounded shadow-md" />
          <button
            onClick={() => setCapturedImage(null)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded shadow"
          >
            Retake Photo
          </button>
        </div>
      )}
    </div>
  );
};

export default Camera;
