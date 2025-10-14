from django.db import models
from rudia.utilitarios import Utilitarios

# Importando modelos relacionados
from .usuario import Usuario

class Rudiero(Usuario):
    class Genero(models.TextChoices):
        MASCULINO = 'M', 'Masculino'
        FEMININO = 'F', 'Feminino'
        OUTRO = 'O', 'Outro'
        PREFIRO_NAO_INFORMAR = 'N', 'Prefiro Não Informar'

    data_nascimento = models.DateField()
    genero = models.CharField(max_length=1, choices=Genero.choices, default=Genero.PREFIRO_NAO_INFORMAR)

    '''Propriedades adicionais do Modelo Rudiero'''
    @property
    def idade(self) -> int:
        return Utilitarios.calcular_idade(self.data_nascimento)
    
    @property
    def data_nascimento_formatada(self) -> str:
        return Utilitarios.formatar_data(self.data_nascimento)

    def __str__(self) -> str:
        return f'Rudiero: @{self.username}'

    class Meta:
        db_table = 'rudiero'
        ordering = ['username']
        verbose_name = 'Rudiero'
        verbose_name_plural = 'Rudieros'