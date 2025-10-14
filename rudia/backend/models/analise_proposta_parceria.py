from django.db import models
from rudia.utilitarios import Utilitarios

# Importando modelos relacionados
from .parceiro import Parceiro

class AnalisePropostaParceria(models.Model):
    class StatusProposta(models.TextChoices):
        EM_ANALISE = 'EA', 'Em Análise'
        APROVADA = 'AP', 'Aprovada'
        REPROVADA = 'RP', 'Reprovada'

    observacao_analise = models.TextField(blank=True, null=True)
    status_proposta = models.CharField(max_length=2, choices=StatusProposta.choices, default=StatusProposta.EM_ANALISE)
    data_analise = models.DateTimeField(auto_now_add=True)
    parceiro = models.ForeignKey(Parceiro, on_delete=models.CASCADE, related_name='analises_proposta_parceria')

    '''Propriedades adicionais do Modelo AnalisePropostaParceria'''
    @property
    def data_analise_formatada(self) -> str:
        return Utilitarios.formatar_data_hora(self.data_analise)

    def __str__(self) -> str:
        return f"Análise da Proposta - Parceiro: {self.parceiro.username} - Status: {self.get_status_proposta_display()}"

    class Meta:
        db_table = 'analise_proposta_parceria'
        ordering = ['status_proposta', 'data_analise']
        verbose_name = 'Análise de Proposta de Parceria'
        verbose_name_plural = 'Análises de Propostas de Parceria'