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
    expected_start_date = models.DateField(default=None, null=True, blank=True)
    expected_end_date = models.DateField(default=None, null=True, blank=True)
    expected_date_format = models.CharField(max_length=64, default='')
    audience = models.CharField(max_length=256, default='')   
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


class CommunityActivity(models.Model):
    code = models.CharField(max_length=256, primary_key=True)
    metadata = models.OneToOneField('CommunityActivityMetaData', null=True, on_delete=models.CASCADE, to_field='code')
    mpoly = models.MultiPointField()   


class CommunityActivityMetaData(models.Model):
    code = models.CharField(max_length=256, primary_key=True)
    group_type = models.CharField(max_length=256)
    group_name = models.CharField(max_length=256)
    document_date = models.CharField(max_length=256)
    document_no = models.CharField(max_length=256)
    project_name = models.CharField(max_length=256)
    organization_name = models.CharField(max_length=256)
    first_time = models.CharField(max_length=256)
    document_url = models.CharField(max_length=2048)
    coorganizer_govt = models.CharField(max_length=256)
    coorganizer_non_govt = models.CharField(max_length=256)
    address = models.CharField(max_length=512)
    latitude = models.DecimalField(decimal_places=0, max_digits=50)
    longitude = models.DecimalField(decimal_places=0, max_digits=50)
    date_type = models.CharField(max_length=256)
    start_date = models.DateField(default=None, null=True, blank=True)
    end_date = models.DateField(default=None, null=True, blank=True)
    start_date_1 = models.DateField(default=None, null=True, blank=True)
    start_date_type_1 = models.CharField(max_length=256)
    end_date_type_2 = models.CharField(max_length=256)
    end_date_type_2 = models.CharField(max_length=256)
    audience_size = models.CharField(max_length=128, null=True)
    nature = models.CharField(max_length=256)
    objective = models.CharField(max_length=2048)
    audience = models.CharField(max_length=256)
    helping_organization = models.CharField(max_length=256)
    estimation = models.DecimalField(decimal_places=0, max_digits=50)
    applied = models.DecimalField(decimal_places=0, max_digits=50)
    income = models.DecimalField(decimal_places=0, max_digits=50)
    payee = models.CharField(max_length=256)
    def __str__(self):
        return self.code + " "  + self.project_name


class Category(models.Model):
    code = models.CharField(max_length=256, primary_key=True)
    text = models.CharField(max_length=256)
    img = models.CharField(max_length=256)
