import { useEffect, useState } from 'react'
import axios from 'axios'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import Model from './Model'

const Scene = () => {
  const [models, setModels] = useState([])
  const [selectedModel, setSelectedModel] = useState(null) // Track selected model

  useEffect(() => {
    axios
      .get('http://localhost:5000/models')
      .then(response => {
        setModels(response.data)
      })
      .catch(err => console.log('error->', err))
  }, [])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Left: Model List */}
      <div style={{ width: '200px', textAlign: 'left' }}>
        <h3>Model List</h3>
        {models.length > 0 ? (
          models.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model)}
              style={{
                display: 'block',
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                cursor: 'pointer',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px'
              }}
            >
              {model.filename}
            </button>
          ))
        ) : (
          <p>No models uploaded</p>
        )}
      </div>

      {/* Right: 3D Model Viewer */}
      <div style={{ flex: 1, height: '500px' }}>
        <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} />
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
                  <strong>Name:</strong>
                  {selectedModel.filename}
                  <br />
                  <strong>model_Info:</strong> {selectedModel.model_info}
                </div>
              </Html>
            </group>
          )}
        </Canvas>
      </div>
    </div>
  )
}

export default Scene
