# Generated by Django 3.1 on 2021-03-13 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0032_auto_20210313_0823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='communityactivitymetadata',
            name='latitude',
            field=models.DecimalField(decimal_places=6, max_digits=50),
        ),
        migrations.AlterField(
            model_name='communityactivitymetadata',
            name='longitude',
            field=models.DecimalField(decimal_places=6, max_digits=50),
        ),
    ]
