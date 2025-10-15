from django.db import models
from decimal import Decimal
from rudia.utilitarios import Utilitarios

# Importando modelos relacionados
from .parceiro import Parceiro
from .categoria import Categoria
from .tag import Tag
from .cidade import Cidade
from .endereco import Endereco

class Servico(models.Model):
    nome = models.CharField(max_length=255)
    descricao = models.TextField()
    capacidade_maxima = models.PositiveIntegerField(blank=True, null=True)
    preco_minimo = models.DecimalField(max_digits=10, decimal_places=2)
    preco_maximo = models.DecimalField(max_digits=10, decimal_places=2)
    ativo = models.BooleanField(default=False)
    foto_capa = models.ImageField(upload_to='fotos_servico/')
    data_admissao = models.DateTimeField(blank=True, null=True)
    data_atualizacao = models.DateTimeField(auto_now=True)
    parceiro = models.ForeignKey(Parceiro, on_delete=models.CASCADE, related_name='servicos')
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='servicos')
    cidade = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name='servicos')
    endereco = models.OneToOneField(Endereco, on_delete=models.CASCADE, related_name='servico')
    tags = models.ManyToManyField(Tag, related_name='servicos')

    '''Propriedades adicionais do Modelo Servico'''
    @property
    def preco_minimo_formatado(self) -> str:
        return Utilitarios.formata_moeda(self.preco_minimo)
    
    @property
    def preco_maximo_formatado(self) -> str:
        return Utilitarios.formata_moeda(self.preco_maximo)
    
    @property
    def preco_medio(self) -> Decimal:
        return (self.preco_minimo + self.preco_maximo) / 2
    
    @property
    def preco_medio_formatado(self) -> str:
        return Utilitarios.formata_moeda(self.preco_medio)
    
    @property
    def exibir_ativo(self) -> str:
        return "SIM" if self.ativo else "NÃO"
    
    @property
    def data_admissao_formatada(self) -> str:
        if self.data_admissao:
            return Utilitarios.formata_data_hora(self.data_admissao)
        return "N/A"
    
    @property
    def data_atualizacao_formatada(self) -> str:
        return Utilitarios.formata_data_hora(self.data_atualizacao)

    def __str__(self) -> str:
        return f'{self.nome} - @{self.parceiro.username}'
    
    class Meta:
        db_table = 'servico'
        ordering = ['nome']
        verbose_name = 'Serviço'
        verbose_name_plural = 'Serviços'
        constraints = [
            models.UniqueConstraint(
                fields=['nome', 'parceiro'],
                name='servico_unico_nome_parceiro'
            )
        ]