import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading,setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setPrediction(data.prediction)
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
            <h1>Fruits🍍-Vegetable🍅 Classification</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            {loading && <div>Loading...</div>}
            {/* {imagePreview && (
                <div>
                    <h2>Image Preview:</h2>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: '250px', height: '250px' }}
                    />
                </div>
            )} */}
            {prediction && !loading && (
                <div>

                    <h3>Predicted: {prediction}</h3>
                </div>
            )}
        </div>
  );
}

export default App;
