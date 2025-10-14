from django.db import models
from rudia.utilitarios import Utilitarios

# Importando modelos relacionados
from .servico import Servico

class HorarioFuncionamento(models.Model):
    class DiaSemana(models.TextChoices):
        DOMINGO = 'DOM', 'Domingo'
        SEGUNDA = 'SEG', 'Segunda-feira'
        TERCA = 'TER', 'Terça-feira'
        QUARTA = 'QUA', 'Quarta-feira'
        QUINTA = 'QUI', 'Quinta-feira'
        SEXTA = 'SEX', 'Sexta-feira'
        SABADO = 'SAB', 'Sábado'

    hora_abertura = models.TimeField()
    hora_fechamento = models.TimeField()
    dia_semana = models.CharField(max_length=3, choices=DiaSemana.choices)
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name='horarios_funcionamento')

    '''Propriedades adicionais do Modelo HorarioFuncionamento'''
    @property
    def horario_abertura_formatado(self) -> str:
        return Utilitarios.formatar_hora(self.hora_abertura, '%H:%M')
    
    @property
    def horario_fechamento_formatado(self) -> str:
        return Utilitarios.formatar_hora(self.hora_fechamento, '%H:%M')

    @property
    def horario_formatado(self) -> str:
        return f'{self.horario_abertura_formatado()} às {self.horario_fechamento_formatado()}'

    def __str__(self) -> str:
        return f'Horário de {self.servico.nome} - {self.dia_semana}: {self.hora_abertura} às {self.hora_fechamento}'
    
    class Meta:
        db_table = 'horario_funcionamento'
        ordering = ['servico__nome', 'dia_semana']
        verbose_name = 'Horário de Funcionamento'
        verbose_name_plural = 'Horários de Funcionamento'