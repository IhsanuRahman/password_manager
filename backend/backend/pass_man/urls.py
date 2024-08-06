from django.urls import path
from . import views
urlpatterns=[
    path('add',views.add_password),
    path('get',views.get_passwords),
    path('get-by-id',views.get_password),
    path('delete',views.delete_password),
]