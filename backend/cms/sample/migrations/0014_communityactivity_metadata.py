# Generated by Django 3.1 on 2020-12-24 13:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sample', '0013_auto_20201224_1301'),
    ]

    operations = [
        migrations.AddField(
            model_name='communityactivity',
            name='metadata',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='sample.communityactivitymetadata'),
        ),
    ]