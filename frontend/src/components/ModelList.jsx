import useModelStore from '../store/store'
import { useEffect } from 'react'
import { Button, Box, Typography, Stack, Paper } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

function ModelList () {
  const { models, selectModel, fetchModels, deleteModel, setLoading } =
    useModelStore()

  useEffect(() => {
    fetchModels() // Fetch models when the component mounts
  }, [models]) // if model changes re-render this components
  return (
    <Paper
      elevation={3}
      sx={{
        padding: '20px',
        width: '80%', // Ensures it takes full width
        textAlign: 'center', // Centers the text
        backgroundColor: '#FBF8EF',
        borderRadius: '8px',
        boxShadow: '4px 4px 10px rgb(0, 0, 0)',
      }}
    >
      <Typography
        variant='h5'
        sx={{
          marginBottom: '15px',
          fontWeight: 'bold',
          color: 'black',
          textAlign: 'center',
          letterSpacing: '1px'
        }}
      >
        Model List
      </Typography>

      <Stack spacing={2} alignItems='center'>
        {' '}
        {/* Centers all elements */}
        {models.length > 0 ? (
          models.map(model => (
            <Stack
              key={model.id}
              direction='row'
              alignItems='center'
              justifyContent='center' // Centers horizontally
              spacing={1}
              sx={{
                width: '100%'
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Centering the buttons
                  gap: '10px',
                  width: '100%'
                }}
              >
                <Button
                  variant='contained'
                  onClick={() => {
                    selectModel(model)
                    setLoading(true)
                  }}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#80CBC4',
                    color: '#441752',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    padding: '6px 10px',
                    borderRadius: '5px',
                    width: '150px', // Ensures consistent button size
                    '&:hover': {
                      backgroundColor: '#FB9EC6'
                    }
                  }}
                >
                  {model.filename}
                </Button>

                <IconButton
                  aria-label='delete'
                  color='error'
                  onClick={() => deleteModel(model.id)}
                  sx={{
                    color: '#3D0301',
                    padding: '5px',
                    borderRadius: '5px'
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          ))
        ) : (
          <Typography
            variant='body1'
            sx={{ textAlign: 'center', color: '#000', fontSize: '14px' }}
          >
            No models uploaded
          </Typography>
        )}
      </Stack>
    </Paper>
  )
}

export default ModelList
