import { useGLTF } from '@react-three/drei'

const Model = ({ path, position, scale }) => {
  const { scene } = useGLTF(path) 
  return <primitive object={scene} scale={scale} position={position} />
}

export default Model
