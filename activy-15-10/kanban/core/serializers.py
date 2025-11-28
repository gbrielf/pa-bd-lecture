from rest_framework import serializers
from .models import Usuario, Projeto, Coluna, Tarefa, Comentario, Etiqueta, Perfil


class PerfilSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Perfil
        fields = ['tipo', 'tipo_display', 'telefone']


class UsuarioSerializer(serializers.ModelSerializer):
    perfil = PerfilSerializer(read_only=True)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'telefone', 'perfil']


class RegistroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)
    tipo_perfil = serializers.ChoiceField(choices=Perfil.TIPO_PERFIL_CHOICES, write_only=True)
    telefone = serializers.CharField(write_only=True, allow_blank=True, required=False)

    class Meta:
        model = Usuario
        # incluir tipo_perfil em vez de 'perfil'
        fields = ['username', 'email', 'password', 'password_confirm', 'first_name', 'last_name', 'telefone', 'tipo_perfil']

    def validate(self, data):
        if data.get('password') != data.get('password_confirm'):
            raise serializers.ValidationError({'password_confirm': "As senhas não coincidem."})
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm', None)
        tipo_perfil = validated_data.pop('tipo_perfil', None)
        telefone = validated_data.pop('telefone', '')
        password = validated_data.pop('password', None)

        usuario = Usuario.objects.create_user(**validated_data, password=password)

        Perfil.objects.create(usuario=usuario, tipo=tipo_perfil, telefone=telefone)
        return usuario


class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = ['id', 'nome', 'cor']
        read_only_fields = ['id']


# Serializer básico para ComentarioSerializer (evitar referência circular)
class ComentarioSimpleSerializer(serializers.ModelSerializer):
    autor = UsuarioSerializer(read_only=True)

    class Meta:
        model = Comentario
        fields = ['id', 'autor', 'texto', 'data_criacao']
        read_only_fields = ['id']


# TarefaSerializer com informações completas
class TarefaSerializer(serializers.ModelSerializer):
    responsavel = UsuarioSerializer(read_only=True)
    criador = UsuarioSerializer(read_only=True)
    tags_nomes = serializers.SerializerMethodField()
    comentarios_count = serializers.SerializerMethodField()
    comentarios = ComentarioSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Tarefa
        fields = [
            'id', 'titulo', 'descricao', 'coluna', 'responsavel', 'criador',
            'prioridade', 'data_criacao', 'data_conclusao', 'tags_nomes',
            'comentarios_count', 'comentarios'
        ]
        read_only_fields = ['id']

    def get_tags_nomes(self, obj):
        """Retorna lista de nomes das tags"""
        return [tag.nome for tag in obj.tags.all()]

    def get_comentarios_count(self, obj):
        """Retorna contagem de comentários"""
        return obj.comentarios.count()


# ColunaSerializer com tarefas aninhadas e nome do projeto
class ColunaSerializer(serializers.ModelSerializer):
    tarefas = TarefaSerializer(many=True, read_only=True)
    nome_projeto = serializers.CharField(source='projeto.nome', read_only=True)

    class Meta:
        model = Coluna
        fields = ['id', 'titulo', 'ordem', 'projeto', 'nome_projeto', 'tarefas']
        read_only_fields = ['id']


# ProjetoSerializer com colunas aninhadas, nomes dos membros e contagem de tarefas
class ProjetoSerializer(serializers.ModelSerializer):
    proprietario = UsuarioSerializer(read_only=True)
    membros_nomes = serializers.SerializerMethodField()
    colunas = ColunaSerializer(many=True, read_only=True)
    tarefas_totais = serializers.SerializerMethodField()

    class Meta:
        model = Projeto
        fields = [
            'id', 'nome', 'descricao', 'data_criacao', 'proprietario',
            'membros_nomes', 'colunas', 'tarefas_totais'
        ]
        read_only_fields = ['id', 'data_criacao']

    def get_membros_nomes(self, obj):
        """Retorna lista de nomes dos membros"""
        return [f"{membro.first_name} {membro.last_name} ({membro.username})" for membro in obj.membros.all()]

    def get_tarefas_totais(self, obj):
        """Retorna contagem total de tarefas do projeto"""
        return Tarefa.objects.filter(coluna__projeto=obj).count()


# ComentarioSerializer completo - deve vir por último para evitar referência circular
class ComentarioSerializer(serializers.ModelSerializer):
    tarefa = TarefaSerializer(read_only=True)
    autor = UsuarioSerializer(read_only=True)

    class Meta:
        model = Comentario
        fields = ['id', 'tarefa', 'autor', 'texto', 'data_criacao']
        read_only_fields = ['id']