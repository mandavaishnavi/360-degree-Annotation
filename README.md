<p id="readme-top"></p>
<br />
<div align="center">
    <div>
        <a href="https://github.com/othneildrew/Best-README-Template">
            <img src="./project_360/src/components/images/Cyrrup-Logo.png" alt="Logo" width="200">
        </a>
    </div>

# <center><span style="color:cyan">Documentation</span></center>
## <span style="color:yellow">Web Dashboard for Image Preprocessing</span>
<i><b>Team Number: 3</i></b> <br>
<i><b>Team Members:</b> <br>
Karan Nijhawan (2022101122) <br>
Palle Sreeja (2022101081) <br>
Sanchit Jalan (2022101070) <br>
Vaishnavi Reddy Manda(2022111018)</i> <br>

</div>

<!-- TABLE OF CONTENTS -->
# Table of Contents
1. [Introduction](#1)
2. [Assumptions & Preconditions](#2)
3. [Getting Started](#3)
   - [Accessing the Dashboard](#11-accessing-the-dashboard)
   - [Login and Signup](#12-login-and-signup)
4. [Dashboard Overview](#4)
   - [Creating a New Project](#21-creating-a-new-project)
5. [Managing Projects](#5)
   - [Importing Images](#31-importing-images)
   - [Image Navigation and Viewing](#32-image-navigation-and-viewing)
6. [Annotations](#6)
   - [Adding Labels](#41-adding-labels)
   - [Annotating Images](#42-annotating-images)
7. [Exporting Annotations](#7)
8. [Additional Features](#8)
9. [Contact](#9)

## <span style="color:skyblue"><a id="1" ></a>Introduction</span>

### **Web Dashboard for Image Preprocessing**

Welcome to the Web Dashboard for Image Preprocessing. This document will help you navigate through the platform, ensuring you can efficiently use all available features for managing, annotating, and exporting 360-degree images.
<p id="assumptions_and_preconditions"></p>

## <span style="color:skyblue"><a id="2" ></a>Assumptions & Preconditions</span>
- To use our application, users are required to have an account. If you're new to the platform, simply navigate to the sign-up page to get started.
- Upon logging in, users gain access to their projects and associated annotations. Login is essential for accessing and managing project-related information effectively.
- Our frame-cutting algorithm neatly organizes all image frames into designated files as frameNumber.jpg, stored in the folder named by the convention "username_projectNumber_imageNumber" in the directory ./project_360/django_project/media/CROP, facilitating easy retrieval and management.
- Annotations can be added to images only after labels have been incorporated into the project.  
- The annotations using segmentation tool are done by simply holding down the "Shift" key while hovering your cursor over the area you wish to segment. No need to click—just seamlessly glide over the desired section.

## <span style="color:skyblue">Implementation</span>

<h2 style="color:orange"><a id="3" ></a>1. Getting Started</h2>

### 1.1. Accessing the Dashboard
Install the npm package by running the following command:
```
npm install react-select
```
To access the Web Dashboard, run the following commands:

```bash
cd project_360
npm start test
```
Run the below commands in another terminal 

```bash
cd project_360/django_project
python3 manage.py runserver
```

You will be automatically directed to a locally hosted webpage on your default browser.

### 1.2. Login and Signup
- **Signup**: If you are a new user, click on the **Sign Up** button and fill in the required information (email, password) to create a new account.
- **Login**: If you already have an account, enter your credentials and click the **Log In** button to access the dashboard.

---

## <span style="color:orange"><a id="4" ></a>2. Dashboard Overview</span>
Once logged in, the main dashboard displays all your current projects and also provides an option to create a new project.

### 2.1. Creating a New Project
- Click on **Create Project**.
- Enter the project name and description.
- Submit the form to initialize a new project workspace.

---

## <span style="color:orange"><a id="5" ></a>3. Managing Projects</span>
### 3.1. Importing Images
- Navigate to the specific project dashboard by clicking on the project name.
- Click on **Import Image** and select the 360-degree image files you wish to upload.
- Images will appear in the project's dashboard once uploaded.

### 3.2. Image Navigation and Viewing
- Click on any image to open the image viewer.
- Use the arrows to move the image left or right to view different portions of the image.

---

## <span style="color:orange"><a id="6" ></a>4. Annotations</span>
### 4.1. Adding Labels
- Inside the project dashboard, click on **Add Labels**.
- Enter the label names that you want to use for annotations and select desired color to represent the label and save them.

### 4.2. Annotating Images
- Click on an image to annotate.
  - **Bounding Box**: Drag to draw boxes around objects. 
  - **Segmentation**: Press the "Shift" key and move the mouse over the part to be segmented (without clicking on it).
- After placing an annotation, select the desired label from the given list and save them.

---

## <span style="color:orange"><a id="7" ></a>5. Exporting Annotations</span>
After completing annotations:
- Click on **Export** in the project dashboard.
- Choose the format you want to export the annotations.
- Download the file to your local system.

---

## <span style="color:orange"><a id="8" ></a>6. Additional Features</span>
- Use the **Filter** option to display only images that meet certain criteria.
- Use the **Sort** option to arrange images in a specific order.


---

## <span style="color:orange"><a id="9" ></a>7. Contact</span>
If you encounter any issues or have questions, please refer to the contacts below or visit the project's GitHub repository link provided.




Karan Nijhawan - karan.nijhawan@students.iiit.ac.in <br>
Palle Sreeja - palle.sreeja@students.iiit.ac.in <br>
Sanchit Jalan - sanchit.jalan@students.iiit.ac.in <br>
Vaishnavi Reddy Manda - manda.vaishnavi@research.iiit.ac.in

## <span style="color:orange"><a id="9" ></a>Note</span>
2 more README files explaining backend and frontend code are pushed into there seperate folders. You can refer there for further details about the same. <br>
<br>
Project Link: [https://github.com/DASS-Spring-2024/dass-project-spring-2024-team-3](https://github.com/DASS-Spring-2024/dass-project-spring-2024-team-3)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
