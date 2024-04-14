from django.urls import path
from. import views

urlpatterns = [
    path('events/', views.EventListCreate.as_view(), name = 'list-events'),
    path('events/delete/<int:pk>/', views.EventDelete.as_view(), name='delete-event'),
    path('events/<int:pk>/', views.EventUpdate.as_view(), name='update-event'),
]
