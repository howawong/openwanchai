from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.gdal import SpatialReference
import pandas as pd
from .models import DistrictMinorWork, DistrictMinorWorkMetaData
from datetime import datetime


dmw_mapping = {
      "identifier": "objectID"
      , "project_name": "proj_name"
      , 'mpoly': "MULTIPOLYGON"
}

world_shp = 'WanChai_MWP.shp'
csv_file = 'metadata.csv'
column_mapping = 'mapping.csv'


class StringConverter(dict):
    def __contains__(self, item):
        return True

    def __getitem__(self, item):
        return str

    def get(self, default=None):
        return str


def run(verbose=True):
    df = pd.read_csv(csv_file, converters=StringConverter())
    mapping = {row["original"]: row["new"] for idx, row in pd.read_csv(column_mapping).iterrows()}
    df = df.rename(columns=mapping)
    l = list(set(mapping.values()))
    df = df[l]
    print(df.head(n=5))
    DistrictMinorWorkMetaData.objects.all().delete()
    for idx, row in df.iterrows():
        row["document_date"] = datetime.strptime(row["document_date"], "%d/%m/%Y")
        row["ballpark_text"] = row["ballpark"]
        try:
            row["ballpark"] = float(row["ballpark_text"])
        except:
            row["ballpark"] = 0
        m = DistrictMinorWorkMetaData(**row)
        m.save()
    sr = SpatialReference('EPSG:2326')
    DistrictMinorWork.objects.all().delete()
    lm = LayerMapping(DistrictMinorWork, world_shp, dmw_mapping, transform=True)
    lm.save(strict=True, verbose=verbose)



    for dmw in DistrictMinorWork.objects.all():
        dmw.metadata = DistrictMinorWorkMetaData.objects.get(identifier=dmw.identifier)
        dmw.save()

