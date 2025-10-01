from rest_framework import serializers
from .models import Usuario, Rudiero, Parceiro

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
class RudieroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rudiero
        fields = '__all__'
class ParceiroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parceiro
        fields = '__all__'