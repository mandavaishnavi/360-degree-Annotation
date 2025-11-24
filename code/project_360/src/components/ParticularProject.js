import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer"; // For creating PDF
import { saveAs } from "file-saver"; // For downloading the PDF
import logo from "./images/Cyrrup-Logo.png";
import "./css/ParticularProject.css";
import "./css/Navbar.css";
// import axios from "axios"; // For making HTTP requests
// import { image } from "d3";
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FADBD8", // Peach background color
    padding: 40,
  },
  headerContainer: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    margin: "20px",
  },
  logo: {
    width: 100,
    height: "auto",
  },
  content: {
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  annotation: {
    marginBottom: 20,
    padding: 20,
    border: "1px solid #333333",
  },
  annotationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  annotationDetail: {
    marginBottom: 5,
    color: "#333333",
  },
});

const ProjectDetails = () => {
  const [componentsData, setComponentsData] = useState(null);
  const { username, project_no } = useParams();
  const [labels, setLabels] = useState([]); // State to store labels fetched from backend
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to track dropdown status
  const [selectedLabels, setSelectedLabels] = useState([]); // State to store selected labels
  const [sortOrder, setSortOrder] = useState("asc");
  // const [error, setError] = useState(null);

  const generatePDF = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/export_annotations/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageId }),
        }
      );
      const response1 = await fetch(
        `http://localhost:8000/api/export_seg_annotations/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageId }),
        }
      );

      const pdfData = await response.json();
      const segPdfData = await response1.json();

      const MyDocument = (
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.headerContainer}>
              <Text style={styles.companyName}>Cyrrup Solutions Pvt Ltd.</Text>
              <Image src={logo} style={styles.logo} />
            </View>
            <View style={styles.content}>
              <Text style={styles.header}>Annotations</Text>
              {/* Render annotations */}
              {pdfData.map((annotation, index) => (
                <View key={index} style={styles.annotation}>
                  <Text style={styles.annotationTitle}>
                    Annotation {index + 1}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    ID: {annotation.id}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Start X: {annotation.start_x}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Start Y: {annotation.start_y}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Width: {annotation.width}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Height: {annotation.height}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Label Colour: {annotation.label_colour}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Label Name: {annotation.label_name}
                  </Text>
                </View>
              ))}
              <Text style={styles.header}>Segmentation</Text>
              {/* Render segmentation */}
              {segPdfData.map((segAnnotation, index) => (
                <View key={index} style={styles.annotation}>
                  <Text style={styles.annotationTitle}>
                    Segmentation {index + 1}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    ID: {segAnnotation.id}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Label Colour: {segAnnotation.label_colour}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Label Name: {segAnnotation.label_name}
                  </Text>
                  <Text style={styles.annotationDetail}>
                    Coordinates List:{" "}
                    {segAnnotation.coordinates
                      .map((coord) => `(${coord.x}, ${coord.y})`)
                      .join(", ")}
                  </Text>
                  {/* Add other segmentation details here */}
                </View>
              ))}
            </View>
          </Page>
        </Document>
      );

      const pdfBlob = await pdf(MyDocument).toBlob();
      saveAs(pdfBlob, "image_data.pdf"); // Save PDF as 'image_data.pdf', change name if needed
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError("Failed to fetch image data. Please try again.");
    }
  };
  ///////////////////
  const generateYolo = async (imageId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/export_annotations/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageId }),
        }
      );
      const response1 = await fetch(
        `http://localhost:8000/api/export_seg_annotations/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageId }),
        }
      );
      // const pdfData = response.data;
      const Data = await response.json();
      const Data1 = await response1.json();
      // console.log(Data);
      const annotations = Data;
      const jsonData = JSON.stringify(annotations);
      const jsonData1 = JSON.stringify(Data1);

      const blob = new Blob([jsonData], { type: "application/json" });
      const blob1 = new Blob([jsonData1], { type: "application/json" });

      saveAs(blob, "bba.json");
      saveAs(blob1, "seg.json");
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    }
  };
  ////////////////////////////////////////////////////
  const generateZip = async (imageId) => {
    try {
        const response = await fetch(
            `http://localhost:8000/api/export/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageId }),
            }
        );

        // Check if the request was successful
        if (response.ok) {
            // Convert the response to a blob
            const blob = await response.blob();

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a link element
            const link = document.createElement("a");

            // Set the link's href attribute to the temporary URL
            link.href = url;

            // Set the download attribute to specify the filename
            link.download = "images.zip";

            // Append the link to the document body
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Remove the link from the document body
            document.body.removeChild(link);

            // Revoke the temporary URL to free up memory
            window.URL.revokeObjectURL(url);
        } else {
            // Handle the case when the request fails
            console.error("Error:", response.status);
            // Handle error
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
    }
};

  //////////////////
  // Navigate hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!project_no) {
      navigate("/404");
      return;
    }

    const postProjectDetails = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/details/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, project_no }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }

        const data = await response.json();
        setComponentsData(data); // Set the components data state
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    postProjectDetails();
  }, [username, project_no, navigate]);
  const handleLabelToggle = (labelId) => {
    setSelectedLabels((prevSelectedLabels) => {
      if (prevSelectedLabels.includes(labelId)) {
        return prevSelectedLabels.filter((id) => id !== labelId);
      } else {
        return [...prevSelectedLabels, labelId];
      }
    });
  };
  const handleReset = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/details/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, project_no }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch project details");
      }

      const data = await response.json();
      setComponentsData(data);
      setSelectedLabels([]);
      setSortOrder("asc");
    } catch (error) {
      console.error("Error resetting data:", error);
    }
  };
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/filter_images/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, project_no, selectedLabels }),
      });

      if (!response.ok) {
        throw new Error("Failed to filter images");
      }

      const data = await response.json();
      setComponentsData(data);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error filtering images:", error);
    }
  };
  const handleSort = () => {
    const sortedData = [...componentsData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.Project_Name.localeCompare(b.Project_Name);
      } else {
        return b.Project_Name.localeCompare(a.Project_Name);
      }
    });
    setComponentsData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
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

  if (!componentsData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className="navbar background">
        <ul className="nav-list">
          <div className="logo">
            <img src={logo} alt="Cyrrup Logo" />
          </div>
          <li>
            <h3>Cyrrup solutions</h3>
          </li>
          <div className="divider"></div>
          <li className="page-name">
            <a
              href="http://localhost:3000"
              style={{ color: "white", textDecoration: "none" }}
            >
              Home
            </a>
          </li>
          <li className="page-name">
            <a
              href={`http://localhost:3000/project/${username}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Projects
            </a>
          </li>
        </ul>
        <div className="rightNav1">
          <Link to={`/input-form/${username}/${project_no}`}>
            <button className="add_image_button">Add Image</button>
          </Link>
          <button className="add_new_label">
            <a
              href={`http://localhost:3000/label-form/${username}/${project_no}`}
              style={{ color: "white", textDecoration: "none" }}
            >
              Add label
            </a>
          </button>
        </div>
      </nav>
      <div className="action-buttons-container">
        <div className="filter-button-container">
          <button
            className="filter-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Filter
          </button>
          {dropdownOpen && (
            <div className="dropdown">
              <h3>Filter by Labels</h3>
              <ul>
                {labels.map((label) => (
                  <li key={label.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedLabels.includes(label.id)}
                        onChange={() => handleLabelToggle(label.id)}
                      />
                      {label.Label_Name}
                    </label>
                  </li>
                ))}
              </ul>
              <div className="submit-button-container">
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="sort-button-container">
          <button className="sort-button" onClick={handleSort}>
            Sort
          </button>
        </div>
        <div className="reset-button-container">
          <button className="reset-button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <h1>Project Components</h1>
      <div className="table-container">
        <table className="project-table" border="1">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Image</th>
              <th>Image Name</th>
              <th>Export Seg.</th>
              <th>Export as pdf</th>
              <th>Export as JSON</th>
            </tr>
          </thead>
          <tbody>
            {componentsData.map((component, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/output/${username}/${project_no}/${component.Image_ID}/${component.Frame_Count}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={require(`../../django_project/media/${component.Image}`)}
                      alt={`Project ${component.Project_Name}`}
                    />
                  </Link>
                </td>
                <td>{component.Project_Name}</td>
                <td>
                  <button
                    onClick={() => generateZip(component.Image_ID)}
                    className="Export_button"
                  >
                    <img
                      className="pdf_export_image"
                      src="/zip.png"
                      alt=""
                      style={{ width: "32px", height: "32px" }} // Adjust the width and height as needed
                    />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => generatePDF(component.Image_ID)}
                    className="Export_button_pdf"
                  >
                    <img
                      className="pdf_export_image"
                      src="/PDF_file_icon.png"
                      alt=""
                      style={{ width: "32px", height: "32px" }} // Adjust the width and height as needed
                    />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => generateYolo(component.Image_ID)}
                    className="Export_button"
                  >
                    &#128196;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectDetails;
