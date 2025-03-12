import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import Model from "./Model";
import useModelStore from "../store/store"; // Import Zustand store

const Scene = () => {
  const { models, selectedModel, fetchModels, selectModel } = useModelStore(); // Zustand store

  useEffect(() => {
    fetchModels(); // Fetch models when the component mounts
  }, [fetchModels,models]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Left: Model List */}
      <div style={{ width: "200px", textAlign: "left" }}>
        <h3>Model List</h3>
        {models.length > 0 ? (
          models.map((model) => (
            <button
              key={model.id}
              onClick={() => selectModel(model)} // Set selected model
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                margin: "5px 0",
                cursor: "pointer",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {model.filename}
            </button>
          ))
        ) : (
          <p>No models uploaded</p>
        )}
      </div>

      {/* Right: 3D Model Viewer */}
      <div style={{ flex: 1, height: "500px" }}>
        <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} castShadow />
          <OrbitControls />

          {selectedModel && (
            <group>
              <Model
                path={`http://localhost:5000${selectedModel.filepath}`}
                position={[0, 0, 0]}
                scale={1}
              />

              <Html position={[0, 2, 0]}>
                <div
                  style={{
                    background: "white",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <strong>Name:</strong> {selectedModel.filename}
                  <br />
                  <strong>Model Info:</strong> {selectedModel.model_info}
                </div>
              </Html>
            </group>
          )}
        </Canvas>
      </div>
    </div>
  );
};

export default Scene;
