import random
import string
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from auth_app.models import UserModel
from .models import PasswordModel
from .serializers import PasswordSerilizer
from rest_framework import viewsets
# Create your views here.

class PasswordManagerViewSet(viewsets.ModelViewSet):
    serializer_class = PasswordSerilizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PasswordModel.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_password(request):
    print(request.data)
    smLetters=string.ascii_letters[:26]
    cLetters=string.ascii_letters[26:]
    digits=string.digits
    spCharachters=string.punctuation
    password=''
    cmp=[string.ascii_letters[:26]]
    choice=request.data['choice']
    if choice.get('uppercase') == True:
        cmp.append(string.ascii_letters[26:])
    if choice.get('digits')==True:
        cmp.append(digits)
    if choice.get('sp_chars')==True:
        cmp.append(spCharachters)
    try:
      l=int(request.data['passLength'])
    except:
        l=35
    if l>35:l=35
    if l<10:l=10
    for _ in range(l):
        choice=random.choice(cmp)
        password+=random.choice(list(choice))
    request.data['user']=request.user.id
    request.data['password']=password

    if 'http://' not in request.data['site_url'] and 'https://' not in request.data['site_url']:
        request.data['site_url']='https://'+request.data['site_url']
    serilizer=PasswordSerilizer(data=request.data)
    if serilizer.is_valid():
        serilizer.save()
    else:
        return JsonResponse(serilizer.errors,status=400)
    return JsonResponse({'message':'success','password':password})
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_passwords(request):
    objList=PasswordModel.objects.filter(user__id=request.user.id) 
    return JsonResponse({"data":PasswordSerilizer(objList,many=True).data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_password(request):
    obj=PasswordModel.objects.filter(user__id=request.user.id,id=request.query_params['id']) 
    if obj.exists():
        return JsonResponse(data=PasswordSerilizer(instance=obj.first()).data)
    return JsonResponse({'message':'not found'},status=404)    



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_password(request):
    obj=PasswordModel.objects.filter(user__id=request.user.id,id=request.data['id']) 
    if obj.exists():
        obj.delete()
        return JsonResponse({'message':'deletion is success'})
    return JsonResponse({'message':'not found'},status=404)