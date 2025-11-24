import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SketchPicker } from "react-color";
import "./css/App.css";
import "./css/input.css";
import "./css/CreateLabel.css";

const LabelForm = () => {
  const [labelname, setLabelName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ffffff"); // Initial color
  const [labels, setLabels] = useState([]);
  const { username, project_no } = useParams();

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/get_label/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, project_no }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch labels");
        }

        const data = await response.json();
        setLabels(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching labels:", error);
      }
    };

    fetchLabels();
  }, [username, project_no]);

  const handleLabelNameChange = (e) => {
    setLabelName(e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleSave = async () => {
    try {
      if (!labelname.trim()) {
        alert("Label name cannot be blank");
        return; // Exit function if label name is blank
      }
      const formData = new FormData();
      formData.append("label_name", labelname);
      formData.append("color", selectedColor);

      await axios.post(
        `http://localhost:8000/api/label/${username}/${project_no}`,
        formData
      );

      console.log("Data saved successfully");
      window.location.reload(); // Reload the page after saving
    } catch (error) {
      console.error("Error saving data", error);
    }
  };

  const handleBack = () => {
    window.location.href = `/project/${username}/${project_no}`; // Replace 'dummy-url' with the desired URL
  };
  return (
    
    <div className="page">
      <div className="drop_box_1">
        <div className="drop_box_box">
          <div className="drop_box_head">
            <h1>Create Label</h1>
            <p>Adding labels with different colors.</p>
          </div>
          <div className="drop_box_body">
            <label htmlFor="labelname" className="input-label">
              <h3>Label Name:</h3>
            </label>
            <input
              type="text"
              id="labelname"
              className="input-field"
              value={labelname}
              onChange={handleLabelNameChange}
            />
            <label htmlFor="color" className="input-label">
              <h3>Select Color:</h3>
            </label>
            <div className="colorpicker">

            <SketchPicker  color={selectedColor} onChange={handleColorChange} />
            </div>
          </div>
        </div>
        <button className="submit-button" onClick={handleSave}>
          Save
        </button>
      </div>
      <button className="back-button" onClick={handleBack}>
        &#8249; Back
      </button>
      <div className="label-list">
        <h1>Existing Labels</h1>
        <table className="label-table">
          <thead>
            <tr>
              <th>Label Name</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {labels.map((label, index) => (
              <tr key={index}>
                <td>{label.Label_Name}</td>
                <td>
                  <div
                    className="color-dot"
                    style={{ backgroundColor: `#${label.Colour.slice(1)}` }}
                  ></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default LabelForm;
