from django.db import models
from django.contrib.auth.models import AbstractUser


class Usuario(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    telefone = models.CharField(max_length=15, blank=True, null=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='core_usuario_set', # <-- Nome exclusivo
        blank=True,
        help_text=('The groups this user belongs to. A user will get all '
                   'permissions granted to each of their groups.'),
        related_query_name='usuario',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='core_usuario_permissions',  # <-- Nome exclusivo
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='usuario',
    )
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name']

    def __str__(self):
        return f"{self.username}"


class Perfil(models.Model):
    TIPO_PERFIL_CHOICES = [
        ('ADMINISTRADOR', 'Administrador'),
        ('GERENTE', 'Gerente'),
        ('DESENVOLVEDOR', 'Desenvolvedor'),
        ('STAKEHOLDER', 'Stakeholder'),
        ('TESTER', 'Tester'),
    ]

    usuario = models.OneToOneField(
        Usuario, 
        on_delete=models.CASCADE, 
        related_name='perfil'
    )
    tipo = models.CharField(
        max_length=20, 
        choices=TIPO_PERFIL_CHOICES
    )
    telefone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return f"{self.usuario.username} - {self.get_tipo_display()}"


class Etiqueta(models.Model):
    nome = models.CharField(max_length=50)
    cor = models.CharField(max_length=7)  # Exemplo: #RRGGBB

    def __str__(self):
        return f"{self.nome}"


# Create your models here.
class Projeto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    proprietario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    membros = models.ManyToManyField(Usuario, related_name='membros_projetos', blank=True)
    
    def __str__(self):
        return f"{self.nome}"


class Coluna(models.Model):
    titulo = models.CharField(max_length=100)
    ordem = models.IntegerField()  # para ordenação
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='colunas')

    def __str__(self):
        return f"{self.titulo}"
    

class Tarefa(models.Model):
    titulo = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    coluna = models.ForeignKey(Coluna, on_delete=models.CASCADE, related_name='tarefas')
    responsavel = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True)
    criador = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='tarefas_criadas')
    prioridade = models.CharField(max_length=20, choices=[('Baixa', 'baixa'), ('Média', 'média'), ('Alta', 'alta')], default='Média')
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_conclusao = models.DateTimeField(blank=True, null=True)
    tags = models.ManyToManyField(Etiqueta, blank=True)

    def __str__(self):
        return f"{self.titulo}"


class Comentario(models.Model):
    tarefa = models.ForeignKey(Tarefa, on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    texto = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentario de {self.autor} em {self.tarefa}"