import { useEffect, useState } from 'react'
import axios from 'axios'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'
import { Html } from '@react-three/drei'
const Scene = () => {
  const [models, setModels] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5000/models')
      .then(response => {
        setModels(response.data)
      })
      .catch(err => console.log("error->",err))
  }, [])

  return (
    <div>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        {models &&
          models.map(model => (
            <group key={model.id}>
              <Model
                path={`http://localhost:5000${model.filepath}`}
                position={[model.id * 3, 0, 0]}
                scale={1}
              />
              <Html position={[model.id * 3, 2, 0]}>
                <div
                  style={{
                    background: 'white',
                    padding: '5px',
                    borderRadius: '5px'
                  }}
                >
                  Name:{model.filename}<br/>
                  model_Info:{model.model_info}
                </div>
              </Html>
            </group>
          ))}
      </Canvas>
    </div>
  )
}

export default Scene
