from django.shortcuts import render
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.http import HttpResponse, JsonResponse 
from rest_framework import generics
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Max, Min, Sum
from django.db.models import Q


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


class DMWMetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictMinorWorkMetaData
        fields = ["project_name", "ballpark", "project_pdf", "document_date", "ballpark", "audience_size", "outline", "location"]


class DMWSerializer(GeoFeatureModelSerializer):
    metadata = DMWMetaDataSerializer(many=False)
    class Meta:
        model = DistrictMinorWork
        geo_field = "mpoly"
        fields = ["project_name", "metadata"]

class DMWList(APIView):
    def get(self, request, format=None):
        min_year = int(self.request.query_params.get('min_year', '2010'))
        max_year = int(self.request.query_params.get('max_year', '2050'))
        min_ballpark = int(self.request.query_params.get('min_ballpark', '0'))
        max_ballpark = int(self.request.query_params.get('max_ballpark', '9999999999'))
        output = []
        borders = list(DistrictMinorWork.objects.filter(Q(metadata__ballpark__gte=min_ballpark) & Q(metadata__ballpark__lte=max_ballpark) & Q(metadata__document_date__year__lte=max_year) & Q(metadata__document_date__year__gte=min_year)))
        for d in borders:
            serializer = DMWSerializer(d)
            output.append(serializer.data)
        return Response(output)

# Create your views here.
