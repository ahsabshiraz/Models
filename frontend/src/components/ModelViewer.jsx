import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import Model from './Model'
import useModelStore from '../store/store' // Zustand store
import LoadingAnimation from './LoadingAnimation'
import { useEffect } from 'react'

function ModelViewer() {
  const { selectedModel, loading } = useModelStore() // Zustand store



  return (
    <div
      id="canvas-container"
      style={{
        flex: 1,
        height: '900px',
        position: 'relative',
        backgroundColor: '#F5F5F5',
        borderRadius: '10px',
        boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden'
      }}
    >
      {loading ? (
        <LoadingAnimation />
      ) : (
        <Canvas
          shadows
          camera={{ position: [0, 2, 5], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

          <OrbitControls
            enableZoom={true} // ✅ Allows zooming
            enablePan={true}
            enableRotate={true}
            enableDamping={true}
          />

          {selectedModel ? (
            <group>
              <Model
                path={`https://threed-models-viewer-backend.onrender.com${selectedModel.filepath}`}
                position={[0, -0.8, 0]}
                scale={1}
              />

              <Html position={[1, 0.7, 0] }transform >
                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '2px 2px 6px rgb(0, 0, 0)',
                    textAlign: 'center'
                  }}
                >
                  <strong>Name:</strong> {selectedModel.filename}
                  <br />
                  <strong>Model Info:</strong> {selectedModel.model_info}
                </div>
              </Html>
            </group>
          ) : (
            <Html position={[0, 1, 0]}  transform >
              <div style={{ color: '#666', textAlign: 'center' }}>
                No model selected
              </div>
            </Html>
          )}
        </Canvas>
      )}
    </div>
  )
}

export default ModelViewer
