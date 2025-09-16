import React, { useState, useRef } from "react";

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setCameraOn(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 400, 300);
    const dataUrl = canvasRef.current.toDataURL("image/png");
    setImage(dataUrl);
    stopCamera();
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) stream.getTracks().forEach(track => track.stop());
    setCameraOn(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleScan = () => {
    if (!image) return alert("Please upload or capture an image first!");
    setResult("📜 Scanned result: This is the detected text or object from AI.");
  };

  return (
    <div className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Capture Cultural Item</h1>

      {/* Camera + Upload Options */}
      <div className="flex flex-col gap-4 mb-6">
        {!cameraOn && (
          <button
            onClick={startCamera}
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-lg shadow hover:bg-yellow-700 transition"
          >
            Use Camera
          </button>
        )}

        <label className="w-full cursor-pointer">
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition">
            Upload File
          </div>
        </label>
      </div>

      {/* Camera Preview */}
      {cameraOn && (
        <div>
          <video
            ref={videoRef}
            width="400"
            height="300"
            className="rounded-lg border border-gray-300 mx-auto"
          ></video>
          <button
            onClick={capturePhoto}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Capture
          </button>
        </div>
      )}

      <canvas ref={canvasRef} width="400" height="300" className="hidden"></canvas>

      {/* Image Preview */}
      {image && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Preview:</h3>
          <img
            src={image}
            alt="preview"
            className="max-w-full rounded-lg border border-gray-300 mx-auto"
          />
          <button
            onClick={handleScan}
            className="mt-4 py-2 px-6 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition"
          >
            Scan
          </button>
        </div>
      )}

      {/* Scan Result */}
      {result && (
        <div className="mt-6 p-4 rounded-lg border border-green-500 bg-green-50 text-left">
          <h3 className="text-lg font-semibold text-green-600 mb-1">Result:</h3>
          <p className="text-gray-700">{result}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
