import { create } from "zustand";
import axios from "axios";

const useModelStore = create((set) => ({
  models: [],
  selectedModel: null,

  fetchModels: async () => {
    try {
      const response = await axios.get("http://localhost:5000/models");
      set({ models: response.data });
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  },

  selectModel: (model) => set({ selectedModel: model }),

  addModel: (newModel) => set((state) => ({ models: [...state.models, newModel] })),
}));

export default useModelStore;
