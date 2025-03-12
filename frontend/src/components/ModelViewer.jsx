import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import Model from './Model'
import useModelStore from '../store/store' // Import Zustand store

function ModelViewer () {
  const { selectedModel, selectModel } = useModelStore() // Zustand store
  return (
    <div style={{ flex: 1, height: '500px' }}>
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} castShadow />
        <OrbitControls />

        {selectedModel && (
          <group>
            <Model
              path={`http://localhost:5000${selectedModel.filepath}`}
              position={[0, 0, 0]}
              scale={1}
            />

            <Html position={[0, 2, 0]}>
              <div
                style={{
                  background: 'white',
                  padding: '5px',
                  borderRadius: '5px'
                }}
              >
                <strong>Name:</strong> {selectedModel.filename}
                <br />
                <strong>Model Info:</strong> {selectedModel.model_info}
              </div>
            </Html>
          </group>
        )}
      </Canvas>
    </div>
  )
}
export default ModelViewer
