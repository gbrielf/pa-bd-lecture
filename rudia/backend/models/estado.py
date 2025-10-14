from django.db import models

class Estado(models.Model):
    nome = models.CharField(max_length=50, unique=True)
    sigla = models.CharField(max_length=2, unique=True)

    '''Propriedades adicionais do Modelo Estado'''
    @property
    def estado_formatado(self) -> str:
        return f'{self.nome} ({self.sigla})'

    def __str__(self) -> str:
        return self.estado_formatado
    
    class Meta:
        db_table = 'estado'
        ordering = ['nome']
        verbose_name = 'Estado'
        verbose_name_plural = 'Estados'