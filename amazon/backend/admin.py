from django.contrib import admin
from .models import Cliente, Livro, Autor, Emprestimo, Reserva, Multa, Categoria
# Register your models here.

# no admin agora poderá ser feito um registro de cliente
admin.site.register(Cliente)
admin.site.register(Livro)
admin.site.register(Autor)
admin.site.register(Emprestimo)
admin.site.register(Reserva)
admin.site.register(Multa)
admin.site.register(Categoria)