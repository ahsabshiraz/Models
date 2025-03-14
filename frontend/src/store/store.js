import { create } from 'zustand'
import axios from 'axios'
import { BASE_URL } from '../config'

const useModelStore = create(set => ({
  models: [],
  selectedModel: null,
  loading: false,

  setLoading: load => {
    set({ loading: true })
    setTimeout(() => {
      set({ loading: false })
    }, 100)
  },

  fetchModels: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/models`)
      set({ models: response.data })
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  },

  selectModel: model => set({ selectedModel: model }),

  addModel: newModel => set(state => ({ models: [...state.models, newModel] })),

  deleteModel: async id => {
    try {
      await axios.delete(`${BASE_URL}/models/${id}`)
      set(state => ({ models: state.models.filter(model => model.id !== id) }))
    } catch (error) {
      console.error('Error deleting model:', error)
    }
  }
}))

export default useModelStore
