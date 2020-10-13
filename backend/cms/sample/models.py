from django.contrib.gis.db import models


#wget https://thematicmapping.org/downloads/TM_WORLD_BORDERS-0.3.zip

class WorldBorder(models.Model):
    # Regular Django fields corresponding to the attributes in the
    # world borders shapefile.
    name = models.CharField(max_length=50)
    area = models.IntegerField()
    pop2005 = models.IntegerField('Population 2005')
    fips = models.CharField('FIPS Code', max_length=2, null=True)
    iso2 = models.CharField('2 Digit ISO', max_length=2)
    iso3 = models.CharField('3 Digit ISO', max_length=3)
    un = models.IntegerField('United Nations Code')
    region = models.IntegerField('Region Code')
    subregion = models.IntegerField('Sub-Region Code')
    lon = models.FloatField()
    lat = models.FloatField()

    # GeoDjango-specific: a geometry field (MultiPolygonField)
    mpoly = models.MultiPolygonField()

    # Returns the string representation of the model.
    def __str__(self):
        return self.name
# Create your models here.


class DistrictMinorWork(models.Model):
    identifier = models.CharField(max_length=256)   
    project_name = models.CharField(max_length=256)   
    attachment = models.CharField(max_length=256)   
    proposer = models.CharField(max_length=256)   
    objective = models.TextField()   
    desc = models.TextField()   
    project_number = models.CharField(max_length=256)   
    address = models.CharField(max_length=256, null=True)   
    remarks = models.CharField(max_length=256, null=True)   
    start_date = models.CharField(max_length=256, null=True)   
    end_date = models.CharField(max_length=256, null=True)   
    project_pdf = models.CharField(max_length=2056) 
    document_date = models.CharField(max_length=128)
    budget = models.DecimalField(decimal_places=4, max_digits=50)
    audience = models.CharField(max_length=128, null=True)
    audience_size = models.CharField(max_length=128, null=True)
    mpoly = models.MultiPolygonField()
  
    def __str__(self):
        return self.project_name
