from django.db import models
from rudia.utilitarios import Utilitarios

# Importando modelos relacionados
from .usuario import Usuario

class Parceiro(Usuario):
    cnpj = models.CharField(max_length=14, unique=True)
    ativo = models.BooleanField(default=False)
    data_admissao = models.DateTimeField(blank=True, null=True)

    '''Propriedades adicionais do Modelo Parceiro'''
    @property
    def cnpj_formatado(self) -> str:
        cnpj = self.cnpj
        return f"{cnpj[:2]}.{cnpj[2:5]}.{cnpj[5:8]}/{cnpj[8:12]}-{cnpj[12:]}"

    @property
    def exibir_ativo(self) -> str:
        return "SIM" if self.ativo else "NÃO"
    
    @property
    def data_admissao_formatada(self) -> str:
        if self.data_admissao:
            return Utilitarios.formatar_data_hora(self.data_admissao)
        return "N/A"

    def __str__(self) -> str:
        return f"Parceiro: @{self.username} - Ativo: {self.exibir_ativo}"
    
    class Meta:
        db_table = 'parceiro'
        ordering = ['username']
        verbose_name = 'Parceiro'
        verbose_name_plural = 'Parceiros'