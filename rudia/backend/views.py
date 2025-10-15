from django.shortcuts import render
from rest_framework import viewsets
from .models import Usuario, Rudiero, Parceiro, Servico
from .serializers import UsuarioSerializer, RudieroSerializer, ParceiroSerializer, ServicoSerializer
# Create your views here.

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class RudieroViewSet(viewsets.ModelViewSet):
    queryset = Rudiero.objects.all()
    serializer_class = RudieroSerializer

class ParceiroViewSet(viewsets.ModelViewSet):
    queryset = Parceiro.objects.all()
    serializer_class = ParceiroSerializer

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer