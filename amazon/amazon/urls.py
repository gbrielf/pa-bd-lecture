# quarto passo para usar o django rest framework
from django.contrib import admin
from django.urls import path, include #precisa importar o include 2
from rest_framework.routers import DefaultRouter
from backend import views # precisa importar a view 1

router = DefaultRouter() #rota padrao do rest framework
router.register(r'clientes', views.ClienteViewSet) #registra a viewset (rota personalizada) criada na view 3
router.register(r'livros', views.LivroViewSet)
router.register(r'autores', views.AutorViewSet)
router.register(r'emprestimos', views.EmprestimoViewSet)
router.register(r'reservas', views.ReservaViewSet)
router.register(r'multas', views.MultaViewSet)
router.register(r'categorias', views.CategoriaViewSet)
router.register(r'editoras', views.EditoraViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # IP:8000/api/clientes/ -> acessa a viewset ClienteViewSet
]