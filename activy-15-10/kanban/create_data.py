import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kanban.settings')

import django
django.setup()

from core.models import Usuario, Projeto, Coluna

# Criar usuário se não existir
if not Usuario.objects.filter(id=1).exists():
    user = Usuario.objects.create_user(
        username='admin', 
        email='admin@kanban.com', 
        password='admin123', 
        first_name='Admin', 
        last_name='User'
    )
    print(f'Usuário criado: {user.username}')
else:
    print('Usuário já existe')

# Criar projeto se não existir  
if not Projeto.objects.filter(id=1).exists():
    user = Usuario.objects.get(id=1)
    projeto = Projeto.objects.create(
        nome='Projeto Kanban', 
        descricao='Projeto principal do Kanban', 
        proprietario=user
    )
    print(f'Projeto criado: {projeto.nome}')
else:
    print('Projeto já existe')

# Criar colunas se não existirem
projeto = Projeto.objects.get(id=1)
colunas_data = [
    {'titulo': 'A Fazer', 'ordem': 1},
    {'titulo': 'Em Progresso', 'ordem': 2},
    {'titulo': 'Concluído', 'ordem': 3}
]

for dados in colunas_data:
    if not Coluna.objects.filter(projeto=projeto, ordem=dados['ordem']).exists():
        coluna = Coluna.objects.create(
            titulo=dados['titulo'], 
            ordem=dados['ordem'], 
            projeto=projeto
        )
        print(f'Coluna criada: {coluna.titulo}')
    else:
        print(f'Coluna {dados["titulo"]} já existe')

print('Verificação concluída!')