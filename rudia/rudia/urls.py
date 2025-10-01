# quarto passo para usar o django rest framework
from django.contrib import admin
from django.urls import path, include #precisa importar o include 2
from rest_framework.routers import DefaultRouter
from backend import views # precisa importar a view 1

router = DefaultRouter() #rota padrao do rest framework
router.register(r'usuarios', views.UsuarioViewSet) #registra a viewset (rota personalizada) criada na view 3
router.register(r'rudieros', views.RudieroViewSet) #registra a viewset (rota personalizada) criada na view 3
router.register(r'parceiros', views.ParceiroViewSet) #registra a viewset (rota personalizada) criada na view 3

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # IP:8000/api/clientes/ -> acessa a viewset ClienteViewSet
]