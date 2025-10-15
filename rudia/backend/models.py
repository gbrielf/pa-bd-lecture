# Importando todos os modelos para facilitar o uso nos serializers e views
from .models.usuario import Usuario
from .models.rudiero import Rudiero
from .models.parceiro import Parceiro
from .models.moderador import Moderador
from .models.admnistrador import Administrador
from .models.estado import Estado
from .models.cidade import Cidade
from .models.categoria import Categoria
from .models.tag import Tag
from .models.endereco import Endereco
from .models.servico import Servico
from .models.roteiro import Roteiro
from .models.horario_funcionamento import HorarioFuncionamento
from .models.imagem_cidade import ImagemCidade
from .models.imagem_servico import ImagemServico
from .models.analise_proposta_parceria import AnalisePropostaParceria
from .models.analise_proposta_servico import AnalisePropostaServico

# Lista de todos os modelos para facilitar importações
__all__ = [
    'Usuario', 'Rudiero', 'Parceiro', 'Moderador', 'Administrador',
    'Estado', 'Cidade', 'Categoria', 'Tag', 'Endereco', 'Servico',
    'Roteiro', 'HorarioFuncionamento', 'ImagemCidade', 'ImagemServico',
    'AnalisePropostaParceria', 'AnalisePropostaServico'
]