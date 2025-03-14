import { CircularProgress } from '@mui/material'
import useModelStore from '../store/store'
function LoadingAnimation ({progress}) {
  const { loading } = useModelStore()
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%'
      }}
    >
      <CircularProgress />
      <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
        Loading... {Math.round(progress)}%
      </p>
    </div>
  )
}
export default LoadingAnimation
