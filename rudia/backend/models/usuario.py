from django.contrib.auth.models import AbstractUser
from django.db import models

class Usuario(AbstractUser):
    nome = models.CharField(max_length=255)
    telefone = models.CharField(max_length=15, blank=True, null=True, unique=True)
    foto_perfil = models.ImageField(upload_to='fotos_perfil/', blank=True, null=True)
    url_instagram = models.URLField(blank=True, null=True, unique=True)
    url_facebook = models.URLField(blank=True, null=True, unique=True)
    url_x = models.URLField(blank=True, null=True, unique=True)
    url_tiktok = models.URLField(blank=True, null=True, unique=True)

    # Sobrescrevendo os campos ManyToMany do AbstractUser para adicionar related_name
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='usuario_set',
        related_query_name='usuario'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='usuario_set',
        related_query_name='usuario'
    )

    '''Propriedades adicionais do Modelo Usuario'''
    @property
    def eh_rudiero(self) -> bool:
        return hasattr(self, 'rudiero')
    
    @property
    def eh_parceiro(self) -> bool:
        return hasattr(self, 'parceiro')
    
    @property
    def eh_moderador(self) -> bool:
        return hasattr(self, 'moderador')
    
    @property
    def eh_administrador(self) -> bool:
        return hasattr(self, 'administrador')

    @property
    def telefone_formatado(self) -> str:
        telefone = self.telefone

        if telefone:
            codigo_pais = f"+{telefone[:2]}"
            telefone = telefone[2:]

            if len(telefone) == 10:     # Telefone Fixo
                return f"{codigo_pais} ({telefone[:2]}) {telefone[2:6]}-{telefone[6:]}"
            elif len(telefone) == 11:   # Telefone Celular
                return f"{codigo_pais} ({telefone[:2]}) {telefone[2:7]}-{telefone[7:]}"
        
        return "Sem telefone vinculado"

    def __str__(self) -> str:
        return '@{self.username}'
    
    class Meta:
        db_table = 'usuario'
        ordering = ['username']
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
       