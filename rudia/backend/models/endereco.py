from django.db import models

class Endereco(models.Model):
    cep = models.CharField(max_length=8)
    logradouro = models.CharField(max_length=255)
    numero = models.CharField(max_length=10)
    complemento = models.CharField(max_length=255, blank=True, null=True)

    '''Propriedades adicionais do Modelo Endereco'''
    @property
    def cep_formatado(self) -> str:
        return f'{self.cep[:5]}-{self.cep[5:]}'
    
    @property
    def endereco_formatado(self) -> str:
        if self.complemento:
            return f'{self.logradouro}, {self.numero} - {self.complemento}'
        return f'{self.logradouro}, {self.numero}'

    def __str__(self) -> str:
        return f'{self.logradouro}, {self.numero} - {self.bairro}, {self.cidade} - {self.estado}, {self.cep}'
    
    class Meta:
        db_table = 'endereco'
        ordering = ['logradouro', 'numero']
        verbose_name = 'Endereço'
        verbose_name_plural = 'Endereços'
        constraints = [
            models.UniqueConstraint(fields=['logradouro', 'numero'], 
            name='endereco_unico_logradouro_numero')
        ]