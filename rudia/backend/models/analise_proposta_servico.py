from django.db import models
from rudia.utilitarios import Utilitarios

# Importando modelos relacionados
from .servico import Servico

class AnalisePropostaServico(models.Model):
    class StatusProposta(models.TextChoices):
        EM_ANALISE = 'EA', 'Em Análise'
        APROVADA = 'AP', 'Aprovada'
        REPROVADA = 'RP', 'Reprovada'
    
    observacao_analise = models.TextField(null=True, blank=True)
    status_proposta = models.CharField(max_length=2, choices=StatusProposta.choices, default=StatusProposta.EM_ANALISE)
    data_analise = models.DateTimeField(auto_now_add=True)
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name='analises_proposta_servico')

    '''Propriedades adicionais do Modelo AnalisePropostaServico'''
    @property
    def data_analise_formatada(self) -> str:
        return Utilitarios.formatar_data_hora(self.data_analise)

    def __str__(self):
        return f"Análise da Proposta - Serviço: {self.servico.nome} - Status: {self.get_status_proposta_display()}"

    class Meta:
        db_table = 'analise_proposta_servico'
        ordering = ['status_proposta', 'data_analise']
        verbose_name = 'Análise de Proposta de Serviço'
        verbose_name_plural = 'Análises de Propostas de Serviços'