# segundo passo para usar o django rest framework
from rest_framework import serializers
from .models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__' # Ou especifique os campos desejados, ex: ['id', 'nome', 'email']