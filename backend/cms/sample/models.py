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


  
class DistrictMinorWorkMetaData(models.Model):
    identifier = models.CharField(max_length=256, primary_key=True)   
    project_name = models.CharField(max_length=256)   
    committee = models.CharField(max_length=256)
    document_no = models.CharField(max_length=256)
    document_date = models.DateField()
    project_pdf = models.CharField(max_length=2056) 
    attachment = models.CharField(max_length=256)   
    proposer = models.CharField(max_length=256)   
    objective = models.TextField()   
    audience_all_citizen = models.CharField(max_length=32)
    audience_elderly = models.CharField(max_length=32)
    audience_youth = models.CharField(max_length=32)
    audience_disabled = models.CharField(max_length=32)
    audience_kids = models.CharField(max_length=32)
    audience_others = models.CharField(max_length=32)
    audience_size = models.CharField(max_length=128, null=True)
    ballpark = models.DecimalField(decimal_places=0, max_digits=50)
    ballpark_text = models.CharField(max_length=128, null=True)
    outline = models.TextField()
    location = models.CharField(max_length=512)

    def __str__(self):
        return self.project_name


class DistrictMinorWork(models.Model):
    identifier = models.CharField(max_length=256, primary_key=True)   
    project_name = models.CharField(max_length=256)   
    metadata = models.OneToOneField('DistrictMinorWorkMetaData', null=True, on_delete=models.CASCADE, to_field='identifier')
    mpoly = models.MultiPolygonField()


