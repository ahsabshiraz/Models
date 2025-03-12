import useModelStore from '../store/store'
import { useEffect } from 'react'

function ModelList () {
  const { models, selectModel,fetchModels } = useModelStore()
  useEffect(() => {
    fetchModels() // Fetch models when the component mounts
  }, [fetchModels, models])

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Left: Model List */}
      <div style={{ width: '200px', textAlign: 'left' }}>
        <h3>Model List</h3>
        {models.length > 0 ? (
          models.map(model => (
            <button
              key={model.id}
              onClick={() => selectModel(model)} // Set selected model
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
    </div>
  )
}

export default ModelList
