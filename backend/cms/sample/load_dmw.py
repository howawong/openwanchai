from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.gdal import SpatialReference
from .models import DistrictMinorWork


dmw_mapping = {
      "identifier": "identifier"
      , "project_name": "工程名"
      , "project_number": "文件號"
      , "project_pdf": "文件URL"
      , "attachment": "是否附"
      , "document_date": "文件日"
      , "proposer": "提交議"
      , "objective": "工程目"
      , "audience": "若對象"
      , "audience_size": "預期受"
      , "budget": "工程造"
      , "desc": "工程大"
      , "address": "工程地"
      , "remarks": "其他與"
      , "start_date": "預計開"
      , "end_date": "預計完"
      , 'mpoly': "MULTIPOLYGON"
}

world_shp = '地區小型工程_joined_12_10_2020.shp'

def run(verbose=True):
    sr = SpatialReference('EPSG:2326')
    DistrictMinorWork.objects.all().delete()
    lm = LayerMapping(DistrictMinorWork, world_shp, dmw_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)
