from django.core.mail import send_mail
import uuid
import random
import datetime
from .models import OTP


def otp_generator(user,email=None):
    otp=random.randint(100000,999999)
    if not email:
        email=user.email
#    user=TempUser.objects.get(id=user.id)
    otpObj=OTP(otp=otp,otp_datetime=datetime.datetime.now(),id=uuid.uuid4(),user=user)
#    user.save()
    if email:
        send_mail(
        "verify password manager account",
        f"your account is created and your verification code is {otp}.and note the link only valid until 3 minutes",
        "ihsanofficial.webservice@gmail.com",
        [email]
        )
        print(email)

    print(otp)
    return otpObj