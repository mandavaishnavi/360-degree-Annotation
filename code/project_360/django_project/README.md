<p id="readme-top"></p>
<br />
<div align="center">
    <div style="display: flex; align-items: center;">
        <h1 style="margin-right: 180px; color: cyan;">Backend (django)</h1>
        <img src="../src/components/images/django1.jpg" alt="Logo" width="100">
    </div>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#urls">URLs</a>
    </li>
    <li>
      <a href="#models">Models</a>
    </li>
    <li>
      <a href="#views">Views</a>
      <ul>
        <li>
          <a href="#save_data_view">SaveDataView</a>
        </li>
        <li>
          <a href="#login_view">Login_view</a>
        </li>
        <li>
          <a href="#signup_view">Signup view</a>
        </li>
        <li>
          <a href="#task_view">Task view</a>
        </li>
        <li>
          <a href="#create_project_view">Create project view</a>
        </li>
        <li>
          <a href="#project_username_view">Project_username view</a>
        </li>
        <li>
          <a href="#create_label_view">Create label view</a>
        </li>
        <li>
          <a href="#label_view">Label view</a>
        </li>
        <li>
          <a href="#save_view">Save view</a>
        </li>
        <li>
          <a href="#save_seg_view">Save_seg view</a>
        </li>
        <li>
          <a href="#view_view">View view</a>
        </li>
        <li>
          <a href="#delete_view">Delete view</a>
        </li>
        <li>
          <a href="#seg_view">Seg view</a>
        </li>
        <li>
          <a href="#delete_seg_view">Delete seg view</a>
        </li>
        <li>
          <a href="#export_annotation_view">Export annotation view</a>
        </li>
        <li>
          <a href="#export_seg_annotation_view">Export seg annotation view</a>
        </li>
        <li>
          <a href="#filter_view">Filter view</a>
        </li>
        <li>
          <a href="#export_view">Export view</a>
        </li>
      </ul>
    </li>
  </ol>
</details>

<p id="urls"></p>

## <span style="color:skyblue">URLs</span>

This API provides endpoints for managing user data, projects, annotations, and segmentation data.
- POST save/<str:username>/<str:project_no> - **SaveDataView.as_view()**
- POST login/ -  **login_view**
- POST signup/ - **signup_view**
- POST label/<str:username>/<str:project_no> - **create_label_view**
- POST task/ - **task_view**
- POST createproject/<str:username>/ - **create_project_view**
- POST details/ - **project_username_view**
- POST get_label/ - **label_view**
- POST save_annotation/ - **save_view**
- POST save_segmentation/ - **save_seg_view**
- POST view_annotations/ - **view_view**
- POST delete_annotation/ - **delete_view**
- POST view_seg_annotations/ - **seg_view**
- POST delete_seg_annotation/ - **delete_seg_view**
- POST export_annotations/ - **export_annotation_view**
- POST export_seg_annotations/ - **export_seg_annotation_view**
- POST filter_images/ - **filter_view**
- POST export/ - **export_view**

<p id="models"></p>

## <span style="color:skyblue">Models</span>
- **SavedData** **(api.models)**
    - Purpose: Saves form data along with associated images.
    - Fields:
        - user: ForeignKey to the user who saved the data.
        - data: TextField to store form data.
        - project_no: ForeignKey to the project the data belongs to.
        - image: ImageField to store the associated image file.
        - no_of_frames: IntegerField to store the number of frames (nullable).
- **User** **(users.models)**
    - Purpose: Represents user accounts in the system.
    - Fields:
        - username: TextField representing the unique username for the user.
        - password: TextField representing the user's password.
        - salt: PositiveIntegerField representing a randomly generated salt value for password hashing.
- **Projects** **(task.models)**
    - Purpose: Represents projects created by users.
    - Fields:
        - user: ForeignKey to the User model, representing the user who owns the project.
        - project_no: TextField representing the project number.
        - project_name: TextField representing the name of the project.
- **Label** **(label.models)**
    - Purpose: Represents labels associated with projects.
    - Fields:
        - project: ForeignKey to the project the label belongs to.
        - label_color: TextField to store the color of the label.
        - label_name: TextField to store the name of the label.
- **Annotations** **(annotations.models)**
    - Purpose: Stores annotations for images.
    - Fields:
        - image: ForeignKey to the SavedData instance.
        - frame_no: SmallIntegerField representing the frame number.
        - start_x: SmallIntegerField representing the starting x-coordinate.
        - start_y: SmallIntegerField representing the starting  y-coordinate.
        - width_x: SmallIntegerField representing the width.
        - height_y: SmallIntegerField representing the height.
        - label_id: ForeignKey to the Label instance.
- **SegAnnotations** **(segmentation.models)**
    - Purpose: Stores segmentation annotations for images.
    - Fields:
        - image: ForeignKey to the SavedData instance.
        - frame_no: SmallIntegerField representing the frame number.
        - coordinates: TextField to store the coordinates of the segmentation.
        - label_id: ForeignKey to the Label instance.

<p id="views"></p>

## <span style="color:skyblue">Views</span>

<p id="save_data_view"></p>

## <span style="color:pink">SaveDataView</span>
- This class is a Django Rest Framework **'CreateAPIView'** that handles the creation of SavedData objects.
- It overrides the **'perform_create'** method to include additional logic before saving the data.
- It extracts **'username'** and **'project_no'** from the URL parameters, retrieves the corresponding user object, and then saves the data with the user, project number, and calculated **'no_of_frames'**.

<p id="login_view"></p>

## <span style="color:pink">login_view</span>

- This function handles user authentication.
- It accepts POST requests with JSON data containing **'username'** and **'password'**.
- It attempts to authenticate the user with the provided credentials using Django's **'authenticate'** method.
- If authentication is successful, it logs in the user and returns a success message.
- If authentication fails, it returns an error message.

<p id="signup_view"></p>

## <span style="color:pink">signup_view</span>

- This function handles user registration.
- It accepts POST requests with JSON data containing **'username'** and **'password'**.
- It checks if the provided username already exists.
- If the username doesn't exist, it creates a new user using Django's **'create_user'** method and returns a success message.
- If the username already exists, it returns an error message.

<p id="task_view"></p>

## <span style="color:pink">task_view</span>
- This function returns a list of projects.
- It fetches all projects from the **'Projects'** model and returns them as JSON data.

<p id="create_project_view"></p>

## <span style="color:pink">create_project_view</span>

- This function handles the creation of new projects.
- It accepts POST requests with JSON data containing project_name.
- It retrieves the user object based on the **'username'** provided in the URL parameters.
- It generates a new project number for the user's project and creates a new project object with the provided name.
- It returns a success message along with the newly created project number.

<p id="project_username_view"></p>

## <span style="color:pink">project_username_view</span>
- This function retrieves project details for a specific user.
- It accepts POST requests with JSON data containing **'username'** and **'project_no'**.
- It fetches saved data associated with the user and project number and returns it as JSON data(Project_Name, Image name, frame_count of it, image_id).

<p id="create_label_view"></p>

## <span style="color:pink">create_label_view</span>

- This function handles the creation of labels for a project.
- It accepts POST requests with JSON data containing **'label_name'** and **'color'**.
- It retrieves the user and project objects based on the **'username'** and **'project_no'** provided in the URL parameters.
- It creates a new label object associated with the project and returns a success message.

<p id="label_view"></p>

## <span style="color:pink">label_view</span>

- This function retrieves labels for a project.
- It accepts POST requests with JSON data containing **'username'** and **'project_no'**.
- It fetches labels associated with the user and project number and returns them as JSON data.

<p id="save_view"></p>

## <span style="color:pink">save_view</span>

- This function handles the saving of annotations for an image.
- It accepts POST requests with JSON data containing annotation details such as **'imageNumber'**, **'startX'**, **'startY'**, **'width'**, **'height'**, **'label'** and **'cnt'**(frame count).
- It retrieves the corresponding SavedData and Label objects based on the provided data and creates a new Annotations object with the annotation details.

<p id="save_seg_view"></p>

## <span style="color:pink">save_seg_view</span>

- This function handles the saving of segmentation annotations for an image.
- It accepts POST requests with JSON data containing segmentation annotation details such as **'imageNumber'**, **'label'**, **'coordinates'**, and **'cnt'**.
- It retrieves the corresponding SavedData and Label objects based on the provided data and creates a new SegAnnotations object with the segmentation annotation details.

<p id="view_view"></p>

## <span style="color:pink">view_view</span>

- This function retrieves annotations for an image.
- It accepts POST requests with JSON data containing **'imageNumber'** and **'cnt'**.
- It fetches annotations associated with the image and frame number and returns them as JSON data.

<p id="delete_view"></p>

## <span style="color:pink">delete_view</span>

- This function handles the deletion of annotations.
- It accepts POST requests with JSON data containing **'annotationId'**.
- It retrieves the annotation object based on the provided ID and deletes it.

<p id="seg_view"></p>

## <span style="color:pink">seg_view</span>

- This function retrieves segmentation annotations for an image.
- It accepts POST requests with JSON data containing **'imageNumber'** and **'cnt'**.
- It fetches segmentation annotations associated with the image and frame number and returns them as JSON data.

<p id="delete_seg_view"></p>

## <span style="color:pink">delete_seg_view</span>

- This function handles the deletion of segmentation annotations.
- It accepts POST requests with JSON data containing **'annotationId'**.
- It retrieves the segmentation annotation object based on the provided ID and deletes it.

<p id="export_annotation_view"></p>

## <span style="color:pink">export_annotation_view</span>

- This function exports annotations for an image.
- It accepts POST requests with JSON data containing **'imageId'**.
- It fetches annotations associated with the image and returns them as JSON data.

<p id="export_seg_annotation_view"></p>

## <span style="color:pink">export_seg_annotation_view</span>

- This function exports segmentation annotations for an image.
- It accepts POST requests with JSON data containing **'imageId'**.
- It fetches segmentation annotations associated with the image and returns them as JSON data.

<p id="filter_view"></p>

## <span style="color:pink">filter_view</span>

- This function filters images based on selected labels.
- It accepts POST requests with JSON data containing **'username'**, **'project_no'**, and **'selectedLabels'**.
- It filters images based on the selected labels and returns the filtered image data.

<p id="export_view"></p>

## <span style="color:pink">export_view</span>

- This function exports segmentation annotations as a zip file.
- It accepts POST requests with JSON data containing **'imageId'**.
- It fetches segmentation annotations associated with the image and creates a zip file containing the annotations as separate images.