import { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import "./Camera.scss";

const PUBLISHABLE_ROBOFLOW_API_KEY = "rf_qeoCYggHRcaizXJUAb11SGfdHy43";
const PROJECT_URL = "bottle-cap-color-detection";
const MODEL_VERSION = "9";

const Roboflow = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  var inferRunning;
  var model;

  const startInfer = () => {
    inferRunning = true;
    window.roboflow
      .auth({
        publishable_key: PUBLISHABLE_ROBOFLOW_API_KEY,
      })
      .load({
        model: PROJECT_URL,
        version: MODEL_VERSION,
        onMetadata: function (m) {
          console.log("model loaded");
        },
      })
      .then((loadedModel) => {
        model = loadedModel;
        inferenceLoop();
      });
  };

  useEffect(startInfer, []);

  const inferenceLoop = () => {
    setInterval(() => {
      if (inferRunning) detect();
    }, 10);
  };

  const detect = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      adjustCanvas(videoWidth, videoHeight);

      const newDetections = await model.detect(webcamRef.current.video);

      setDetections(newDetections);

      const ctx = canvasRef.current.getContext("2d");
      drawBoxes(newDetections, ctx);
    }
  };

  const adjustCanvas = (w, h) => {
    canvasRef.current.width = w * window.devicePixelRatio;
    canvasRef.current.height = h * window.devicePixelRatio;

    canvasRef.current.style.width = w + "px";
    canvasRef.current.style.height = h + "px";

    canvasRef.current
      .getContext("2d")
      .scale(window.devicePixelRatio, window.devicePixelRatio);
  };

  const drawBoxes = (detections, ctx) => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    detections.forEach((row) => {
      if (true) {
        var temp = row.bbox;
        temp.class = row.class;
        temp.color = row.color;
        temp.confidence = row.confidence;
        row = temp;
      }

      if (row.confidence < 0) return;

      var x = row.x - row.width / 2;
      var y = row.y - row.height / 2;
      var w = row.width;
      var h = row.height;

      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = row.color;
      ctx.rect(x, y, w, h);
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.globalAlpha = 0.2;
      ctx.fillRect(x, y, w, h);
      ctx.globalAlpha = 1.0;

      var fontColor = "black";
      var fontSize = 12;
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      var classTxt = row.class;
      var confTxt = (row.confidence * 100).toFixed().toString() + "%";
      var msgTxt = classTxt + " " + confTxt;
      const textHeight = fontSize;
      var textWidth = ctx.measureText(msgTxt).width;

      if (textHeight <= h && textWidth <= w) {
        ctx.strokeStyle = row.color;
        ctx.fillStyle = row.color;
        ctx.fillRect(
          x - ctx.lineWidth / 2,
          y - textHeight - ctx.lineWidth,
          textWidth + 2,
          textHeight + 1
        );
        ctx.stroke();
        ctx.fillStyle = fontColor;
        ctx.fillText(msgTxt, x + textWidth / 2 + 1, y - 1);
      } else {
        textWidth = ctx.measureText(confTxt).width;
        ctx.strokeStyle = row.color;
        ctx.fillStyle = row.color;
        ctx.fillRect(
          x - ctx.lineWidth / 2,
          y - textHeight - ctx.lineWidth,
          textWidth + 2,
          textHeight + 1
        );
        ctx.stroke();
        ctx.fillStyle = fontColor;
        ctx.fillText(confTxt, x + textWidth / 2 + 1, y - 1);
      }
    });
  };

  return (
    <div className="flex">
      <div className="relative">
        <Webcam
          ref={webcamRef}
          muted={true}
          className="w-full h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      <div className="object-info">
        {detections.map((prediction, index) => (
          <div key={index} className="object-info-item">
            <p>Class: {prediction.class}</p>
            <p>Confidence: {prediction.confidence.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Roboflow;
