# Generated by Django 3.1 on 2020-10-13 11:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0003_auto_20201013_1111'),
    ]

    operations = [
        migrations.AlterField(
            model_name='districtminorwork',
            name='end_date',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='districtminorwork',
            name='start_date',
            field=models.CharField(max_length=256, null=True),
        ),
    ]
