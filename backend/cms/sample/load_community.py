from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from django.contrib.gis.gdal import SpatialReference
import pandas as pd
from .models import CommunityActivity, CommunityActivityMetaData, Category
from datetime import datetime
from django.contrib.gis.geos import Point

community_mapping = {
      "code": "Map_Code"
      , 'mpoly': "MULTIPOINT"
}


prefix = "Projection_WGS_1984_REAL_All_communities_involvement_activities"
world_shp = prefix + ".shp"
csv_file = prefix + ".csv"
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
    df = df.sort_values(by=["code"])
    #print(df[df["code"].str.contains("CIA2020089")][["group_name", "code"]])
    #aasa

    CommunityActivityMetaData.objects.all().delete()
    CommunityActivity.objects.all().delete()
    for idx, row in df.iterrows():
        row["document_date"] = datetime.strptime(row["document_date"], "%d/%m/%Y")
        if row["code"].strip() == "":
            continue
        for d in ["start_date", "end_date", "start_date_1", "end_date_1", "end_date_2", "start_date_2"]:
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
        if "多日" in row["date_type"]:
            row["start_date"] = row["start_date_2"]
            row["end_date"] = row["end_date_2"]
        del row["date_type"]
        zero = "non-zero"
        lat = 22.27702
        lng = 114.17232
        if row["latitude"] != 0.0:
            lat, lng = row["latitude"], row["longitude"]
        row["point"] = Point(lng, lat)

        t = row["category_text"]
        if "." in t:
            t = t.split(".")[1]
            row["category"] = Category.objects.filter(text=t).first()
        
        last_char = row["code"][-1:]
        if last_char.isalpha():
            parent_code = row["code"][0:-1]
            row["parent"] = CommunityActivityMetaData.objects.filter(code=parent_code).first()
            row["version"] = last_char
        if row["stacked_bar_chart_amount"] == "":
            row["stacked_bar_chart_amount"] = None
        else:
            try:
                row["stacked_bar_chart_amount"] = float(row["stacked_bar_chart_amount"].replace(",", ""))
            except:
                row["stacked_bar_chart_amount"] = 0.0
                print(row["code"], "amount wrong")
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

    for metadata in CommunityActivityMetaData.objects.all():
        metadata.activity = CommunityActivity.objects.filter(code=metadata.code).first()
        if metadata.activity is None:
            print(metadata.code, "has no activity")
        else:
            metadata.save()

