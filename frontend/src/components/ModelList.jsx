import useModelStore from '../store/store'
import { useEffect } from 'react'

function ModelList () {
  const { models, selectModel, fetchModels, deleteModel, setLoading } =
    useModelStore()

  useEffect(() => {
    fetchModels() // Fetch models when the component mounts
  }, [models]) // if model changes re-render this components

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Left: Model List */}
      <div style={{ width: '250px', textAlign: 'left' }}>
        <h3>Model List</h3>
        {models.length > 0 ? (
          models.map(model => (
            <div
              key={model.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}
            >
              <button
                onClick={() => {
                  selectModel(model)
                  setLoading(true)
                }}
                style={{
                  flexGrow: 1,
                  padding: '10px',
                  cursor: 'pointer',
                  backgroundColor: '#007BFF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                {model.filename}
              </button>
              <button
                onClick={() => deleteModel(model.id)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px'
                }}
              >
                🗑
              </button>
            </div>
          ))
        ) : (
          <p>No models uploaded</p>
        )}
      </div>
    </div>
  )
}

export default ModelList
