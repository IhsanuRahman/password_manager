from rest_framework import serializers
from auth_app.models import UserModel

class UserRegisterSerilizer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    def validate(self, data):
        error={}
        if not data['username']:
            error['username']='username is required'
        elif UserModel.all.filter(username=data['username']).exists() :
                
            error['username']='Username is already exists'
        if not data['email']:
            error['email']='email is required'
        elif UserModel.all.filter(email=data['email']).exists():
            error['email']='Email is already exists'
                # raise serializers.ValidationError({"email":'Email is already exists'})
        if error:
            raise serializers.ValidationError(error)
        return data
    def create(self, validated_data):
        user=UserModel(
                username=validated_data['username'],
                last_name=validated_data['last_name'],
                first_name=validated_data['first_name'],
                email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        return user