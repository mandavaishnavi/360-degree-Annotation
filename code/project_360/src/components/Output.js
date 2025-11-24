import React, { useState, useRef, useEffect } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";
import "./css/Output.css";

// Toolbox component
const Toolbox = ({
  onToolClick,
  onViewAnnotations,
  showAnnotations,
  onViewSegAnnotations,
  showSegAnnotations,
}) => {
  return (
    <div className="toolbox">
      <div>
        <button className="tool" onClick={() => onToolClick("tool1")}>
          Box Drawing
        </button>
      </div>
      <div>
        <button className="tool" onClick={() => onToolClick("tool2")}>
          Segmentation
        </button>
      </div>
      <div>
        <button className="tool" onClick={onViewAnnotations}>
          {showAnnotations ? "Hide BBA" : "View BBA"}
        </button>
      </div>
      <div>
        <button className="tool" onClick={onViewSegAnnotations}>
          {showSegAnnotations ? "Hide Segmentation" : "View Segmentation"}
        </button>
      </div>
    </div>
  );
};

const Output = () => {
  const [drawingMode, setDrawingMode] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const svgRef = useRef(null);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [labels, setLabels] = useState([]);
  const [path, setPath] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [boxColor, setBoxColor] = useState("#000"); // Default box color
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [selectedSegLabel, setSelectedSegLabel] = useState("");
  const [currentAnnotations, setCurrentAnnotations] = useState([]);
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const [showSegAnnotations, setShowSegAnnotations] = useState(false);
  const [currentSegAnnotations, setCurrentSegAnnotations] = useState([]);
  const imageRef = useRef(null);
  const [cnt, setCnt] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false); // State to control tooltip visibility
  const [currentAnnotation, setCurrentAnnotation] = useState(null); // State to track current annotation
  const [currentSelectedSegAnnotation, setCurrentSelectedSegAnnotation] =
    useState(null);
  const { username, project_no, imageNumber, frame_count } = useParams();
  const [imageheight, setImageh] = useState(1); // State to store image aspect ratio
  const [imagewidth, setImagew] = useState(1); // State to store image aspect ratio

  const maxCount = frame_count;
  const imageUrl = `http://localhost:8000/media/CROP/${username}_${project_no}_${imageNumber}/${cnt}.jpg`;
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (img.height >= 800) {
        const aspectRatio = img.width / img.height;
        setImageh(800);
        setImagew(aspectRatio*800);
      }
      else
      {
        setImageh(img.height);
        setImagew(img.width);


      }
    };
    img.src = imageUrl;
  }, [imageUrl]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Shift") {
        setIsDrawing(true);
      } else if (e.key === "Delete" && selectedAnnotation) {
        handleDeleteAnnotation();
      } else if (e.key === "Delete" && currentSelectedSegAnnotation) {
        handleDeleteSegAnnotation();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        setIsDrawing(false);
        // Log list of coordinates to the console
        console.log("Coordinates:", coordinates);
        // Clear coordinates after drawing
        // setCoordinates([]);
        // setPath([]);
      }
    };
    const handleDeleteAnnotation = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/delete_annotation/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ annotationId: selectedAnnotation.id }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete annotation");
        }

        console.log("Annotation deleted successfully!");
        setCurrentAnnotations((prevAnnotations) =>
          prevAnnotations.filter(
            (annotation) => annotation.id !== selectedAnnotation.id
          )
        );
        setSelectedAnnotation(null);
      } catch (error) {
        console.error("Error deleting annotation:", error);
        alert("Failed to delete annotation. Please try again.");
      }
    };
    const handleDeleteSegAnnotation = async () => {
      try {
        const segAnnotationToDelete = currentSelectedSegAnnotation;

        if (!segAnnotationToDelete) {
          return;
        }

        const response = await fetch(
          `http://localhost:8000/api/delete_seg_annotation/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ annotationId: segAnnotationToDelete.id }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete segmentation annotation");
        }

        console.log("Segmentation annotation deleted successfully!");
        setCurrentSegAnnotations((prevSegAnnotations) =>
          prevSegAnnotations.filter(
            (annotation) => annotation.id !== segAnnotationToDelete.id
          )
        );
        setCurrentSelectedSegAnnotation(null);
        setCurrentAnnotation(null); // Set the current annotation when mouse enters
        setShowTooltip(false); // Hide tooltip when mouse leaves
      } catch (error) {
        console.error("Error deleting segmentation annotation:", error);
        alert("Failed to delete segmentation annotation. Please try again.");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [coordinates, selectedAnnotation, currentSelectedSegAnnotation]);
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

  const handlePrev = () => {
    if (cnt > 1) {
      setCnt(cnt - 1);
      // setCurrentAnnotations();
    }
    setShowAnnotations(false);
    setDrawingMode(null);
    setSelectedAnnotation(null);
    setSelectedLabel("");
    setBoxColor("#000");
    setEndX(0);
    setEndY(0);
    setStartX(0);
    setStartY(0);
    setSelectedSegLabel("");
    setCoordinates([]);
    setPath([]);
    setShowSegAnnotations(false);
    setCurrentSegAnnotations([]);
  };
  const handleAnnotationClick = (annotation) => {
    setSelectedAnnotation(annotation);
  };
  const handleSegAnnotationClick = (annotation) => {
    setCurrentSelectedSegAnnotation(annotation);
  };
  const handleViewSegAnnotations = async () => {
    if (!showSegAnnotations) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/view_seg_annotations/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageNumber, cnt }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch segmentation annotations");
        }

        const data = await response.json();
        console.log("Current segmentation annotations:", data);
        setCurrentSegAnnotations(data);
        setShowSegAnnotations(true);
      } catch (error) {
        console.error("Error fetching segmentation annotations:", error);
        alert("Failed to fetch segmentation annotations. Please try again.");
      }
    } else {
      setShowSegAnnotations(false);
    }
  };
  const handleNext = () => {
    if (cnt < maxCount) {
      setCnt(cnt + 1);
    }
    setShowAnnotations(false);
    setDrawingMode(null);
    setSelectedAnnotation(null);
    setSelectedLabel("");
    setBoxColor("#000");
    setEndX(0);
    setEndY(0);
    setStartX(0);
    setStartY(0);
    setSelectedSegLabel("");
    setCoordinates([]);
    setPath([]);
    setShowSegAnnotations(false);
    setCurrentSegAnnotations([]);
  };
  const handleMouseEnter = (annotation) => {
    setCurrentAnnotation(annotation); // Set the current annotation when mouse enters
    console.log(annotation.label_name);
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setCurrentAnnotation(null); // Set the current annotation when mouse enters
    setShowTooltip(false); // Hide tooltip when mouse leaves
  };
  const handleViewAnnotations = async () => {
    if (!showAnnotations) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/view_annotations/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ imageNumber, cnt }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch annotations");
        }

        const data = await response.json();
        console.log("Current annotations:", data);
        setCurrentAnnotations(data);
        setShowAnnotations(true);
        setDrawingMode(null);
        setSelectedAnnotation(null);
        setSelectedLabel("");
        setBoxColor("#000");
        setEndX(0);
        setEndY(0);
        setStartX(0);
        setStartY(0);
        setSelectedSegLabel("");
        setCoordinates([]);
        setPath([]);
        setShowSegAnnotations(false);
        setCurrentSegAnnotations([]);
      } catch (error) {
        console.error("Error fetching annotations:", error);
        alert("Failed to fetch annotations. Please try again.");
      }
    } else {
      setShowAnnotations(false);
    }
  };
  const handleToolClick = (tool) => {
    console.log("clicked");
    if (tool === "tool1") {
      setDrawingMode("box");
    } else if (tool === "tool2") {
      setDrawingMode("seg");
    } else {
      setDrawingMode(null);
    }
    setShowAnnotations(false);
    setSelectedAnnotation(null);
    setSelectedLabel("");
    setBoxColor("#000");
    setEndX(0);
    setEndY(0);
    setStartX(0);
    setStartY(0);
    setSelectedSegLabel("");
    setCoordinates([]);
    setPath([]);
    setShowSegAnnotations(false);
    setCurrentSegAnnotations([]);
  };

  const handleLabelChange = (selectedOption) => {
    if (drawingMode === "box") {
      setSelectedLabel(selectedOption);
      setBoxColor(selectedOption.color); // Set box color based on selected label
    } else if (drawingMode === "seg") {
      setSelectedSegLabel(selectedOption);
    }
  };

  const handleMouseDown = (event) => {
    if (drawingMode === "box") {
      const rect = imageRef.current.getBoundingClientRect();
      setStartX(event.clientX - rect.left);
      setStartY(event.clientY - rect.top);
      setIsDragging(true);
    }
  };

  const handleMouseUp = () => {
    if (drawingMode === "box" && isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (event) => {
    if (drawingMode === "box" && isDragging) {
      const rect = imageRef.current.getBoundingClientRect();
      setEndX(event.clientX - rect.left);
      setEndY(event.clientY - rect.top);
    }
    if (drawingMode === "seg" && isDrawing) {
      const { offsetX, offsetY } = event.nativeEvent;
      setCoordinates((prevCoordinates) => [
        ...prevCoordinates,
        { x: offsetX, y: offsetY },
      ]);
      const point = { x: offsetX, y: offsetY }; // Use offsetX and offsetY directly
      setPath((prevPath) => [...prevPath, point]);
    }
  };

  const handleBoxSave = async () => {
    if (selectedLabel && endX !== 0 && endY !== 0) {
      const width = Math.abs(endX - startX);
      const height = Math.abs(endY - startY);
      const backendStartX = Math.min(startX, endX);
      const backendStartY = Math.min(startY, endY);

      console.log("Box coordinates:", {
        label: selectedLabel,
        startX: backendStartX,
        startY: backendStartY,
        width,
        height,
      });

      try {
        const response = await fetch(
          `http://localhost:8000/api/save_annotation/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageNumber,
              startX: backendStartX,
              startY: backendStartY,
              width,
              height,
              cnt,
              label: selectedLabel.value,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save annotation");
        }

        console.log("Annotation saved successfully!");
        setSelectedLabel("");
        setBoxColor("#000"); // Reset box color
        setEndX(0);
        setEndY(0);
        setStartX(0);
        setStartY(0);
        setDrawingMode(null);
        // Update annotation info only if it's unique
      } catch (error) {
        console.error("Error saving annotation:", error);
        alert("Failed to save annotation. Please try again.");
      }
    } else {
      alert("Do Annotation Properly");
    }
  };

  const handleSegSave = async () => {
    if (selectedSegLabel && coordinates.length > 0) {
      const newAnnotation = `Frame: ${cnt}, Segmentation label: ${
        selectedSegLabel.value
      }, Coordinates: ${coordinates.map(
        (coord) => `(${coord.x}, ${coord.y})`
      )}`;

      console.log("Segmentation annotation:", newAnnotation);

      try {
        const response = await fetch(
          `http://localhost:8000/api/save_segmentation/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageNumber,
              coordinates,
              cnt,
              label: selectedSegLabel.value,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save segmentation");
        }

        console.log("Segmentation saved successfully!");
        setSelectedSegLabel("");
        setCoordinates([]);
        setPath([]);
        setDrawingMode(null);
      } catch (error) {
        console.error("Error saving segmentation:", error);
        alert("Failed to save segmentation. Please try again.");
      }
    } else {
      alert("Select a label and draw a segmentation properly");
    }
  };
  const handleBoxCancel = () => {
    setSelectedLabel("");
    setBoxColor("#000"); // Reset box color
    setEndX(0);
    setEndY(0);
    setStartX(0);
    setStartY(0);
    setDrawingMode(null);
  };

  const handleSegCancel = () => {
    setSelectedSegLabel("");
    setCoordinates([]);
    setPath([]);
    setDrawingMode(null);
  };

  return (
    <div className="background">
      <div className="output-container">
        {/* Fixed Toolbox */}
        <div className="fixed-toolbox">
          <Toolbox
            onToolClick={handleToolClick}
            onViewAnnotations={handleViewAnnotations}
            showAnnotations={showAnnotations}
            onViewSegAnnotations={handleViewSegAnnotations}
            showSegAnnotations={showSegAnnotations}
          />
          {/* Dynamic dropdown and save/cancel buttons */}
          {drawingMode === "box" && (
            <div className="dynamic-controls">
              <Select
                value={selectedLabel}
                onChange={handleLabelChange}
                options={labels.map((label) => ({
                  value: label.Label_Name,
                  label: (
                    <span>
                      <span style={{ color: label.Colour }}>&#9724;</span>{" "}
                      {/* Set square color */}
                      <span style={{ color: "black" }}>
                        {label.Label_Name}
                      </span>{" "}
                      {/* Set label name color */}
                    </span>
                  ),
                  color: label.Colour,
                }))}
                placeholder="Select Label"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? state.data.color
                      : "white",
                    color: state.isSelected ? "white" : state.data.color,
                    ":hover": {
                      backgroundColor: state.data.color,
                      color: "white",
                    },
                    borderBottom: "0.7px solid #ccd0d2", // Add grey partition between rows
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: state.data.color,
                  }),
                  groupSeparator: (provided) => ({
                    ...provided,
                    borderBottom: "0.7px solid #ccd0d2", // Add grey partition between groups
                  }),
                }}
              />

              <div className="button-container">
                <button className="saveButton" onClick={handleBoxSave}>
                  Save
                </button>
                <button className="cancelButton" onClick={handleBoxCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
          {drawingMode === "seg" && (
            <div className="dynamic-controls">
              <Select
                value={selectedSegLabel}
                onChange={handleLabelChange}
                options={labels.map((label) => ({
                  value: label.Label_Name,
                  label: (
                    <span>
                      <span style={{ color: label.Colour }}>&#9724;</span>{" "}
                      {/* Set square color */}
                      <span style={{ color: "black" }}>
                        {label.Label_Name}
                      </span>{" "}
                      {/* Set label name color */}
                    </span>
                  ),
                  color: label.Colour,
                }))}
                placeholder="Select Label"
                styles={{
                  option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected
                      ? state.data.color
                      : "white",
                    color: state.isSelected ? "white" : state.data.color,
                    ":hover": {
                      backgroundColor: state.data.color,
                      color: "white",
                    },
                    borderBottom: "0.7px solid #ccd0d2", // Add grey partition between rows
                  }),
                  singleValue: (provided, state) => ({
                    ...provided,
                    color: state.data.color,
                  }),
                  groupSeparator: (provided) => ({
                    ...provided,
                    borderBottom: "0.7px solid #ccd0d2", // Add grey partition between groups
                  }),
                }}
              />

              <div className="button-container">
                <button className="saveButton" onClick={handleSegSave}>
                  Save
                </button>
                <button className="cancelButton" onClick={handleSegCancel}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Image Display */}
        <div className="output content">
          <div
            className="output-image-container"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{
              width: `${imagewidth}px`, // Set width based on aspect ratio
              height: `${imageheight}px`, // Fixed height
            }}
          >
            {showAnnotations &&
              currentAnnotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className={`annotation-container ${
                    selectedAnnotation &&
                    selectedAnnotation.id === annotation.id
                      ? "selected"
                      : ""
                  }`}
                  style={{
                    position: "absolute",
                    left: annotation.start_x,
                    top: annotation.start_y,
                    width: annotation.width,
                    height: annotation.height,
                    border: `2px solid ${annotation.label_colour}`,
                    zIndex: "1",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                  data-label={annotation.label_name}
                  onClick={() => handleAnnotationClick(annotation)}
                ></div>
              ))}
            <svg
              className="cursor"
              ref={svgRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 999,
              }}
              width="100%"
              height="100%"
            >
              {path.length > 1 && (
                <path
                  d={`M ${path.map((p) => `${p.x},${p.y}`).join(" L ")}`}
                  fill="none"
                  stroke={selectedSegLabel.color || "red"}
                  strokeWidth="2"
                />
              )}
              {showSegAnnotations &&
                currentSegAnnotations.map((annotation) => (
                  <g
                    key={annotation.id}
                    onMouseEnter={() => handleMouseEnter(annotation)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleSegAnnotationClick(annotation)}
                    style={{ pointerEvents: "all" }} // Set pointer events to "all" to allow interaction
                  >
                    <path
                      d={`M ${annotation.coordinates
                        .map((coord) => `${coord.x},${coord.y}`)
                        .join(" L ")}`}
                      fill="none"
                      stroke={annotation.label_colour}
                      strokeWidth="2"
                    />
                  </g>
                ))}
            </svg>
            <img
              className="output-image"
              src={imageUrl}
              alt={`Description ${cnt}`}
              ref={imageRef}
              style={{ position: "relative" }}
            />
            {showTooltip && currentAnnotation && (
              <div
                className="tooltip"
                style={{
                  position: "absolute",
                  top: currentAnnotation.coordinates[0].y - 25,
                  left: currentAnnotation.coordinates[0].x,
                  background: "rgba(0, 0, 0, 0.8)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  zIndex: 1000,
                }}
              >
                {currentAnnotation.label_name}
              </div>
            )}
            {/* Render box dynamically */}
            {drawingMode === "box" &&
              endX !== 0 &&
              endY !== 0 &&
              startX !== 0 &&
              startY !== 0 && (
                <div
                  className="box-overlay"
                  style={{
                    position: "absolute",
                    left: Math.min(startX, endX),
                    top: Math.min(startY, endY),
                    width: Math.abs(endX - startX),
                    height: Math.abs(endY - startY),
                    border: `2px solid ${boxColor}`, // Set border color as boxColor
                    backgroundColor: "transparent", // Transparent background
                  }}
                />
              )}
          </div>
        </div>
        <div className="output-arrows">
          <button
            className="output-arrow output-arrow-prev"
            onClick={handlePrev}
            disabled={cnt === 1}
          >
            {/* &#8592; */}
            {/* &#10138;  */}
            &#x290C;
          </button>
          <button
            className="output-arrow output-arrow-next"
            onClick={handleNext}
            disabled={cnt === maxCount}
          >
            {/* &#10148;  */}
            &#x290D;
            {/* &#8594; */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Output;
