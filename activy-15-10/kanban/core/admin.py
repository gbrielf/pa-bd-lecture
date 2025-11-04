from django.contrib import admin
from .models import Usuario, Projeto, Coluna, Tarefa, Comentario, Etiqueta

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Projeto)
admin.site.register(Coluna)
admin.site.register(Tarefa)
admin.site.register(Comentario)
admin.site.register(Etiqueta)