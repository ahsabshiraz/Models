import { useEffect, useRef } from 'react'
// import { angleToRadians } from '../../utils/angles'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
export default function Three () {



  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 1, 5]} />
      <OrbitControls />

      {/* Ball */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color='#ffffff' />
      </mesh>

      {/* Floor */}
      <mesh rotation={[0, 0, 0]}>
        <planeGeometry args={[7, 7]} />
        <meshStandardMaterial color='#1ea3d8' />
      </mesh>

      {/* Ambient Ligth */}
      <ambientLight args={['#ffffff', 1]} />
    </>
  )
}
