from django.db import models
from django.contrib.auth.models import User

class Etiqueta(models.Model):
    nome = models.CharField(max_length=50)
    cor = models.CharField(max_length=7)  # Exemplo: #RRGGBB

    def __str__(self):
        return self.nome

class Usuario(User):
    
    def __str__(self):
        return f"{self.username} - {self.email}"

# Create your models here.
class Projeto(models.Model):
    nome = models.CharField(max_length=100)
    descricao = models.TextField(blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    proprietario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    membros = models.ManyToManyField(Usuario, related_name='membros_projetos', blank=True)
    
    def __str__(self):
        return self.nome

class Coluna(models.Model):
    titulo = models.CharField(max_length=100)
    ordem = models.IntegerField() # para ordenação
    projeto = models.ForeignKey(Projeto, on_delete=models.CASCADE, related_name='colunas')

    def __str__(self):
        return self.titulo
    
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
        return self.titulo
    
class Comentario(models.Model):
    tarefa = models.ForeignKey(Tarefa, on_delete=models.CASCADE, related_name='comentarios')
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    texto = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentario de {self.autor} em {self.tarefa}"

