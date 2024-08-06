from rest_framework import serializers
from .models import PasswordModel

class PasswordSerilizer(serializers.ModelSerializer):
    class Meta:
        model = PasswordModel
        fields = ('id', 'site_name', 'site_url', 'username', 'password','user')
    def validate(self, attrs):
        url=attrs['site_url']
        if 'http://' in url:
            if PasswordModel.objects.filter(username=attrs['username'],site_url=url).exists():
                raise serializers.ValidationError({"username":"username already exists"})
            else:
                url='https://'+url[7:]
                if PasswordModel.objects.filter(username=attrs['username'],site_url=url).exists():
                    raise serializers.ValidationError({"username":"username already exists"})
        elif 'https://' in url:
            if PasswordModel.objects.filter(username=attrs['username'],site_url=url).exists():
                raise serializers.ValidationError({"username":"username already exists"})
            else:
                url='http://'+url[8:]
                if PasswordModel.objects.filter(username=attrs['username'],site_url=url).exists():
                    raise serializers.ValidationError({"username":"username already exists"})
        return super().validate(attrs)
    
    def create(self, validated_data):
        print(validated_data)
        obj=PasswordModel(
                user=validated_data['user'],
                site_name=validated_data['site_name'],
                site_url=validated_data['site_url'],
                username=validated_data['username'],
                password=validated_data['password'])
        obj.save()

        return obj

