from rest_framework import serializers
from .models import (
    Usuario, Rudiero, Parceiro, Moderador, Administrador,
    Estado, Cidade, Categoria, Tag, Endereco, Servico,
    Roteiro, HorarioFuncionamento, ImagemCidade, ImagemServico,
    AnalisePropostaParceria, AnalisePropostaServico
)


# Serializers básicos para evitar referências circulares
class EstadoBasicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estado
        fields = ['id', 'nome', 'sigla']


class CidadeBasicaSerializer(serializers.ModelSerializer):
    estado = EstadoBasicoSerializer(read_only=True)
    
    class Meta:
        model = Cidade
        fields = ['id', 'nome', 'estado']


class CategoriaBasicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome']


class ParceiroBasicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parceiro
        fields = ['id', 'username', 'nome', 'cnpj']


class RudieroBasicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rudiero
        fields = ['id', 'username', 'nome']


class EstadoSerializer(serializers.ModelSerializer):
    estado_formatado = serializers.ReadOnlyField()
    
    class Meta:
        model = Estado
        fields = ['id', 'nome', 'sigla', 'estado_formatado']


class CidadeSerializer(serializers.ModelSerializer):
    estado = EstadoSerializer(read_only=True)
    estado_id = serializers.IntegerField(write_only=True)
    cidade_formatada = serializers.ReadOnlyField()
    
    class Meta:
        model = Cidade
        fields = ['id', 'nome', 'estado', 'estado_id', 'cidade_formatada']


class EnderecoSerializer(serializers.ModelSerializer):
    cep_formatado = serializers.ReadOnlyField()
    endereco_formatado = serializers.ReadOnlyField()
    
    class Meta:
        model = Endereco
        fields = ['id', 'cep', 'logradouro', 'numero', 'complemento', 
                 'cep_formatado', 'endereco_formatado']


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome']


class TagSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Tag
        fields = ['id', 'nome', 'descricao', 'categoria', 'categoria_id']


class UsuarioSerializer(serializers.ModelSerializer):
    telefone_formatado = serializers.ReadOnlyField()
    eh_rudiero = serializers.ReadOnlyField()
    eh_parceiro = serializers.ReadOnlyField()
    eh_moderador = serializers.ReadOnlyField()
    eh_administrador = serializers.ReadOnlyField()
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'nome',
                 'telefone', 'foto_perfil', 'url_instagram', 'url_facebook',
                 'url_x', 'url_tiktok', 'is_active', 'date_joined', 'password',
                 'telefone_formatado', 'eh_rudiero', 'eh_parceiro', 'eh_moderador',
                 'eh_administrador']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = Usuario.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class RudieroSerializer(serializers.ModelSerializer):
    idade = serializers.ReadOnlyField()
    data_nascimento_formatada = serializers.ReadOnlyField()
    telefone_formatado = serializers.ReadOnlyField()
    eh_rudiero = serializers.ReadOnlyField()
    eh_parceiro = serializers.ReadOnlyField()
    eh_moderador = serializers.ReadOnlyField()
    eh_administrador = serializers.ReadOnlyField()
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Rudiero
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'nome',
                 'telefone', 'foto_perfil', 'url_instagram', 'url_facebook',
                 'url_x', 'url_tiktok', 'is_active', 'date_joined',
                 'data_nascimento', 'genero', 'password', 'idade',
                 'data_nascimento_formatada', 'telefone_formatado',
                 'eh_rudiero', 'eh_parceiro', 'eh_moderador', 'eh_administrador']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        rudiero = Rudiero.objects.create_user(**validated_data)
        rudiero.set_password(password)
        rudiero.save()
        return rudiero


class ParceiroSerializer(serializers.ModelSerializer):
    cnpj_formatado = serializers.ReadOnlyField()
    exibir_ativo = serializers.ReadOnlyField()
    data_admissao_formatada = serializers.ReadOnlyField()
    telefone_formatado = serializers.ReadOnlyField()
    eh_rudiero = serializers.ReadOnlyField()
    eh_parceiro = serializers.ReadOnlyField()
    eh_moderador = serializers.ReadOnlyField()
    eh_administrador = serializers.ReadOnlyField()
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Parceiro
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'nome',
                 'telefone', 'foto_perfil', 'url_instagram', 'url_facebook',
                 'url_x', 'url_tiktok', 'is_active', 'date_joined',
                 'cnpj', 'ativo', 'data_admissao', 'password',
                 'cnpj_formatado', 'exibir_ativo', 'data_admissao_formatada',
                 'telefone_formatado', 'eh_rudiero', 'eh_parceiro',
                 'eh_moderador', 'eh_administrador']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        parceiro = Parceiro.objects.create_user(**validated_data)
        parceiro.set_password(password)
        parceiro.save()
        return parceiro


class ModeradorSerializer(serializers.ModelSerializer):
    idade = serializers.ReadOnlyField()
    data_nascimento_formatada = serializers.ReadOnlyField()
    telefone_formatado = serializers.ReadOnlyField()
    eh_rudiero = serializers.ReadOnlyField()
    eh_parceiro = serializers.ReadOnlyField()
    eh_moderador = serializers.ReadOnlyField()
    eh_administrador = serializers.ReadOnlyField()
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Moderador
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'nome',
                 'telefone', 'foto_perfil', 'url_instagram', 'url_facebook',
                 'url_x', 'url_tiktok', 'is_active', 'date_joined',
                 'data_nascimento', 'genero', 'password', 'idade',
                 'data_nascimento_formatada', 'telefone_formatado',
                 'eh_rudiero', 'eh_parceiro', 'eh_moderador', 'eh_administrador']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        moderador = Moderador.objects.create_user(**validated_data)
        moderador.set_password(password)
        moderador.save()
        return moderador


class AdministradorSerializer(serializers.ModelSerializer):
    telefone_formatado = serializers.ReadOnlyField()
    eh_rudiero = serializers.ReadOnlyField()
    eh_parceiro = serializers.ReadOnlyField()
    eh_moderador = serializers.ReadOnlyField()
    eh_administrador = serializers.ReadOnlyField()
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Administrador
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'nome',
                 'telefone', 'foto_perfil', 'url_instagram', 'url_facebook',
                 'url_x', 'url_tiktok', 'is_active', 'date_joined', 'password',
                 'telefone_formatado', 'eh_rudiero', 'eh_parceiro',
                 'eh_moderador', 'eh_administrador']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        administrador = Administrador.objects.create_user(**validated_data)
        administrador.set_password(password)
        administrador.save()
        return administrador


class HorarioFuncionamentoSerializer(serializers.ModelSerializer):
    horario_abertura_formatado = serializers.ReadOnlyField()
    horario_fechamento_formatado = serializers.ReadOnlyField()
    horario_formatado = serializers.ReadOnlyField()
    servico = serializers.StringRelatedField(read_only=True)
    servico_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = HorarioFuncionamento
        fields = ['id', 'hora_abertura', 'hora_fechamento', 'dia_semana',
                 'servico', 'servico_id', 'horario_abertura_formatado',
                 'horario_fechamento_formatado', 'horario_formatado']


class ServicoSerializer(serializers.ModelSerializer):
    parceiro = ParceiroBasicoSerializer(read_only=True)
    parceiro_id = serializers.IntegerField(write_only=True)
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.IntegerField(write_only=True)
    cidade = CidadeSerializer(read_only=True)
    cidade_id = serializers.IntegerField(write_only=True)
    endereco = EnderecoSerializer(read_only=True)
    endereco_id = serializers.IntegerField(write_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    
    # Propriedades calculadas
    preco_minimo_formatado = serializers.ReadOnlyField()
    preco_maximo_formatado = serializers.ReadOnlyField()
    preco_medio = serializers.ReadOnlyField()
    preco_medio_formatado = serializers.ReadOnlyField()
    exibir_ativo = serializers.ReadOnlyField()
    data_admissao_formatada = serializers.ReadOnlyField()
    data_atualizacao_formatada = serializers.ReadOnlyField()
    
    class Meta:
        model = Servico
        fields = ['id', 'nome', 'descricao', 'capacidade_maxima', 'preco_minimo',
                 'preco_maximo', 'ativo', 'foto_capa', 'data_admissao',
                 'data_atualizacao', 'parceiro', 'parceiro_id', 'categoria',
                 'categoria_id', 'cidade', 'cidade_id', 'endereco', 'endereco_id',
                 'tags', 'tag_ids', 'preco_minimo_formatado', 'preco_maximo_formatado',
                 'preco_medio', 'preco_medio_formatado', 'exibir_ativo',
                 'data_admissao_formatada', 'data_atualizacao_formatada']
    
    def create(self, validated_data):
        tag_ids = validated_data.pop('tag_ids', [])
        servico = Servico.objects.create(**validated_data)
        if tag_ids:
            servico.tags.set(tag_ids)
        return servico
    
    def update(self, instance, validated_data):
        tag_ids = validated_data.pop('tag_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if tag_ids is not None:
            instance.tags.set(tag_ids)
        return instance


class RoteiroSerializer(serializers.ModelSerializer):
    rudiero = RudieroBasicoSerializer(read_only=True)
    rudiero_id = serializers.IntegerField(write_only=True)
    cidade_destino = CidadeSerializer(read_only=True)
    cidade_destino_id = serializers.IntegerField(write_only=True)
    servicos = ServicoSerializer(many=True, read_only=True)
    servico_ids = serializers.ListField(
        child=serializers.IntegerField(), write_only=True, required=False
    )
    
    # Propriedades calculadas
    data_partida_formatada = serializers.ReadOnlyField()
    data_retorno_formatada = serializers.ReadOnlyField()
    orcamento_total_formatado = serializers.ReadOnlyField()
    data_criacao_formatada = serializers.ReadOnlyField()
    
    class Meta:
        model = Roteiro
        fields = ['id', 'nome', 'descricao', 'data_partida', 'data_retorno',
                 'orcamento_total', 'viajantes', 'visibilidade', 'data_criacao',
                 'rudiero', 'rudiero_id', 'cidade_destino', 'cidade_destino_id',
                 'servicos', 'servico_ids', 'data_partida_formatada',
                 'data_retorno_formatada', 'orcamento_total_formatado',
                 'data_criacao_formatada']
    
    def create(self, validated_data):
        servico_ids = validated_data.pop('servico_ids', [])
        roteiro = Roteiro.objects.create(**validated_data)
        if servico_ids:
            roteiro.servicos.set(servico_ids)
        return roteiro
    
    def update(self, instance, validated_data):
        servico_ids = validated_data.pop('servico_ids', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if servico_ids is not None:
            instance.servicos.set(servico_ids)
        return instance


class ImagemCidadeSerializer(serializers.ModelSerializer):
    cidade = CidadeSerializer(read_only=True)
    cidade_id = serializers.IntegerField(write_only=True)
    data_inclusao_formatada = serializers.ReadOnlyField()
    
    class Meta:
        model = ImagemCidade
        fields = ['id', 'caminho_imagem', 'data_inclusao', 'cidade', 'cidade_id',
                 'data_inclusao_formatada']


class ImagemServicoSerializer(serializers.ModelSerializer):
    servico = serializers.StringRelatedField(read_only=True)
    servico_id = serializers.IntegerField(write_only=True)
    data_inclusao_formatada = serializers.ReadOnlyField()
    
    class Meta:
        model = ImagemServico
        fields = ['id', 'caminho_imagem', 'data_inclusao', 'servico', 'servico_id',
                 'data_inclusao_formatada']


class AnalisePropostaParceriaSerializer(serializers.ModelSerializer):
    parceiro = ParceiroBasicoSerializer(read_only=True)
    parceiro_id = serializers.IntegerField(write_only=True)
    data_analise_formatada = serializers.ReadOnlyField()
    
    class Meta:
        model = AnalisePropostaParceria
        fields = ['id', 'observacao_analise', 'status_proposta', 'data_analise',
                 'parceiro', 'parceiro_id', 'data_analise_formatada']


class AnalisePropostaServicoSerializer(serializers.ModelSerializer):
    servico = serializers.StringRelatedField(read_only=True)
    servico_id = serializers.IntegerField(write_only=True)
    data_analise_formatada = serializers.ReadOnlyField()
    
    class Meta:
        model = AnalisePropostaServico
        fields = ['id', 'observacao_analise', 'status_proposta', 'data_analise',
                 'servico', 'servico_id', 'data_analise_formatada']