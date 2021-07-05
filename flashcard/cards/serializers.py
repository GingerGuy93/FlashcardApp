from rest_framework import serializers
from .models import Card, Collection


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = ['id', 'name']


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'collection', 'title', 'description']



