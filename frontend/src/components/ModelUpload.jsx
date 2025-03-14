import { useState } from 'react'
import axios from 'axios'
import Scene from '../components/Scene'
import useModelStore from '../store/store'
import ModelViewer from './ModelViewer'
import {
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Box,
  Grid,
  Divider
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { BASE_URL } from '../config'

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
        `${BASE_URL}/upload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      alert('File uploaded successfully!')
      addModel(response.data) // Update Zustand store dynamically
      setName('')
      setModelInfo('')
      setFile(null)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    }
  }

  return (
    <Grid
      container
      sx={{ height: '100vh', padding: 3, backgroundColor: '#F7F9FC' }}
      spacing={3}
    >
      {/* Left Section (Upload & Model List) */}
      <Grid item xs={3}>
        <Stack spacing={3}>
          {/* Upload Section */}
          <Paper
            elevation={5}
            sx={{
              padding: '20px',
              backgroundColor: '#FBF8EF',
              borderRadius: '12px',
              boxShadow: '4px 4px 10px rgb(0, 0, 0)',
              width: '80%'
            }}
          >
            <Typography
              variant='h5'
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '15px'
              }}
            >
              Upload Model
            </Typography>

            <Stack spacing={2}>
              <TextField
                label='Model Name'
                variant='outlined'
                fullWidth
                value={name}
                onChange={e => setName(e.target.value)}
                sx={{
                  backgroundColor: 'white'
                }}
              />

              <TextField
                label='Model Info'
                variant='outlined'
                fullWidth
                value={modelInfo}
                onChange={e => setModelInfo(e.target.value)}
                sx={{
                  backgroundColor: 'white'
                }}
              />

              <input
                type='file'
                accept='.glb'
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id='file-input'
              />
              <label htmlFor='file-input'>
                <Button
                  variant='contained'
                  component='span'
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    backgroundColor: '#1976D2',
                    color: '#FFF',
                    '&:hover': { backgroundColor: '#1565C0' }
                  }}
                >
                  {file ? file.name : 'Choose a File'}
                </Button>
              </label>

              <Button
                variant='contained'
                color='success'
                fullWidth
                onClick={handleUpload}
                sx={{
                  fontWeight: 'bold',
                  padding: '10px',
                  textTransform: 'none'
                }}
              >
                Upload
              </Button>
            </Stack>
          </Paper>

          {/* Model List */}
          <Scene />
        </Stack>
      </Grid>

      {/* Right Side (Model Viewer) */}
      <Grid item xs={9}>
        <Paper
          elevation={4}
          sx={{
            height: '1000px',
            borderRadius: '12px',
            boxShadow: '5px 5px 15px rgba(0,0,0,0.2)',
            padding: 2,
            backgroundColor: '#1976D2'
          }}
        >
          <Typography
            variant='h5'
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '10px'
            }}
          >
            Rendered Model
          </Typography>
          {/* <Divider sx={{ marginBottom: '10px' }} /> */}
          <ModelViewer />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ModelUpload
