# Generated by Django 3.1 on 2021-03-13 08:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0030_auto_20210313_0816'),
    ]

    operations = [
        migrations.AlterField(
            model_name='communityactivitymetadata',
            name='stacked_bar_chart_amount',
            field=models.DecimalField(decimal_places=0, max_digits=50, null=True),
        ),
    ]
