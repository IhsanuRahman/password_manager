import datetime
from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from .models import OTP, UserModel
from .utils import otp_generator
from .serializers import UserRegisterSerilizer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def signup(request):
    user = UserRegisterSerilizer(data=request.data)
    if user.is_valid():
        user = user.save()
        if user:
            otpObj = otp_generator( user,user.email)
            user.otp=otpObj
            user.date_joined=datetime.datetime.now()
            user.save()
            otpObj.save()
            return JsonResponse({
                'message': 'user is created',
                'token': otpObj.id
            }, status=200)
    else:
        return JsonResponse(user.errors, status=400)

@api_view(['POST'])
def verify_otp(request):
    id=request.data.get('token','')
    if not id or id=='':
        return JsonResponse({'message':'credentials is missing for validation'},status=400)
    otpObj=OTP.objects.filter(id=id).first()
    if otpObj:
        otp=request.data.get('otp','')
        print(otpObj.otp,otp)
        if otpObj.otp==int(otp):
            otpObj.user.is_verified=True
            otpObj.user.save()
            otpObj.delete()
            return JsonResponse({'message':'verification success'})
        else:
            return JsonResponse({'message':'OTP is not correct'},status=400)

    else:
        return JsonResponse({'message':'not found'},status=404)



@api_view(['POST'])
def login(request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = UserModel.objects.all().filter(username=username).first() 
        if not user:
            user=UserModel.objects.all().filter(email=username).first()
        if user is not None and user.check_password(password):
            
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        else:
            return JsonResponse({
                'detail': 'Invalid credentials'
            }, status=400)


@api_view([ 'POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    refresh_token = request.data['refresh_token']
    if refresh_token:
        
        token = RefreshToken(refresh_token)
        token.blacklist()
        print(request.data)
    return JsonResponse({"message": "Logout Successful"}, status=200)


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated]) 
def get_user(request):
    user=UserModel.objects.filter(id=request.user.id).first()
    if user:
        data={
            'username':user.username,
            'first_name':user.first_name,
            'last_name':user.last_name,
        }
        return JsonResponse(data)
    return JsonResponse({'message':'user not found'},status=404)