import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, Send } from "lucide-react";

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [chat, setChat] = useState([
    {
      role: "system",
      content: "📜 Scanned result: This is the detected text or object from AI.",
    },
  ]);
  const [input, setInput] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

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
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());
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
    setScanned(true);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { role: "user", content: input };
    setChat((prev) => [...prev, newMessage]);

    // Fake AI reply
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: `🤖 AI reply to: "${input}"` },
      ]);
    }, 600);

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white p-4 sm:p-6 rounded-2xl shadow-xl mx-auto text-center">
      {!scanned ? (
        <>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Capture Cultural Item
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Upload a picture or use your camera to scan any cultural artifact,
            painting, monument, or document. Our AI will help you identify and
            provide details about it.
          </p>

          {/* Camera + Upload Options */}
          <div className="flex justify-center gap-6 mb-4">
            {!cameraOn && (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={startCamera}
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-orange-600 text-white shadow hover:bg-orange-700 transition active:scale-95"
                >
                  <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <span className="text-xs text-gray-500">Use Camera</span>
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              <label className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow hover:bg-gray-300 cursor-pointer transition active:scale-95">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
              </label>
              <span className="text-xs text-gray-500">Upload File</span>
            </div>
          </div>

          {/* Camera Preview */}
          {cameraOn && (
            <div>
              <video
                ref={videoRef}
                width="280"
                height="200"
                className="rounded-lg border border-gray-300 mx-auto"
              ></video>
              <button
                onClick={capturePhoto}
                className="mt-4 py-2 px-4 sm:px-6 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition active:scale-95 text-sm sm:text-base"
              >
                📸 Capture Photo
              </button>
            </div>
          )}

          <canvas
            ref={canvasRef}
            width="400"
            height="300"
            className="hidden"
          ></canvas>

          {/* Image Preview */}
          {image && (
            <div className="mt-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                Preview:
              </h3>
              <img
                src={image}
                alt="preview"
                className="max-w-[90%] sm:max-w-xs rounded-lg border border-gray-300 mx-auto"
              />
              <button
                onClick={handleScan}
                className="mt-4 py-2 px-6 sm:px-8 bg-orange-500 text-white rounded-lg shadow hover:bg-orange-600 transition active:scale-95 text-sm sm:text-base"
              >
                Scan Now
              </button>
            </div>
          )}
        </>
      ) : (
        // Split layout after scan
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Left Side - Image */}
          <div className="flex flex-col items-center justify-center h-[40vh] md:h-[60vh]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              Scanned Image
            </h3>
            <img
              src={image}
              alt="scanned"
              className="max-w-full max-h-[30vh] md:max-h-[50vh] rounded-lg border border-gray-300"
            />
          </div>

          {/* Right Side - Details + Chat */}
          <div className="flex flex-col h-[40vh] md:h-[60vh]">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              AI Details
            </h3>

            {/* Chat Box */}
            <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50 space-y-3">
              {chat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-2xl max-w-[80%] break-words text-sm sm:text-base ${
                    msg.role === "user"
                      ? "bg-blue-100 text-blue-800 self-end ml-auto text-right"
                      : "bg-green-100 text-green-800 self-start mr-auto"
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input Box */}
            <div className="mt-2 sm:mt-3 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="flex-1 border rounded-full px-3 sm:px-4 py-2 text-gray-600 text-sm focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 active:scale-95"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
