import React, { useEffect, useRef } from 'react';
import { Hands } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';

const HandTracker: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current!;
    const canvasElement = canvasRef.current!;
    const canvasCtx = canvasElement.getContext('2d')!;

    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          for (const landmark of landmarks) {
            const x = landmark.x * canvasElement.width;
            const y = landmark.y * canvasElement.height;
            canvasCtx.fillStyle = 'red';
            canvasCtx.fillRect(x - 2, y - 2, 4, 4);
          }
        }
      }
    });

    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({ image: videoElement });
      },
      width: 1280,
      height: 720,
    });

    camera.start();

    return () => {
      hands.close();
      camera.stop();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <video ref={videoRef} style={{ display: 'none' }} autoPlay />
      <canvas ref={canvasRef} width="1280" height="720" style={{ border: '1px solid black' }} />
    </div>
  );
};

export default HandTracker;
