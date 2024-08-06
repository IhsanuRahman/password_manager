from django.db import models
from auth_app.models import UserModel
from .utils import EncryptedField

# Create your models here.
class PasswordModel(models.Model):
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    site_name = models.CharField(max_length=255)
    site_url = models.URLField()
    username = models.CharField(max_length=255)
    password = EncryptedField()

    def __str__(self):
        return self.site_name