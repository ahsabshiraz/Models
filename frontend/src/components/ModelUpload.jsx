import { useState } from 'react'
import axios from 'axios'
import Scene from '../components/Scene'
import useModelStore from '../store/store'
import '../App.css'

const ModelUpload = () => {
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [modelInfo, setModelInfo] = useState('')
  const { addModel } = useModelStore()

  const handleFileChange = e => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return alert('Please select a file!')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('model_info', modelInfo)
    try {
      const response = await axios.post(
        'http://localhost:5000/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      alert('File uploaded successfully!')
      addModel(response.data) // Update Zustand store dynamically
      setName('')
      setModelInfo('')
    } 
    catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Upload Model File</h2>
      <input
        type='text'
        placeholder='Model Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Model Info'
        value={modelInfo}
        onChange={e => setModelInfo(e.target.value)}
      />
      {/* New field */}
      <input type='file' accept='.glb'  onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <h2>Rendered Models</h2>
      <Scene />
    </div>
  )
}

export default ModelUpload
