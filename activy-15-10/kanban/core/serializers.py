from rest_framework import serializers
from models import Projeto, Coluna, Tarefa, Comentario, Etiqueta, Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email']
        read_only_fields = ['id']

class ProjetoSerializer(serializers.ModelSerializer):
    proprietario = UsuarioSerializer(read_only=True)
    membros = UsuarioSerializer(many=True, read_only=True)

    class Meta:
        model = Projeto
        fields = ['id', 'nome', 'descricao', 'data_criacao', 'proprietario', 'membros']
        read_only_fields = ['id', 'data_criacao']
