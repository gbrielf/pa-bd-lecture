from .models import Etiqueta, Usuario, Coluna, Tarefa, Comentario, Projeto 
from .serializers import EtiquetaSerializer, RegistroSerializer, UsuarioSerializer, ColunaSerializer, TarefaSerializer, TarefaCreateSerializer, ComentarioSerializer, ProjetoSerializer, ProjetoCreateSerializer 
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes,permission_classes  # type: ignore
from rest_framework.authentication import TokenAuthentication, SessionAuthentication  # type: ignore
from django.shortcuts import get_object_or_404  # type: ignore
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
        
        # Gerar tokens JWT
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
    """
    Endpoint para obter dados do usuário autenticado
    GET /api/usuario/
    
    Header necessário:
    Authorization: Bearer <access_token>
    """
    serializer = UsuarioSerializer(request.user)
    return Response(serializer.data)


# Create your views here.
class EtiquetaViewSet(viewsets.ModelViewSet):
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    @api_view(['POST'])
    def login(request):
        user = get_object_or_404(User, username=request.data['username'])
        if not user.check_password(request.data['password']):
            return Response({'message': 'Not found'}, status=status.HTTP_404_BAD_REQUEST)
        
        token, created = Token.objects.get_or_create(user=user)
        serializer = UsuarioSerializer(instance=user)
        return Response({'token': token.key, 'user': serializer.data})

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
    def test_token(request):
        return Response("passou para {}".format(request.user.email))


class ColunaViewSet(viewsets.ModelViewSet):
    queryset = Coluna.objects.all()
    serializer_class = ColunaSerializer


class TarefaViewSet(viewsets.ModelViewSet):
    queryset = Tarefa.objects.all()
    serializer_class = TarefaSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return TarefaCreateSerializer
        return TarefaSerializer

    def create(self, request, *args, **kwargs):
        # Usar TarefaCreateSerializer para validação e criação
        create_serializer = TarefaCreateSerializer(data=request.data, context={'request': request})
        create_serializer.is_valid(raise_exception=True)
        tarefa = create_serializer.save()
        
        # Usar TarefaSerializer para resposta completa
        response_serializer = TarefaSerializer(tarefa)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

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

    def get_serializer_class(self):
        if self.action == 'create':
            return ProjetoCreateSerializer
        return ProjetoSerializer

    def create(self, request, *args, **kwargs):
        # Usar ProjetoCreateSerializer para validação e criação
        create_serializer = ProjetoCreateSerializer(
            data=request.data,
            context={'request': request}
        )
        create_serializer.is_valid(raise_exception=True)
        projeto = create_serializer.save()
        
        # Usar ProjetoSerializer para resposta completa
        response_serializer = ProjetoSerializer(projeto)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def adicionar_membro(self, request, pk=None):
        # POST /api/projetos/{id}/adicionar/
        # Body: {"user_id": 5}
        pass

    @action(detail=True, methods=['get'])
    def minhas_tarefas(self, request, pk=None):
        # GET /api/projetos/{id}/minhas_tarefas/
        pass