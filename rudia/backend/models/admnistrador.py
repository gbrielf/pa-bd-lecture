from django.db import models

# Importando modelos relacionados
from .usuario import Usuario

class Administrador(Usuario):
    def __str__(self) -> str:
        return f'Administrador: @{self.username}'
    
    class Meta:
        db_table = 'administrador'
        ordering = ['username']
        verbose_name = 'Administrador'
        verbose_name_plural = 'Administradores'