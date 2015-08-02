# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('WordLife', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='word',
            name='definition',
        ),
        migrations.AlterField(
            model_name='word',
            name='photo',
            field=models.ImageField(upload_to=b'photos', blank=True),
        ),
    ]
