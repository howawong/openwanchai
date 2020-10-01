from django.shortcuts import render
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.http import HttpResponse
from rest_framework import generics
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response


def home_view(request):
    return HttpResponse('Hello, World!')

class WorldBorderSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = WorldBorder
        geo_field = "mpoly"
        fields = ["name"]

class WorldBorderList(APIView):
    def get(self, request, format=None):
        output = []
        borders = list(WorldBorder.objects.all()[0:5])
        for d in borders:
            serializer = WorldBorderSerializer(d)
            output.append(serializer.data)
            print(serializer.data)
        return Response(output)


# Create your views here.
