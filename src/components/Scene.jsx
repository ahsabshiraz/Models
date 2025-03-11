import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Model from "./Model"

const models = [
  { path: "models/kawasaki_ninja_h2_free.glb", position: [5, 0, 0], scale: 2 },
  { path: "/models/spiked_war_chest__fantasy_treasure_chest.glb", position: [15, 0, -5], scale: 5 },
  { path: "/models/bmw_m3_e30_dtm.glb", position: [10, 0, 0], scale: 2 },
  { path: "/models/car1.glb", position: [-10, 0, 0], scale: 200 },
  
]

const Scene = () => {
  return (
    <Canvas camera={{ position: [5, 2, 10], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls />
      
      <group>
        {models.map((model, index) => (
          <Model key={index} path={model.path} position={model.position} scale={model.scale} />
        ))}
      </group>
    </Canvas>
  )
}

export default Scene
