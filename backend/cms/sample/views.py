from django.shortcuts import render
from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from django.http import HttpResponse, JsonResponse 
from rest_framework import generics
from rest_framework.generics import GenericAPIView
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Avg, Max, Min, Sum
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination


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
        fields = ["project_name", "identifier", "ballpark", "project_pdf", "document_date", "ballpark", "audience_size", "outline", "location"]


class DMWSerializer(GeoFeatureModelSerializer):
    metadata = DMWMetaDataSerializer(many=False)
    class Meta:
        model = DistrictMinorWork
        geo_field = "mpoly"
        fields = ["project_name", "metadata"]


class DMWPaginiation(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'links': {
               'next': self.get_next_link(),
               'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })


class DMWList(APIView):
    serializer_class = DMWSerializer
    pagination_class = DMWPaginiation
    http_method_names = ['get', 'head', 'options']

    def get_queryset(self):
        min_year = int(self.request.query_params.get('min_year', '2010'))
        max_year = int(self.request.query_params.get('max_year', '2050'))
        min_ballpark = int(self.request.query_params.get('min_ballpark', '0'))
        max_ballpark = int(self.request.query_params.get('max_ballpark', '9999999999'))
        borders = DistrictMinorWork.objects.filter(Q(metadata__ballpark__gte=min_ballpark) & Q(metadata__ballpark__lte=max_ballpark) & Q(metadata__document_date__year__lte=max_year) & Q(metadata__document_date__year__gte=min_year)).order_by('-metadata__document_date')
        return borders

    def get(self, request):
        queryset = self.get_queryset()
        paginator = DMWPaginiation()
        page = paginator.paginate_queryset(queryset, request)
        serializer = DMWSerializer(page, many=True)
        data = serializer.data
        return paginator.get_paginated_response(data)

class DMWDetail(GenericAPIView):
    def get(self, request, format=None):
        objectID = self.request.query_params.get('objectID')
        detail = DistrictMinorWork.objects.get(identifier=objectID)
        serializer = DMWSerializer(detail, many=False)
        return Response(serializer.data)



# Create your views here.
