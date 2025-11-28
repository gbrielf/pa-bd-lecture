from rest_framework import viewsets, status
from .models import Etiqueta, Usuario, Coluna, Tarefa, Comentario, Projeto, Perfil
from .serializers import RegistroSerializer, UsuarioSerializer, EtiquetaSerializer, UsuarioSerializer, ColunaSerializer, TarefaSerializer, ComentarioSerializer, ProjetoSerializer, PerfilSerializer
from rest_framework.decorators import action
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def registro_view(request):
    serializer = RegistroSerializer(data=request.data)

    if serializer.is_valid():
        usuario = serializer.save()

        refresh = RefreshToken.for_user(usuario)

        return Response({
            'message': 'Usuário registrado com sucesso!',
            'user': UsuarioSerializer(usuario).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def usuario_atual_view(request):
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class PerfilViewSet(viewsets.ModelViewSet):
    queryset = Perfil.objects.all()
    serializer_class = PerfilSerializer


# Create your views here.
class EtiquetaViewSet(viewsets.ModelViewSet):
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer
   

class ColunaViewSet(viewsets.ModelViewSet):
    queryset = Coluna.objects.all()
    serializer_class = ColunaSerializer


class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    @action(detail=True, methods=['POST'])
    def atribuir_responsavel(self,request, pk=None):
         # POST /api/tarefa/{id}/atribuir/
        pass

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer


class ProjetoViewSet(viewsets.ModelViewSet):
    queryset = Projeto.objects.all()
    serializer_class = ProjetoSerializer

    @action(detail=True, methods=['POST'])
    def adicionar_membro(self, request, pk=None):
        # POST /api/projetos/{id}/adicionar/
        # Body: {"user_id": 5}
        pass

    @action(detail=True, methods=['GET'])
    def minhas_tarefas(self, request, pk=None):
        # GET /api/projetos/{id}/minhas_tarefas/
        pass