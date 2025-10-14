from django.db import models
from rudia.utilitarios import Utilitarios

# Importando modelos relacionados
from .rudiero import Rudiero
from .cidade import Cidade
from .servico import Servico

class Roteiro(models.Model):
    class Visibilidade(models.TextChoices):
        PUBLICO = 'PUBLICO', 'Público'
        PRIVADO = 'PRIVADO', 'Privado'
        RESTRITO = 'RESTRITO', 'Restrito'

    nome = models.CharField(max_length=150)
    descricao = models.TextField()
    data_partida = models.DateField()
    data_retorno = models.DateField()
    orcamento_total = models.DecimalField(max_digits=10, decimal_places=2)
    viajantes = models.PositiveIntegerField(default=1)
    visibilidade = models.CharField(max_length=10, choices=Visibilidade.choices, default=Visibilidade.PRIVADO)
    data_criacao = models.DateTimeField(auto_now_add=True)
    rudiero = models.ForeignKey(Rudiero, on_delete=models.CASCADE, related_name='roteiros')
    cidade_destino = models.OneToOneField(Cidade, on_delete=models.CASCADE, related_name='roteiro_destino')
    servicos = models.ManyToManyField(Servico, related_name='roteiros')

    '''Propriedades adicionais do Modelo Roteiro'''
    @property
    def data_partida_formatada(self):
        return Utilitarios.formatar_data(self.data_partida)
    
    @property
    def data_retorno_formatada(self):
        return Utilitarios.formatar_data(self.data_retorno)
    
    @property
    def orcamento_total_formatado(self):
        return Utilitarios.formatar_moeda(self.orcamento_total)
    
    @property
    def data_criacao_formatada(self):
        return Utilitarios.formatar_data_hora(self.data_criacao)
    
    def __str__(self):
        return '{self.nome} - @{self.rudiero.username}'
    
    class Meta:
        db_table = 'roteiro'
        ordering = ['-data_criacao']
        verbose_name = 'Roteiro'
        verbose_name_plural = 'Roteiros'