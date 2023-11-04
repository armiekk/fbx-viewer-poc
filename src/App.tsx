import "./App.css";
import { Canvas } from "@react-three/fiber";
import { CameraControls, useFBX, useAnimations } from "@react-three/drei";
import { Suspense, useEffect } from "react";

function Scene() {
  // const [time, setTime] = useState(0);
  const fbxModel = useFBX("/models/kgirls01/source/kgirls01.fbx");
  const { ref, actions, names } = useAnimations(fbxModel.animations);
  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    if (actions) {
      actions[names[0]]?.reset().play();
    }
    // In the clean-up phase, fade it out
    return () => {
      actions[names[0]]?.fadeOut(0.5);
    };
  }, [actions, names]);
  return (
    <primitive
      ref={ref}
      position={[0, 0, 0]}
      isObject3D={true}
      object={fbxModel}
      scale={[0.01, 0.01, 0.01]}
      dispose={null}
    />
  );
}

function App() {
  return (
    <div className="App">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight />
          <Scene />
          <CameraControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
