import ModelList from './ModelList'
import ModelViewer from './ModelViewer'
const Scene = () => {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <ModelList />
      <ModelViewer />
    </div>
  )
}

export default Scene
