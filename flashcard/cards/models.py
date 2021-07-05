from django.db import models

# Create your models here.


class Collection(models.Model):
    name = models.CharField(max_length=100)


class Card(models.Model):
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)


