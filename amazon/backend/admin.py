from django.contrib import admin
from .models import Cliente
# Register your models here.

# no admin agora poderá ser feito um registro de cliente
admin.site.register(Cliente)