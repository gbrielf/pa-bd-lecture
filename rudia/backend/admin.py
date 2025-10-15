from django.contrib import admin
from .models import Usuario, Rudiero, Parceiro, Moderador, Administrador
from .models import Estado, Cidade, Categoria, Tag, Endereco, Servico
from .models import Roteiro, HorarioFuncionamento, ImagemCidade, ImagemServico
from .models import AnalisePropostaParceria, AnalisePropostaServico

# Registre seus modelos aqui
admin.site.register(Usuario)
admin.site.register(Rudiero)
admin.site.register(Parceiro)
admin.site.register(Moderador)
admin.site.register(Administrador)
admin.site.register(Estado)
admin.site.register(Cidade)
admin.site.register(Categoria)
admin.site.register(Tag)
admin.site.register(Endereco)
admin.site.register(Servico)
admin.site.register(Roteiro)
admin.site.register(HorarioFuncionamento)
admin.site.register(ImagemCidade)
admin.site.register(ImagemServico)
admin.site.register(AnalisePropostaParceria)
admin.site.register(AnalisePropostaServico)