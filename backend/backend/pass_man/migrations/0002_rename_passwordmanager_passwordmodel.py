# Generated by Django 5.0.7 on 2024-08-05 08:02

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pass_man', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='PasswordManager',
            new_name='PasswordModel',
        ),
    ]
