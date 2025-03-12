import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import Model from './Model'
import useModelStore from '../store/store' // Import Zustand store
import LoadingAnimation from './LoadingAnimation'
import { useEffect } from 'react'

function ModelViewer () {
  const { selectedModel, loading, setLoading } = useModelStore() // Zustand store

  
  return (
    <div style={{ flex: 1, height: '500px' }}>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={2} />
          <directionalLight position={[5, 5, 5]} castShadow />
          <OrbitControls />

          {selectedModel && (
            <group>
              <Model
                path={`http://localhost:5000${selectedModel.filepath}`}
                position={[-2, 0, 0]}
                scale={1}
              />

              <Html position={[2, 0, 0]}>
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
      )}
    </div>
  )
}
export default ModelViewer
