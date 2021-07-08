from .models import Card, Collection
from .serializers import CardSerializer, CollectionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404


# Create your views here.
class CollectionList(APIView):

    def get(self, request):
        collection = Collection.objects.all()
        serializer = CollectionSerializer(collection, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CollectionDetails(APIView):

    def get_collection(self, pk):
        try:
            return Collection.objects.get(id=pk)
        except Collection.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        collection = self.get_collection(pk)
        serializer = CollectionSerializer(collection)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        collection = self.get_collection(pk)
        serializer = CollectionSerializer(collection)
        collection.delete()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FlashcardList(APIView):
    def get(self, request, fk):
        cards = Card.objects.filter(collection_id=fk)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request, fk):
        serializer = CardSerializer(data={**request.data, 'collection': fk})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CardsInCollection(APIView):

    def get(self, request, collection_id):
        flashcards = Card.objects.filter(collection_id=collection_id)
        serializer = CardSerializer(flashcards, many=True)
        return Response(serializer.data)


class CardModifier(APIView):

    def get_card(self, pk):
        try:
            return Card.objects.get(pk=pk)
        except Card.DoesNotExist:
            raise Http404

    def get(self, request, pk, collection_id):
        flashcard = self.get_card(pk)
        serializer = CardSerializer(flashcard)
        return Response(serializer.data)

    def put(self, request, pk, collection_id):
        flashcard = self.get_card(pk)
        serializer = CardSerializer(flashcard, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, collection_id):
        flashcard = self.get_card(pk)
        flashcard.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)





