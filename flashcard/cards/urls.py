from django.urls import path
from . import views

urlpatterns = [
    path('collection/', views.CollectionList.as_view()),
    path('cards/', views.FlashcardList.as_view()),
    path('collection/<int:pk>/', views.CollectionDetails.as_view()),
    path('collection/cards/<int:collection_id>', views.CardsInCollection.as_view()),
    path('collection/cards/<int:collection_id>/<int:pk>', views.CardModifier.as_view()),
]
