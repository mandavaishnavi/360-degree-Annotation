# api/views.py

from rest_framework import generics
from django.http import HttpResponse, JsonResponse, FileResponse
from rest_framework.permissions import IsAuthenticated
from .models import SavedData
from .serializers import SavedDataSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
import json
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from task.models import Projects
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from label.models import Label
from annotations.models import Annotations
from segmentation.models import SegAnnotations
from api.models import SavedData
import zipfile
import io
import os



User = get_user_model()



class SaveDataView(generics.CreateAPIView):
    queryset = SavedData.objects.all()
    serializer_class = SavedDataSerializer

    def perform_create(self, serializer):
        # Get user from request
        # user = self.request.user
        # Get project_no from URL parameters
        username = self.kwargs.get('username')
        user = User.objects.get(username=username)
        # user = user_p.id
        

        project_no_id = self.kwargs.get('project_no')
        # You might want to validate project_no_id here
        # Calculate no_of_frames
        # Assuming you have some function to calculate no_of_frames
        no_of_frames = 0
        
        # Set user, project_no, and no_of_frames before saving
        serializer.save(user=user, project_no_id=project_no_id, no_of_frames=no_of_frames)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        # print("look")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid Credentials'}, status=401)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)
    


@csrf_exempt  
def signup_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Check if the user already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'Username already exists'}, status=400)

            # Create a new user
            user = User.objects.create_user(username=username, password=password)
            return JsonResponse({'message': 'User created successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data in the request'}, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=400)

@csrf_exempt
def task_view(request):
    prs = Projects.objects.all()
    data = [
        {
            'Username': task.user.username if task.user else None, 
            'Project_No': task.project_no,
            'Project_Name': task.project_name
        } 
        for task in prs
    ]
    return JsonResponse(data, safe=False)


@csrf_exempt     
def create_project_view(request,username):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            project_name = data.get('project_name')
            project_valid_name = project_name.strip(' ')
            project_valid_name = project_name.strip('   ')
            if project_valid_name == '':
                return JsonResponse({'message': 'Please Enter a project Name'}, status=400)


            user_id = get_user_model().objects.get(username=username)

            if user_id is not None:
                user = get_user_model().objects.get(username=user_id)
            else:
                return JsonResponse({'message': 'Invalid or missing userid parameter'}, status=400)


            last_project = Projects.objects.filter(user=user).order_by('-project_no').first()
            if last_project:
                next_project_no = str(int(last_project.project_no) + 1)
            else:
                next_project_no = "1"
            
            project = Projects.objects.create(
                user=user,
                project_no=next_project_no,
                project_name=project_name
            )

            return JsonResponse({'status': 'success', 'project_no': next_project_no})

        except json.JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON data'})
 
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt     
def project_username_view(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        username = data.get('username')
        project_no = data.get('project_no')
        user = User.objects.get(username=username)
        user_id = user.id
        saved_data = SavedData.objects.filter(user_id=user_id, project_no_id=project_no)

        data = [
            {
                'Project_Name': task.data, 
                'Image': task.image.name,  # Use the relative path to the image
                'Frame_Count': task.no_of_frames,
                'Image_ID': task.id
            }   
            for task in saved_data
        ]
        # print(data)
        return JsonResponse(data, safe=False)
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    


@csrf_exempt
def create_label_view(request, username, project_no):
    # print("popo")
    if request.method == 'POST':
        try:
            # data = json.loads(request.body)
            # print(11)
            color = request.POST.get('color')
            label_name = request.POST.get('label_name')
            # print(color)
            
            user = User.objects.get(username=username)
            project = Projects.objects.get(project_no=project_no,user=user)

            # print(project.project_name,label_name,color)
            Label.objects.create(project=project, label_color=color, label_name=label_name)

            return JsonResponse({'message': 'Label created successfully.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=400)

@csrf_exempt
def label_view(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        username = data.get('username')
        project_no = data.get('project_no')
        user = User.objects.get(username=username)
        project = Projects.objects.get(project_no=project_no,user=user)
        saved_data=Label.objects.filter(project=project)
        data = [
            {
                'Label_Name': task.label_name, 
                'Colour': task.label_color,
                'id': task.id
            }   
            for task in saved_data
        ]
        return JsonResponse(data, safe=False)
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def save_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        imageNumber = data.get('imageNumber')
        startX = data.get('startX')
        startY = data.get('startY')
        width = data.get('width')
        height = data.get('height')
        labell = data.get('label')
        fr=data.get('cnt')
        saved_data = SavedData.objects.get(id=imageNumber)
        # imageUrl = saved_data.image
        label = Label.objects.get(label_name=labell)
        # print(imageNumber,startX,startY,width,height,fr,label_id)
        Annotations.objects.create(image=saved_data, frame_no=fr, label_id=label,start_x=startX,start_y=startY,width_x=width,height_y=height)
        return JsonResponse({'status': 'success', 'message': 'Annotation saved successfully'})
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    
@csrf_exempt
def save_seg_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        imageNumber = data.get('imageNumber')
        labell = data.get('label')
        fr=data.get('cnt')
        saved_data = SavedData.objects.get(id=imageNumber)
        print(labell)
        label = (Label.objects.get(label_name=labell))
        coordinates = data.get('coordinates')
        SegAnnotations.objects.create(image=saved_data, frame_no=fr, label_id=label,coordinates=coordinates)
        return JsonResponse({'status': 'success', 'message': 'Annotation saved successfully'})
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def view_view(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        ino = data.get('imageNumber')
        fr = data.get('cnt')
        annotations = Annotations.objects.filter(image_id=ino, frame_no=fr)
        annotation_data = []
        for annotation in annotations:
            annotation_data.append({
                'id': annotation.id,
                'start_x': annotation.start_x,
                'start_y': annotation.start_y,
                'width': annotation.width_x,
                'height': annotation.height_y,
                'label_colour': annotation.label_id.label_color,
                'label_name': annotation.label_id.label_name,
            })

        return JsonResponse(annotation_data, safe=False)
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    
@csrf_exempt
def delete_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        annotation_id = data.get('annotationId')
        annotation = Annotations.objects.get(id=annotation_id)
        annotation.delete()
        return JsonResponse({'status': 'success', 'message': 'deleted'})
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    
@csrf_exempt
def seg_view(request):
    if request.method == 'POST':
        # Parse the JSON data from the request body
        data = json.loads(request.body)
        ino = data.get('imageNumber')
        fr = data.get('cnt')
        annotations = SegAnnotations.objects.filter(image_id=ino, frame_no=fr)
        annotation_data = []

        for annotation in annotations:
            coordinates_str = annotation.coordinates
            coordinates_list = json.loads(coordinates_str.replace("'", "\""))

            annotation_data.append({
                'id': annotation.id,
                'coordinates': coordinates_list,
                'label_colour': annotation.label_id.label_color,
                'label_name': annotation.label_id.label_name
            })

        return JsonResponse(annotation_data, safe=False)
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def delete_seg_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        annotation_id = data.get('annotationId')
        annotation = SegAnnotations.objects.get(id=annotation_id)
        annotation.delete()
        return JsonResponse({'status': 'success', 'message': 'deleted'})
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
    

@csrf_exempt
def export_annotation_view(request):
    # print("hi")
    if request.method == 'POST':
        data = json.loads(request.body)

        image_id = data.get('imageId')
        # print(image_id)


        annotations = Annotations.objects.filter(image_id=image_id)

        annotation_data = []
        for annotation in annotations:
            annotation_data.append({
                'id': annotation.id,
                'start_x': annotation.start_x+annotation.frame_no*1000,# 1000= frame len in signal.py in api model
                'start_y': annotation.start_y,
                'width': annotation.width_x,
                'height': annotation.height_y,
                'label_colour': annotation.label_id.label_color,
                'label_name': annotation.label_id.label_name,
                
            })
        # print(annotation_data)
        return JsonResponse(annotation_data, safe=False)
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

@csrf_exempt
def export_seg_annotation_view(request):
    # print("hi")
    if request.method == 'POST':
        data = json.loads(request.body)

        image_id = data.get('imageId')
        # print(image_id)


        annotations = SegAnnotations.objects.filter(image_id=image_id)
        annotation_data = []

        for annotation in annotations:
            coordinates_str = annotation.coordinates
            coordinates_list = json.loads(coordinates_str.replace("'", "\""))

            annotation_data.append({
                'id': annotation.id,
                'coordinates': coordinates_list,
                'label_colour': annotation.label_id.label_color,
                'label_name': annotation.label_id.label_name
            })

        return JsonResponse(annotation_data, safe=False)
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})


@csrf_exempt
def filter_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        project_no = data.get('project_no')
        user = User.objects.get(username=username)
        user_id = user.id
        saved_data = SavedData.objects.filter(user_id=user_id, project_no_id=project_no)
        selected_labels = data.get('selectedLabels', []) 
        image_ids = [i.id for i in saved_data]  

        filtered_image_ids = []  

        for iddd in image_ids:
            flag = True  
            for label_id in selected_labels:
                if not (Annotations.objects.filter(image_id=iddd, label_id_id=label_id).exists() or
                        SegAnnotations.objects.filter(image_id=iddd, label_id_id=label_id).exists()):
                    flag = False  
                    break 

            if flag:
                filtered_image_ids.append(iddd)  

        filtered_saved_data = SavedData.objects.filter(id__in=filtered_image_ids)

        data = [
            {
                'Project_Name': task.data, 
                'Image': task.image.name,  # Use the relative path to the image
                'Frame_Count': task.no_of_frames,
                'Image_ID': task.id
            }   
            for task in filtered_saved_data
        ]

        return JsonResponse(data, safe=False)
    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})



@csrf_exempt
def export_view(request):
    # print("hi")
    if request.method == 'POST':
        data = json.loads(request.body)

        image_id = data.get('imageId')
        # print(image_id)


        annotations = SegAnnotations.objects.filter(image_id=image_id)
        img = SavedData.objects.filter(id=image_id)
        path='default'
        for i in img:
            path = i.image.path
            break
        # print(path)
        path = ((path.split('/'))[-1]).split('.')[0]
        # print(path)

        path = "./media/Seg/"+path+"/"
        print("HERE")

        zip_buffer = io.BytesIO()
        dict1={}
        with zipfile.ZipFile(zip_buffer, 'a', zipfile.ZIP_DEFLATED, False) as zip_file:
            for annotation in annotations:
                id = str(annotation.id)
                name=annotation.label_id.label_name
                if name not in dict1:
                    dict1[name]=1
                else:
                    dict1[name]=dict1[name]+1
                print(id)
                path1 = path+id+'.jpg'
                print(path1)
                if os.path.exists(path1):
                    print("1")
                    zip_file.write(path1, f'{name}_{dict1[name]}.jpg')
            

           
            
        zip_buffer.seek(0)

        response = FileResponse(zip_buffer, content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename="images.zip"'
        return response


    else:
        # Return a response for methods other than POST
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})



