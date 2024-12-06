import { useState, Suspense } from 'react'

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';

function TentativeFirst() {
  const { scene } = useGLTF('/TentativeFirst.glb'); 
  return <primitive object={scene} />;
}



function App() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} />
        <TentativeFirst />
        <OrbitControls />
      </Suspense>
      <Environment preset='sunset'/>
    </Canvas>
  );
}
export default App;
