# Generated by Django 3.1 on 2020-11-20 08:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0008_auto_20201120_0844'),
    ]

    operations = [
        migrations.AlterField(
            model_name='districtminorworkmetadata',
            name='location',
            field=models.CharField(max_length=512),
        ),
    ]
