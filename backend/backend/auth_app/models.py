import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser,UserManager



class VerifyManager(UserManager):
    def get_queryset(self) :
        return super().get_queryset().filter(is_verified=True)
    def get_by_natural_key(self, username):
        return self.get(username=username)
class AllManager(UserManager):
    def get_queryset(self) :
        return super().get_queryset()
    def get_by_natural_key(self, username):
        return self.get(username=username)


class UserModel(AbstractUser):
    id=models.CharField(default=uuid.uuid4(), editable=False, unique=True,max_length=120,primary_key=True)
    email = models.EmailField(("email address"), blank=True,unique=True)
    is_verified=models.BooleanField(default=False)

    all=AllManager()
    objects=VerifyManager()

class OTP(models.Model):
    id=models.CharField(default=uuid.uuid4(), editable=False, unique=True,max_length=120,primary_key=True)
    otp=models.BigIntegerField()
    user=models.ForeignKey(to=UserModel,on_delete=models.CASCADE)
    otp_datetime=models.DateTimeField()   

# Create your models here.
