# Generated by Django 3.1 on 2020-12-23 16:53

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0010_districtminorwork_metadata'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommunityActivity',
            fields=[
                ('code', models.CharField(max_length=256, primary_key=True, serialize=False)),
                ('mpoints', django.contrib.gis.db.models.fields.MultiPointField(srid=4326)),
            ],
        ),
        migrations.CreateModel(
            name='CommunityActivityMetaData',
            fields=[
                ('code', models.CharField(max_length=256, primary_key=True, serialize=False)),
                ('group_type', models.CharField(max_length=256)),
                ('group_name', models.CharField(max_length=256)),
                ('document_date', models.CharField(max_length=256)),
                ('document_no', models.CharField(max_length=256)),
                ('project_name', models.CharField(max_length=256)),
                ('organization_name', models.CharField(max_length=256)),
                ('first_time', models.CharField(max_length=256)),
                ('document_url', models.CharField(max_length=256)),
                ('coorganizer_govt', models.CharField(max_length=256)),
                ('coorganizer_non_govt', models.CharField(max_length=256)),
                ('address', models.CharField(max_length=256)),
                ('latitude', models.DecimalField(decimal_places=0, max_digits=50)),
                ('longitude', models.DecimalField(decimal_places=0, max_digits=50)),
                ('date_type', models.CharField(max_length=256)),
                ('start_date', models.CharField(max_length=256)),
                ('end_date', models.CharField(max_length=256)),
                ('start_date_1', models.CharField(max_length=256)),
                ('start_date_type_1', models.CharField(max_length=256)),
                ('end_date_type_2', models.CharField(max_length=256)),
                ('nature', models.CharField(max_length=256)),
                ('objective', models.CharField(max_length=256)),
                ('audience', models.CharField(max_length=256)),
                ('helping_organization', models.CharField(max_length=256)),
                ('estimation', models.DecimalField(decimal_places=0, max_digits=50)),
                ('applied', models.DecimalField(decimal_places=0, max_digits=50)),
                ('income', models.DecimalField(decimal_places=0, max_digits=50)),
                ('payee', models.CharField(max_length=256)),
            ],
        ),
    ]
