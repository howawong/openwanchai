# Generated by Django 3.1 on 2021-02-28 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0017_category_searchresultmodel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='communityactivitymetadata',
            name='address',
            field=models.CharField(max_length=512),
        ),
        migrations.AlterField(
            model_name='communityactivitymetadata',
            name='document_url',
            field=models.CharField(max_length=2048),
        ),
    ]
