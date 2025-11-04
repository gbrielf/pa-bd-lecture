from .models import Etiqueta, Usuario, Coluna, Tarefa, Comentario, Projeto 
from .serializers import EtiquetaSerializer, UsuarioSerializer, ColunaSerializer, TarefaSerializer, ComentarioSerializer, ProjetoSerializer 
from rest_framework import viewsets, status
from rest_framework.decorators import authentication_classes,permission_classes  # type: ignore
from rest_framework.authentication import TokenAuthentication, SessionAuthentication  # type: ignore
from rest_framework.permissions import IsAuthenticated  # type: ignore
from django.shortcuts import get_object_or_404  # type: ignore
from rest_framework.decorators import action
from django.db.models import Count, Max, Min, Sum


# Create your views here.
class EtiquetaViewSet(viewsets.ModelViewSet):
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

    @api_view(['POST'])
    def login(request):
        user = get_object_or_404(User, username=request.data['username'] if not user.check_password(request.data['password']):
            return Response({'message': 'Not found'}, status=status.HTTP_404_BAD_REQUEST)
        
        token, created = Token.objects.get_or_create(user=user)
        serializer = UsuarioSerializer(instance=user)
        return Response({'token': token.key, 'user': serializer.data}))

    @api_view(['POST'])
    def signup(request):
        serializer = MeuUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)
            return Response({'token': token.key, 'user':serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @api_view(['GET'])
    @authentication_classes([TokenAuthentication, SessionAuthentication])
    @permission_classes([IsAuthenticated])
    def test_toker(request):
        return Response("passou para {}".format(request.user.email))


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