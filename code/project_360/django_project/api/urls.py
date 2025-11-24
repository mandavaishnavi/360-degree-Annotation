# api/urls.py

from django.urls import path
from .views import SaveDataView
from .views import login_view
from .views import signup_view
from .views import task_view
from .views import create_project_view
from .views import project_username_view
from .views import create_label_view
from .views import label_view
from .views import save_view
from .views import save_seg_view
from .views import view_view
from .views import delete_view
from .views import seg_view
from .views import delete_seg_view
from .views import export_annotation_view
from .views import filter_view
from .views import export_seg_annotation_view
from .views import export_view


urlpatterns = [
    path('save/<str:username>/<str:project_no>',
         SaveDataView.as_view(), name='save_data'),
    path('label/<str:username>/<str:project_no>',
         create_label_view, name='save_data'),
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('task/', task_view, name='task'),
    path('createproject/<str:username>/', create_project_view, name='project'),
    path('details/', project_username_view, name='project_details'),
    path('get_label/', label_view, name='label_details'),
    path('save_annotation/', save_view, name='save'),
    path('save_segmentation/', save_seg_view, name='save'),
    path('view_annotations/', view_view, name='save'),
    path('delete_annotation/', delete_view, name='save'),
    path('view_seg_annotations/', seg_view, name='save'),
    path('delete_seg_annotation/', delete_seg_view, name='save'),
    path('export_annotations/', export_annotation_view, name='export'),
    path('export_seg_annotations/', export_seg_annotation_view, name='export'),
    path('filter_images/', filter_view, name='filter'),
    path('export/',export_view, name='filter')

    
]
