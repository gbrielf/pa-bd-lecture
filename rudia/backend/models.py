from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class Usuario(User):
    nome = models.CharField(max_length=250)
    telefone = models.CharField(max_length=15)
    # foto_perfil = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True) PREICSA INSTALAR O PILLOW

    def __str__(self):
        return f'${self.username} - ${self.nome} - ${self.telefone}'

class Rudiero(models.Model):
    data_nascimento = models.DateField(blank=True, null=True)
    genero = models.CharField(max_length=10, blank=True, null=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='rudiero')

    def __str__(self):
        return f'${self.usuario} - ${self.nome}'

class Parceiro(models.Model):
    STATUS_CHOICES = [
        ('Em Análise', 'Em Análise'),
        ('Aprovado', 'Aprovado'),
        ('Rejeitado', 'Rejeitado'),
    ]
    
    status_parceria = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Em Análise')
    observacao_status_parceria = models.TextField(blank=True, null=True)
    cidade = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name='parceiros')
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='parceiro')
        
    def __str__(self):
        return f'${self.usuario} - ${self.nome}'