import React, { useRef, useState } from "react";

const VideoFrameCapture = ({ videoSrc, captureTime }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState("");

  const captureFrame = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Ensure the canvas dimensions match the video frame
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to the canvas
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas content to a data URL
    const frameUrl = canvas.toDataURL("image/png");
    setImageSrc(frameUrl); // Save the frame URL to display as an image
  };

  const handleLoadMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = captureTime; // Set time for frame capture
    }
  };

  return (
    <div>
      {/* Video Element (hidden) */}
      <video
        ref={videoRef}
        src={videoSrc}
        crossOrigin="anonymous"
        onLoadedMetadata={handleLoadMetadata}
        onSeeked={captureFrame} // Trigger capture on seek completion
        style={{ display: "none" }}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Display Captured Frame */}
      {imageSrc && <img src={imageSrc} alt="Captured Frame" className="w-full h-80 object-cover object-center" />}
    </div>
  );
};

export default VideoFrameCapture;
