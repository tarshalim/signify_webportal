import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import HandTracker from './components/HandTracker';

function TentativeFirst() {
  const { scene } = useGLTF('/TentativeFirst.glb'); 
  return <primitive object={scene} />;
}

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* 3D Model Canvas */}
      <div style={{ flex: 1 }}>
        {/* Button */}
        <button onClick={() => {
          const toggleEvent = new Event('toggleAnimation');
          window.dispatchEvent(toggleEvent);
        }}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px',
          backgroundColor: 'black',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1,
        }}
        >
          Toggle Animation
        </button>

        <Canvas>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 5, 5]} />
            <TentativeFirst />
            <OrbitControls />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
      </div>

      {/* Hand Tracker */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <HandTracker />
      </div>
    </div>
  );
}

export default App;
