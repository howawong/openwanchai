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
from django.db.models import Q, F
from rest_framework.pagination import PageNumberPagination
from django.contrib.gis.db import models


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



class SearchResultModel(models.Model):
    key = models.CharField(max_length=256, primary_key=True)
    identifier = models.CharField(max_length=256)
    project_name = models.CharField(max_length=256)
    committee = models.CharField(max_length=256)
    document_url = models.CharField(max_length=1024)
    start_date = models.DateField()
    audience = models.CharField(max_length=256)
    objective = models.CharField(max_length=1024)
    address = models.CharField(max_length=1024)
    record_type = models.CharField(max_length=1024)
    mpoly = models.GeometryField()
    estimation = models.DecimalField(decimal_places=0, max_digits=50)
    

class DMWSerializer(GeoFeatureModelSerializer):
     class Meta:
         model = SearchResultModel
         geo_field = "mpoly"
         fields = ["identifier", "project_name", "document_url", "start_date", "audience", "objective", "address", "record_type", "estimation", "committee", "pk"]


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
        min_date = self.request.query_params.get('min_date', '2010-01-01')
        max_date = self.request.query_params.get('max_date', '2050-12-30')
        min_ballpark = int(self.request.query_params.get('min_ballpark', '0'))
        max_ballpark = int(self.request.query_params.get('max_ballpark', '9999999999'))
        keyword = self.request.query_params.get('keyword', '').strip()
        q = Q(metadata__ballpark__gte=min_ballpark) & Q(metadata__ballpark__lte=max_ballpark) & Q(metadata__expected_start_date__range=[min_date, max_date])
        if len(keyword) > 0:
            keyword_q = Q(metadata__project_name__icontains=keyword)
            keyword_q = keyword_q | Q(metadata__identifier__icontains=keyword)
            keyword_q = keyword_q | Q(metadata__committee__icontains=keyword)
            keyword_q = keyword_q | Q(metadata__proposer__icontains=keyword) 
            keyword_q = keyword_q | Q(metadata__outline__icontains=keyword)
            keyword_q = keyword_q | Q(metadata__location__icontains=keyword)
            q = q & keyword_q
        
        dmw = DistrictMinorWork.objects.filter(q).annotate(record_type=models.Value('dmw', output_field=models.CharField()))
        

        q = Q(metadata__estimation__gte=min_ballpark) & Q(metadata__estimation__lte=max_ballpark)
        q = q & Q(metadata__start_date__range=[min_date, max_date])
        if len(keyword) > 0:
            keyword_q = Q(metadata__group_name__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__code__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__organization_name__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__project_name__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__coorganizer_govt__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__coorganizer_non_govt__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__address__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__objective__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__nature__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__helping_organization__icontains = keyword)
            keyword_q = keyword_q | Q(metadata__payee__icontains = keyword)
            q = q & keyword_q

        comm = CommunityActivity.objects.filter(q).annotate(record_type=models.Value('comm', output_field=models.CharField()))
        comm = comm.values_list("mpoly", "metadata__code", "metadata__project_name", "metadata__document_url", "metadata__start_date", "metadata__audience", "metadata__objective", "metadata__address", "metadata__estimation", "metadata__group_name", "record_type")
        dmw = dmw.values_list("mpoly", "metadata__identifier", "metadata__project_name", "metadata__project_pdf", "metadata__expected_start_date", "metadata__audience", "metadata__outline", "metadata__location", "metadata__ballpark", "metadata__committee" , "record_type")
        union = dmw.union(comm)
        result = union.order_by('-metadata__expected_start_date')
        return result

    def get(self, request):
        queryset = self.get_queryset()
        paginator = DMWPaginiation()
        page = paginator.paginate_queryset(queryset, request)
        
        def gen_model_from_page_query_set(page):
            for r in page:
                print(r)
                m = SearchResultModel()
                m.mpoly = r[0]
                m.identifier = r[1]
                m.key = r[1]
                m.project_name = r[2]
                m.document_url = r[3]
                m.start_date = r[4]
                m.audience = r[5]
                m.objective = r[6]
                m.address = r[7]
                m.record_type = r[-1]
                m.committee = r[9]
                m.estimation = r[8]
                yield m
        model_from_page = gen_model_from_page_query_set(page)

        serializer = DMWSerializer(model_from_page, many=True)
        data = serializer.data
        return paginator.get_paginated_response(data)

class DMWDetail(GenericAPIView):
    def get(self, request, format=None):
        objectID = self.request.query_params.get('objectID')
        detail = DistrictMinorWork.objects.get(identifier=objectID)
        serializer = DMWSerializer(detail, many=False)
        return Response(serializer.data)



# Create your views here.
