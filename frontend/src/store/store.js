import { create } from 'zustand'
import axios from 'axios'
import { useEffect } from 'react'

const useModelStore = create(set => ({
  models: [],
  selectedModel: null,
  loading: false,

  setLoading: load => {
    set({ loading: true })
    setTimeout(() => {
      set({ loading: false })
    }, 3000)
  },

  fetchModels: async () => {
    try {
      const response = await axios.get('https://threed-models-viewer-backend.onrender.com/models')
      set({ models: response.data })
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  },

  selectModel: model => set({ selectedModel: model }),

  addModel: newModel => set(state => ({ models: [...state.models, newModel] })),

  deleteModel: async id => {
    try {
      await axios.delete(`https://threed-models-viewer-backend.onrender.com/models/${id}`)
      set(state => ({ models: state.models.filter(model => model.id !== id) }))
    } catch (error) {
      console.error('Error deleting model:', error)
    }
  }
}))

export default useModelStore
