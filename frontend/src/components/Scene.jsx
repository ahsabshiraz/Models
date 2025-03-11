import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useEffect, useState } from "react"
import axios from "axios"
import Model from "./Model"

const Scene = () => {
  const [models, setModels] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/models").then((res) => {
      setModels(res.data)
    })
  }, [])

  return (
    <Canvas camera={{ position: [5, 2, 10], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />

      {models.map((model, index) => (
        <Model key={index} path={`http://localhost:5000${model.filepath}`} position={[index * 3, 0, 0]} scale={2} />
      ))}
    </Canvas>
  )
}

export default Scene
