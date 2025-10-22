from rest_framework import viewsets, status
from .models import Etiqueta, Usuario, Coluna, Tarefa, Comentario, Projeto 
from .serializers import EtiquetaSerializer, UsuarioSerializer, ColunaSerializer, TarefaSerializer, ComentarioSerializer, ProjetoSerializer 

from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Count, Max, Min, Sum


# Create your views here.
class EtiquetaViewSet(viewsets.ModelViewSet):
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    

class ColunaViewSet(viewsets.ModelViewSet):
    queryset = Coluna.objects.all()
    serializer_class = ColunaSerializer


class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    @action(detail=True, methods=['post'])
    def atribuir_responsavel(self,request, pk=None):
         # POST /api/tarefa/{id}/atribuir/
        pass

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer


class ProjetoViewSet(viewsets.ModelViewSet):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer

    @action(detail=True, methods=['post'])
    def adicionar_membro(self, request, pk=None):
        # POST /api/projetos/{id}/adicionar/
        # Body: {"user_id": 5}
        pass

    @action(detail=True, methods=['get'])
    def minhas_tarefas(self, request, pk=None):
        # GET /api/projetos/{id}/minhas_tarefas/
        pass