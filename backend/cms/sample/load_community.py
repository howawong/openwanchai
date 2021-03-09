from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.gdal import SpatialReference
import pandas as pd
from .models import CommunityActivity, CommunityActivityMetaData
from datetime import datetime


community_mapping = {
      "code": "Map_Code"
      , 'mpoly': "MULTIPOINT"
}

world_shp = 'All_communities_involvement_activities_16_Feb_WGS_84.shp'
csv_file = 'All_communities_involvement_activities_16_Feb_WGS_84.csv'
column_mapping = 'mapping_community.csv'


class StringConverter(dict):
    def __contains__(self, item):
        return True

    def __getitem__(self, item):
        return str

    def get(self, default=None):
        return str


def run(verbose=True):
    df = pd.read_csv(csv_file, converters=StringConverter(), encoding="utf-8")
    mapping = {row["original"]: row["new"] for idx, row in pd.read_csv(column_mapping).iterrows()}
    df = df.rename(columns=mapping)
    l = list(set(mapping.values()))
    df = df[l]
    CommunityActivityMetaData.objects.all().delete()
    for idx, row in df.iterrows():
        row["document_date"] = datetime.strptime(row["document_date"], "%d/%m/%Y")
        for d in ["start_date", "end_date", "start_date_1", "end_date_1"]:
            try:
                row[d] = datetime.strptime(row[d], "%d/%m/%Y")
            except ValueError:
                row[d] = None
                pass
        for c in ["estimation", "applied", "income", "latitude", "longitude"]:
            if row[c] == '':
                row[c] = float(0)
            else:
              row[c] = float(row[c].replace(",", ""))
        if row["date_type"] == "區間活動":
            row["start_date"] = row["start_date_1"]
            row["end_date"] = row["end_date_1"]
        del row["date_type"]
        m = CommunityActivityMetaData(**row)
        m.save()
    sr = SpatialReference('EPSG:2326')
    lm = LayerMapping(CommunityActivity, world_shp, community_mapping, transform=True)
    lm.save(verbose=False)


    for comm in CommunityActivity.objects.all():
        comm.metadata = CommunityActivityMetaData.objects.filter(code=comm.code).first()
        if comm.metadata is None:
            print(comm.code, "has no metadata")
        comm.save()

