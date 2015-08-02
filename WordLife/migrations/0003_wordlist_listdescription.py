# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('WordLife', '0002_auto_20150801_2045'),
    ]

    operations = [
        migrations.AddField(
            model_name='wordlist',
            name='listDescription',
            field=models.CharField(max_length=200, blank=True),
        ),
    ]
