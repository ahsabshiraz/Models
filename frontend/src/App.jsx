import { useState } from "react"
import axios from "axios"
import Scene from "./components/Scene"
import './App.css'

const App = () => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!")

    const formData = new FormData()
    formData.append("glb", file)

    await axios.post("http://localhost:5000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })

    alert("File uploaded successfully!")
    window.location.reload()
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Upload GLB File</h2>
      <input type="file" accept=".glb" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Rendered Models</h2>
      <Scene />
    </div>
  )
}

export default App
