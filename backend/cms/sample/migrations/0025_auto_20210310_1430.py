# Generated by Django 3.1 on 2021-03-10 14:30

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0024_communityactivitymetadata_point'),
    ]

    operations = [
        migrations.AddField(
            model_name='communityactivitymetadata',
            name='end_date_2',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='communityactivitymetadata',
            name='start_date_2',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AddField(
            model_name='searchresultmodel',
            name='mpoint',
            field=django.contrib.gis.db.models.fields.PointField(default=None, srid=4326),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='communityactivitymetadata',
            name='point',
            field=django.contrib.gis.db.models.fields.PointField(default=None, null=True, srid=4326),
        ),
        migrations.AlterField(
            model_name='searchresultmodel',
            name='mpoly',
            field=django.contrib.gis.db.models.fields.GeometryField(default=None, null=True, srid=4326),
        ),
    ]