from rest_framework import serializers
from .models import Projeto, Coluna, Tarefa, Comentario, Etiqueta, Usuario


class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = ['id','nome', 'cor']
        read_only_fields = ['id']


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email']
        read_only_fields = ['id']


class ColunaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coluna
        fields = ['id','titulo', 'ordem', 'projeto']
        read_only_fields = ['id']


class TarefaSerializer(serializers.ModelSerializer):
    coluna = ColunaSerializer(many=True, read_only=True)
    responsavel = UsuarioSerializer(read_only=True)
    criador = UsuarioSerializer(read_only=True)
    tags = EtiquetaSerializer(many=True, read_only=True)
    class Meta:
        model = Tarefa
        fields = ['id', 'titulo', 'descricao', 'coluna', 'responsavel', 'criador', 'prioridade', 'data_criacao', 'data_conclusao', 'tags']
        read_only_fields = ['id']


class ComentarioSerializer(serializers.ModelSerializer):
    tarefa = TarefaSerializer(many=True, read_only=True)
    autor = UsuarioSerializer(read_only=True)
    class Meta:
        model = Comentario
        fields = ['id', 'tarefa', 'autor', 'texto', 'data_criacao']
        read_only_fields = ['id']


class ProjetoSerializer(serializers.ModelSerializer):
    proprietario = UsuarioSerializer(read_only=True)
    membros = UsuarioSerializer(many=True, read_only=True)

    class Meta:
        model = Projeto
        fields = ['id', 'nome', 'descricao', 'data_criacao', 'proprietario', 'membros']
        read_only_fields = ['id', 'data_criacao']





