from django.shortcuts import render
from django.http import Http404
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
from django.contrib.gis.geos import Point
from django.contrib.gis.geos import GEOSGeometry
from django.db.models import DateTimeField, ExpressionWrapper, F


def home_view(request):
    return HttpResponse('Hello, World!')


def search_config_view(request):
    output = DistrictMinorWork.objects.all().aggregate(Min('budget'), Max('budget'))
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
        return Response(output)


class DMWMetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictMinorWorkMetaData
        fields = ["project_name", "identifier", "ballpark", "project_pdf", "document_date", "ballpark", "audience_size", "outline", "location", "expected_start_date", "expected_end_date", "expected_date_format", "committee", "objective"]


class CommunityActivityMetaDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommunityActivityMetaData
        fields = ["code", "group_type", "group_name", "document_date", "document_no", "project_name", "organization_name", "first_time", "document_url", "coorganizer_govt", "coorganizer_non_govt", "address", "latitude", "longitude", "date_type", "start_date", "end_date", "start_date_1", "start_date_type_1", "audience_size", "nature", "objective", "audience", "helping_organization", "estimation", "applied", "income", "payee", "content"]

class CommunityActivitySerializer(GeoFeatureModelSerializer):
    metadata = CommunityActivityMetaDataSerializer(many=False)
    class Meta:
        model = CommunityActivity
        geo_field = "mpoly"
        fields = ["metadata"]

class DistrictMinorWorkSerializer(GeoFeatureModelSerializer):
    metadata = DMWMetaDataSerializer(many=False)
    class Meta:
        model = DistrictMinorWork
        geo_field = "mpoly"
        fields = ["metadata"]


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
    mpoly = models.GeometryField(default=None, null=True)
    mpoint = models.PointField()
    category = Category
    estimation = models.DecimalField(decimal_places=0, max_digits=50)
 

class CategorySerializer(serializers.ModelSerializer):
    class  Meta:
        model = Category
        fields = ["code", "text", "img"]


class SearchResultSerializer(GeoFeatureModelSerializer):
    category = CategorySerializer(many=False)
    class Meta:
        model = SearchResultModel
        geo_field = "mpoly"
        fields = ["identifier", "project_name", "document_url", "start_date", "audience", "objective", "address", "record_type", "estimation", "committee", "pk", "category"]


class DMWPaginiation(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 9999

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


def gen_model_from_page_query_set(page, cat_dict):
    for r in page:
        print(r)
        m = SearchResultModel()
        m.mpoly = r[0]
        if r[0] is None:
          m.mpoly = r[-2]
        m.identifier = r[1]
        m.key = r[1]
        m.project_name = r[2]
        m.document_url = r[3]
        m.start_date = r[4]
        m.audience = r[5]
        m.objective = r[6]
        m.address = r[7]
        m.committee = r[9]
        m.estimation = r[8]
        m.record_type = r[-1]
        if r[10] is not None:
            m.category = cat_dict[r[10]]
        yield m



def comm_value_list(comm):
    comm = comm.annotate(rc=models.Value("comm", output_field=models.CharField()))
    comm = comm.values_list("activity__mpoly", "code", "project_name", "document_url", "start_date", "audience", "objective", "address", "estimation", "group_name", "category__code", "point", "rc")

    return comm


def dmw_value_list(dmw):
    dmw = dmw.annotate(point=models.Value(None, output_field=models.PointField()))
    dmw = dmw.annotate(rc=models.Value("dmw", output_field=models.CharField()))
    #dmw = dmw.annotate(record_type=models.Value(None, output_field=models.PointField()))
    dmw = dmw.values_list("mpoly", "metadata__identifier", "metadata__project_name", "metadata__project_pdf", "metadata__expected_start_date", "metadata__audience", "metadata__outline", "metadata__location", "metadata__ballpark", "metadata__committee", "metadata__category__code" , "point", "rc")
    return dmw

def get_category_dict():
    categories = Category.objects.all()
    d = {}
    for cat in categories:
        d[cat.code] = cat
    return d


class DMWList(APIView):
    serializer_class = SearchResultSerializer
    pagination_class = DMWPaginiation
    http_method_names = ['get', 'head', 'options']

    def get_queryset(self):
        min_date = self.request.query_params.get('min_date', '2010-01-01')
        max_date = self.request.query_params.get('max_date', '2050-12-30')
        min_ballpark = int(self.request.query_params.get('min_ballpark', '0'))
        max_ballpark = int(self.request.query_params.get('max_ballpark', '9999999999'))
        categories = self.request.query_params.get('categories', '')
        categories = categories.split(',')
        categories = [c.strip() for c in categories]
        categories = [int(c) for c in categories if c.isnumeric()]

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
        
        q = q & Q(metadata__isnull=False)
        if categories:
            q = q & Q(metadata__category__in=categories)
        dmw = DistrictMinorWork.objects.filter(q)
        

        q = Q(estimation__gte=min_ballpark) & Q(estimation__lte=max_ballpark)
        q = q & Q(start_date__range=[min_date, max_date])
        if len(keyword) > 0:
            keyword_q = Q(group_name__icontains = keyword)
            keyword_q = keyword_q | Q(code__icontains = keyword)
            keyword_q = keyword_q | Q(document_no__icontains = keyword)
            keyword_q = keyword_q | Q(organization_name__icontains = keyword)
            keyword_q = keyword_q | Q(project_name__icontains = keyword)
            keyword_q = keyword_q | Q(coorganizer_govt__icontains = keyword)
            keyword_q = keyword_q | Q(coorganizer_non_govt__icontains = keyword)
            keyword_q = keyword_q | Q(address__icontains = keyword)
            keyword_q = keyword_q | Q(objective__icontains = keyword)
            keyword_q = keyword_q | Q(nature__icontains = keyword)
            keyword_q = keyword_q | Q(helping_organization__icontains = keyword)
            keyword_q = keyword_q | Q(payee__icontains = keyword)
            q = q & keyword_q
        q = q & Q(parent__isnull=True)
        if categories:
            q = q & Q(category__in=categories)
     
        comm_metadata = CommunityActivityMetaData.objects.filter(q)
        comm = comm_value_list(comm_metadata)
        dmw = dmw_value_list(dmw)
        #union = dmw.union(comm)
        union = comm.union(dmw)
        result = union
        result = union.order_by('-start_date')
        return result

    def get(self, request):
        queryset = self.get_queryset()
        paginator = DMWPaginiation()
        page = paginator.paginate_queryset(queryset, request)
        cat_dict = get_category_dict()
        model_from_page = gen_model_from_page_query_set(page, cat_dict)

        serializer = SearchResultSerializer(model_from_page, many=True)
        data = serializer.data
        return paginator.get_paginated_response(data)


class HotList(APIView):
   def get(self, request):
        c = CommunityActivityMetaData.objects.all()[2:3]
        cat_dict = get_category_dict()
        page = gen_model_from_page_query_set(comm_value_list(c), cat_dict)
        page2 = gen_model_from_page_query_set(dmw_value_list(DistrictMinorWork.objects.all()[:3]), cat_dict)
        model_from_page = list(page) + list(page2)
        serializer = SearchResultSerializer(model_from_page, many=True)
        data = serializer.data
        return Response(data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
         model = Category
         fields = '__all__'

class CategoryList(APIView):
    def get(self, request):
         serializer = CategorySerializer(Category.objects.filter(enabled=True), many=True)
         data = serializer.data
         return Response(data)




class DMWDetail(GenericAPIView):
    def get(self, request, format=None):
        objectID = self.request.query_params.get('id')
        detail  = DistrictMinorWork.objects.filter(identifier=objectID).first()
        detail_type = "dmw"
        serializer_class = DistrictMinorWorkSerializer
        if detail is None:
            detail_type = "comm"
            detail = CommunityActivity.objects.filter(code=objectID).first()
            serializer_class = CommunityActivitySerializer
        if detail is None:
            raise Http404
        else:
            data = serializer_class(detail, many=False).data
            data["properties"]["type"] = detail_type
            return Response(data)


class StackedBarChart(GenericAPIView):
    def get(self, request, format=None):
        communities = CommunityActivityMetaData.objects.filter(Q(start_date__year__gte=2014) & Q(parent__isnull=True) & Q(stacked_bar_chart_flag="Y"))
        agg = communities.values('start_date__year', 'group_name').annotate(Sum('stacked_bar_chart_amount')).order_by('start_date__year', 'group_name')
        result = {}
        committees = set()
        for c in agg:
            amount = c["stacked_bar_chart_amount__sum"]
            committee = c["group_name"]
            if committee == "":
                continue
            committees.add(committee)
            year = c["start_date__year"]
            key = year
            if key not in result:
                result[key] = {"name": key}
            result[key].update({committee: amount})
        committees = list(committees)
        data = {"result": result.values(), "committees": committees}
        return Response(data)




#ll Create your views here.
