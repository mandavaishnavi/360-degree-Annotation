// src/components/InputForm.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./css/App.css";
import "./css/input.css";
import { useParams } from "react-router-dom";

const InputForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { username } = useParams();
  const { project_no } = useParams();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/jpg"];

    if (file && allowedTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert("Please select a valid JPG or JPEG file.");
      setSelectedFile(null);
      e.target.value = null;
    }
  };
  //
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("data", inputValue);
      formData.append("image", selectedFile);

      console.log({ project_no });

      await axios.post(
        `http://localhost:8000/api/save/${username}/${project_no}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Data saved successfully");
      setTimeout(() => {
        navigate(`/project/${username}/${project_no}`);
      }, 500);
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  return (
    <div className="background_1">
      <Link to={`/project/${username}/${project_no}`}>
        <button className="back-button">&#8249; Back</button>
      </Link>
      <div className="drop_box">
        <div className="drop_box_box">
          <div className="drop_box_head">
            <h1>Upload Files</h1>
            <p>Upload panoramic images for labelling.</p>
            <p>Formats allowed: jpg, jpeg</p>
          </div>
          <div className="drop_box_body">
            <label htmlFor="inputValue" className="input-label">
              <h3>Enter Data:</h3>
            </label>
            <input
              type="text"
              id="inputValue"
              className="input-field"
              value={inputValue}
              onChange={handleInputChange}
            />

            <label htmlFor="fileInput" className="file-label">
              <h3>Upload Images:</h3>
            </label>
            <input
              type="file"
              id="fileInput"
              className="file-input"
              onChange={handleFileChange}
            />

            <button className="submit-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
