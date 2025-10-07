#primeiro passo para usar o django rest framework
from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    telefone = models.CharField(max_length=15)
    data_cadastro = models.DateTimeField(auto_now_add=True)    

    def __str__(self):
        return self.nome


class Livro(models.Model):
    titulo = models.CharField(max_length=250)
    autor =  models.ForeignKey('Autor', on_delete=models.CASCADE)
    ano_de_publicacao = models.DateField(blank=True, null=True)
    genero = models.ForeignKey('Categoria', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.titulo} - {self.autor} - {self.ano_de_publicacao}"
    

class Autor(models.Model):
    nome = models.CharField(max_length=250)
    data_de_nascimento = models.DateField(blank=True, null=True)
    nacionalidade = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nome} - {self.nacionalidade}"
    

class Emprestimo(models.Model):
    livro_id = models.ForeignKey('Livro', on_delete=models.CASCADE)
    cliente_id = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    data_emprestimo = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.livro_id} - {self.cliente_id} - {self.data_emprestimo}"
    

class Reserva(models.Model):
    livro_id = models.ForeignKey('Livro', on_delete=models.CASCADE)
    cliente_id = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    data_reserva = models.DateTimeField()

    def __str__(self):
        return f"{self.livro_id} - {self.cliente_id} - {self.data_reserva}"


class Multa(models.Model):
    cliente_id = models.ForeignKey('Cliente', on_delete=models.CASCADE)
    valor_multa = models.DecimalField(max_digits=6, decimal_places=2)
    data_pagamento = models.DateField()

    def __str__(self):
        return f"{self.cliente_id} - {self.valor_multa} - {self.data_pagamento}"

        
class Categoria(models.Model):
    nome_da_categoria = models.CharField(max_length=250)
    descricao = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.nome_da_categoria} - {self.descricao}"


class Editora(models.Model):
    nome_da_editora = models.CharField(max_length=250)
    endereco = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.nome_da_editora} - {self.endereco}"