<p id="readme-top"></p>
<br />
<div align="center">
    <div style="display: flex; align-items: center;">
        <h1 style="margin-right: 180px; color: cyan;">Components (React)</h1>
        <img src="./images/logo.svg" alt="Logo" width="100">
    </div>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#js_files">JS files</a>
      <ul>
        <li>
          <a href="#landing_page">Home page</a>
        </li>
        <li>
          <a href="#login_signup">Login and signup</a>
        </li>
        <li>
          <a href="#projects_page">Projects page, Task list</a>
        </li>
        <li>
          <a href="#create_project">Create project</a>
        </li>
        <li>
          <a href="#particular_projects_page">Particular project page</a>
        </li>
        <li>
          <a href="#input_form">Input form(images uploading page)</a>
        </li>
        <li>
          <a href="#create_label">Create Label</a>
        </li>
        <li>
          <a href="#output">Output page(for annotations)</a>
        </li>
      </ul>
    </li>
    <li>
      <a href="#css">CSS</a>
    </li>
    <li>
      <a href="#images">Images</a>
    </li>
  </ol>
</details>

<p id="js_files"></p>

## <span style="color:skyblue">JavaScript Files</span>
Each JavaScript file is named based on its functionality or purpose, ensuring clarity and easy identification of their roles within the project structure.

<p id="#landing_page"></p>

### <span style="color:pink">Home page</span>
- **LandingPage.js** is the corresponding file.
- This is the homepage component of a web application for 360-degree image labeling. It imports necessary dependencies (**'useState'**, **'useEffect'**) and assets such as CSS files (**'Navbar.css'**) and images.
- Inside the component, it initializes state using the **'useState'** hook to manage the index of the currently displayed image. The images array contains paths to five panoramic images.
- The **'useEffect'** hook is used to set up a timer that changes the **'currentImageIndex'** every 3 seconds, cycling through the images.
- In the JSX, there's a navigation bar (**'nav'**) with the company logo, name, and links to the home page, login, and signup pages.
- Below the navigation bar, there's a content section (**'div.content'**) with a welcome message and description of the application.
- A **"Get Started"** button redirects users to the login page.
- Lastly, there's a section displaying panoramic images (**'div.panoramic-images'**) with a single image displayed at a time, changing based on the current value of **'currentImageIndex'**.

<p id="#login_and_signup"></p>

### <span style="color:pink">Login and Signup pages</span>
- **LoginPage.js** and **SignupPage.js** are the corresponding files.

**Login**
- This is the login page component of a web application. It imports necessary dependencies from react and **'react-router-dom'** such as **'useEffect'** and **'useNavigate'**, CSS files(**'Navbar.css'**, **'login.css'**), and the company logo image(**'images/Cyrrup-Logo.png'**).
- Inside the component, it initializes state using the **'useState'** hook to manage the **'username'**, **'password'**, and **'error'** fields. The **'useNavigate'** hook from **'react-router-dom'** is used to enable navigation.
- The **'handleSubmit'** function is called when the login form is submitted. It prevents the default form submission behavior, constructs a **formData** object with the **'username'** and **'password'** fields, and sends a POST request to the login API endpoint.
- If the login is successful (HTTP status 200), the user is redirected to the projects page with their username as a parameter. If there's an error, the error message is displayed.
- In the JSX, there's a navigation bar (**'nav'**) with the company logo and name.
- Below the navigation bar, there's a login form (**'div.login-box'**) with input fields for **'username'** and **'password'**. The **'handleSubmit'** function is called when the form is submitted.
- If there's an error, it's displayed above the login button. Additionally, there's a link to the signup page for users who don't have an account yet.

Signup
- This is the signup page component of a web application. It imports necessary dependencies from React and **'react-router-dom'** such as **'useEffect'** and **'useNavigate'**, CSS files(**'Navbar.css'**, **'signup.css'**), and the company logo image(**'images/Cyrrup-Logo.png'**).
- Inside the component, it initializes state using the **'useState'** hook to manage the **'username'** and **'password'** fields. The **'useNavigate'** hook from **'react-router-dom'** is used to enable navigation.
- The **'handleSubmit'** function is called when the signup form is submitted. It prevents the default form submission behavior, sends a POST request to the signup API endpoint with the username and password, and redirects the user to the projects page upon successful signup.
- In the JSX, there's a navigation bar (**'nav'**) with the company logo and name.
- Below the navigation bar, there's a signup form (**'div.signup-box'**) with input fields for username and password. The **'handleSubmit'** function is called when the form is submitted.

<p id="#projects_page"></p>

### <span style="color:pink">Projects page, Task list</span>
- **'ProjectPage.js'** and **'TaskList.js'** are the corresponding files.
- The **'IntegratedPage'** component represents a page that integrates various elements such as a navigation bar and a content section(for displaying projects). It imports necessary dependencies(**'TaksList.css'**), including **'TaskList'** component, and the company logo image. The **'useParams'** hook is used to access the username parameter from the route.
- In the JSX, it renders a navigation bar (**'nav'**) with the company logo and name. It also includes links for Home, Projects, and a button to create a new project. The TaskList component is rendered within the content section to display tasks associated with the logged-in user's username.
- The **'TaskList'** component fetches tasks from an API endpoint and filters them based on the logged-in user's username. It renders a list of projects with their names, project numbers, and the associated username. Each project is wrapped in a **'Link'** component that redirects to the project details page when clicked.
- Overall, the **'IntegratedPage'** component serves as a central hub for displaying user-specific content(projects information) and navigation options, while the **'TaskList'** component handles the rendering of project lists based on user data.
<p id="#create_project"></p>

### <span style="color:pink">Create Project page</span>
**'CreateProject.js'** is the corresponding file.

This React component, **'CreateProjectForm'**, serves as a form for users to create a new project. 

- It imports necessary modules from React and **'react-router-dom'**, such as **'useState'**, **'useParams'**, **'Link'**, and **'useNavigate'**.
- It also imports a CSS file (**'CreateProject.css'**) for styling.
- The component is defined as a functional component named **'CreateProjectForm'**.
- It uses the **'useState'** hook to manage the state of **'projectName'** and **'error'**.
  - **'projectName'** stores the name of the project being created.
  - **'error'** stores any error messages that occur during the project creation process.
- It extracts the **'username'** parameter from the URL using the **'useParams'** hook from **'react-router-dom'**. This parameter is expected to be passed in the URL route.
- It uses the **'useNavigate'** hook from **'react-router-dom'** to manage navigation within the application.
- **'handleCreateProject'**: This asynchronous function is called when the user clicks the **"Create Project"** button. It sends a POST request to the backend API (**'http://localhost:8000/api/createproject/${username}/'**) with the project name entered by the user. 
  - If the request is successful (**'response.ok'**), it navigates the user to the project page for the specified username.
  - If there's an error, it logs the error message and sets the **'error'** state with the error message received from the backend.
- The render method returns JSX, defining the structure of the form.
- It includes an input field for the project name, with an associated label.
- It displays any error messages using the **'error'** state variable, such as when nothing is entered in the input field.
- Two buttons are provided: **"Create Project"** for submitting the form and **"Cancel"** for navigating back to the project page without creating a new project.
- The **"Create Project"** button is associated with the **'handleCreateProject'** function.

<p id="#particular_projects_page"></p>

### <span style="color:pink">Particular project page</span>
**'ParticularProject.css'** is the corresponding file.

The **'ProjectDetails'** component in React serves as the central hub for managing and displaying project components, including images, annotations, and associated functionalities. It interacts with backend APIs to fetch project details and labels, providing users with options to filter, sort, and reset data. Additionally, it offers tools for exporting annotations by bounding box and segmentation tools as PDF documents and JSON files, and the segmented parts of images as ZIP archives. With a responsive interface and intuitive navigation, this component empowers users to efficiently analyze and manipulate project data within their React application.

- The code imports various modules and components from React, **'react-router-dom'**, **'@react-pdf/renderer'**, **'file-saver'**, and some local files(CSS - **'Navbar.cs'**, **'ParticularProject.css'** and some images).
- **'ProjectDetails'** is a functional component defined using arrow function syntax.
- It defines several state variables using the **'useState'** hook, such as **'componentsData'**, **'labels'**, **'dropdownOpen'**, **'selectedLabels'**, and **'sortOrder'**.
- The component defines three functions (**'generatePDF'**, **'generateJSON'**, and **'generateZip'**) to generate PDF documents, JSON files, and ZIP files, respectively. These functions make HTTP requests to fetch data and then generate corresponding files.
- The **'useEffect'** hook is used to fetch project details and labels from the backend API when the component mounts. It also fetches labels whenever username or project_no changes.
- Event handler functions like **'handleLabelToggle'**, **'handleReset'**, **'handleSubmit'**, and **'handleSort'** are defined to handle user interactions such as toggling labels, resetting data, submitting filters, and sorting.
- The component renders a navigation bar, action buttons for filtering, sorting, and resetting, and a table displaying project components. Each row in the table represents a project component and provides options to export segmentation data as ZIP files, annotations as PDF files, and annotations in JSON format.
- The component conditionally renders a loading message while fetching data and displays project components once the data is available.
<p id="#input_form"></p>

### <span style="color:pink">Input form(images uploading page)</span>
**'Inputform.js'** is the corresponding file.

This React component, **'InputForm'**, is responsible for rendering a form allowing users to input data and upload images.

- It imports necessary modules from React, Axios, and **'react-router-dom'**, such as **'useState'**, **'useNavigate'**, **'Link'**, and **'useParams'**.
- It imports CSS files (**'App.css'** and **'input.css'**) for styling.
- The component is defined as a functional component named **'InputForm'**.
- It uses the **'useState'** hook to manage the state of **'inputValue'** and **'selectedFile'**.
  - **'inputValue'** stores the text data entered by the user.
  - **'selectedFile'** stores the selected image file.
- It extracts the **'username'** and **'project_no'** parameters from the URL using the **'useParams'** hook from **'react-router-dom'**. These parameters are expected to be passed in the URL route.
- **'handleInputChange'**: This function is called when the user enters text in the input field. It updates the **'inputValue'** state with the entered text.
- **'handleFileChange'**: This function is called when the user selects a file using the file input field. It validates the selected file type (JPEG or JPG) and updates the **'selectedFile'** state if the file is valid. If not, it displays an alert message.
- **'handleSave'**: This asynchronous function is called when the user clicks the **"Save"** button. It creates a **FormData** object and appends the text data (**'inputValue'**) and selected image file (**'selectedFile'**) to it. Then, it sends a POST request to the backend API (**'http://localhost:8000/api/save/${username}/${project_no}'**) with the form data. Upon successful completion, it navigates the user to the project page for the specified username and project number.
- The render method returns JSX, defining the structure of the form.
- It includes input fields for entering data (**'inputValue'**) and uploading images (**'selectedFile'**).
- A **"Save"** button is provided to submit the form data.
- A **"Back"** button is provided to navigate back to the project page without saving any data.
<p id="#create_labels"></p>

### <span style="color:pink">Add lables page</span>
**'CreateLabel.js'** is the corresponding file.

This React component, **'LabelForm'**, is responsible for rendering a form allowing users to create labels with associated colors.
- It imports necessary modules from React, Axios, **'react-router-dom'**, and **'react-color'**.
- It imports CSS files (**'App.css'**, **'input.css'**, and **'CreateLabel.css'**) for styling.
- The component is defined as a functional component named **'LabelForm'**.
- It uses the **'useState'** hook to manage the state of **'labelname'**, **'selectedColor'**, and **'labels'**.
  - **'labelname'** stores the name of the label being created.
  - **'selectedColor'** stores the selected color for the label.
  - **'labels'** stores an array of existing labels fetched from the backend.
- It extracts the **'username'** and **'project_no'** parameters from the URL using the **'useParams'** hook from **'react-router-dom'**. These parameters are expected to be passed in the URL route.
- It uses the **'useEffect'** hook to fetch existing labels from the backend API (**'http://localhost:8000/api/get_label/'**). This effect runs once when the component mounts and whenever the **'username'** or **'project_no'** parameters change.
- **'handleLabelNameChange'**: This function is called when the user enters text in the label name input field. It updates the **'labelname'** state with the entered text.
- **'handleColorChange'**: This function is called when the user selects a color using the color picker. It updates the **'selectedColor'** state with the selected color.
- **'handleSave'**: This asynchronous function is called when the user clicks the **"Save"** button. It validates the label name, creates a **FormData** object with the label name and selected color, and sends a POST request to the backend API (**'http://localhost:8000/api/label/${username}/${project_no}'**). Upon successful completion, it reloads the page to reflect the newly added label.
- **'handleBack'**: This function is called when the user clicks the **"Back"** button. It navigates the user back to the project page.
- The render method returns JSX, defining the structure of the label creation form.
- It includes input fields for entering label name (**'labelname'**) and selecting a color using the color picker (**'selectedColor'**).
- A **"Save"** button is provided to submit the form data, and a **"Back"** button is provided to navigate back to the project page.
- Existing labels are displayed in a table below the form, showing the label name and associated color.
- The component is exported as the default export, allowing it to be imported and used in other parts of the application.

<p id="#output"></p>

### <span style="color:pink">Output page</span>
**'Output.js'** is the corresponding file.

This React component, **'Output'**, is responsible for displaying an image along with annotation tools and functionalities.
- It imports necessary modules from React, **'react-select'**, and **'react-router-dom'**.
- It imports a CSS file (**'Output.css'**) for styling.
- The component is defined as a functional component named **'Output'**.
- It uses the **'useState'** hook to manage various states related to drawing annotations, managing selected labels, handling mouse events, managing annotations fetched from the backend, controlling annotation visibility, and others.
- It extracts parameters like **'username'**, **'project_no'**, **'imageNumber'**, and **'frame_count'** from the URL using the **'useParams'** hook from **'react-router-dom'**. These parameters are expected to be passed in the URL route.
- It uses the **'useEffect'** hook to fetch labels and set the aspect ratio of the image when the component mounts or when the **'username'**, **'project_no'**, or **'imageUrl'** changes.
- It defines event handlers for keyboard events (**'handleKeyDown'** and **'handleKeyUp'**) and mouse events (**'handleMouseDown'**, **'handleMouseUp'**, and **'handleMouseMove'**). These handlers are responsible for various functionalities like drawing annotations, deleting annotations, and handling annotation hover events.
- It sends API requests to fetch labels, save annotations, save segmentation, delete annotations, and delete segmentation annotations.
- The render method returns JSX, defining the layout and components of the output page.
- It includes a toolbox component for selecting annotation tools and controlling annotation visibility.
- It displays the image along with annotations and segmentation overlays.
- It provides navigation buttons for navigating between images in a sequence.
- The component is exported as the default export, allowing it to be imported and used in other parts of the application.

<p id="css"></p>

## <span style="color:skyblue">CSS</span>
- Each CSS file is named after its corresponding JavaScript file, making it intuitive to understand which styles are associated with which components or pages.
- The naming convention used for the files clearly indicates their purpose or the specific page they are intended for, facilitating easy navigation and management.
- Class names are given thoughtfully(easily understandable) within each JavaScript file. This makes it easier to find and edit styles for specific elements, improving the overall readability and organization of the code.

<p id="images"></p>

## <span style="color:skyblue">Images</span>

- **Home Page** Display: Several images (**panoramic1.jpg**, **panoramic2.jpg**, **panoramic3.jpeg**, **panoramic4.jpg**, **panoramic5.jpg**) are utilized on the landing page to create a 3D image ambiance, enhancing user experience.
- Company Logo: **images/Cyrrup-Logo.png** serves as the official logo representing the company across the application.
- Background Images: 
    - Login and Signup Pages: **images/image1.jpg** provides a visually appealing background for the login and signup pages, contributing to an inviting user interface.
    - Create Project, Upload Images (Input Form) and Add Label (Create Label) Pages: **'images/image2.jpg'** acts as the background image for these pages.
