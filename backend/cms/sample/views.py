from django.shortcuts import render
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.http import HttpResponse, JsonResponse 
from rest_framework import generics
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Max, Min, Sum


def home_view(request):
    return HttpResponse('Hello, World!')


def search_config_view(request):
    output = DistrictMinorWork.objects.all().aggregate(Min('budget'), Max('budget'))
    print(output)
    return JsonResponse({'budget': {'min': float(output['budget__min']), 'max': float(output['budget__max'])}})



class WorldBorderSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = WorldBorder
        geo_field = "mpoly"
        fields = ["name"]

class WorldBorderList(APIView):
    def get(self, request, format=None):
        output = []
        borders = list(WorldBorder.objects.all())
        for d in borders:
            serializer = WorldBorderSerializer(d)
            output.append(serializer.data)
            print(serializer.data)
        return Response(output)


class DMWSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = DistrictMinorWork
        geo_field = "mpoly"
        fields = ["project_name", "address", "budget"]

class DMWList(APIView):
    def get(self, request, format=None):
        output = []
        borders = list(DistrictMinorWork.objects.all())
        for d in borders:
            serializer = DMWSerializer(d)
            output.append(serializer.data)
        return Response(output)

# Create your views here.
