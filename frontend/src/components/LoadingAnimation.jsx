import { CircularProgress } from '@mui/material'
import useModelStore from '../store/store'
function LoadingAnimation () {
    const {loading}=useModelStore();
  return (
    <>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%'
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  )
}
export default LoadingAnimation