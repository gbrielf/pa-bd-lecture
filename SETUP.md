# Como iniciar o projeto Kanban

## Pré-requisitos
- Python 3.13+ instalado
- Git instalado

## Passos para configurar o ambiente

1. **Ativar o ambiente virtual:**
   ```powershell
   cd C:\Users\gabri\Documents\Gabriel\TADS\RIA\pa-bd-lecture
   .\.venv\Scripts\Activate.ps1
   ```

2. **Instalar as dependências:**
   ```powershell
   pip install -r requirements.txt
   ```

3. **Navegar para o diretório do projeto Django:**
   ```powershell
   cd activy-15-10\kanban
   ```

4. **Aplicar as migrações (primeira vez ou quando houver novas):**
   ```powershell
   python manage.py migrate
   ```

5. **Carregar dados iniciais (se necessário):**
   ```powershell
   python manage.py loaddata core/fixtures/seed_data.json
   ```

6. **Iniciar o servidor de desenvolvimento:**
   ```powershell
   python manage.py runserver
   ```

O servidor estará disponível em: http://127.0.0.1:8000/

## Frontend (se necessário)

### Angular (kanban-front)
```powershell
cd ..\kanban-front
npm install
npm start
```

### Next.js (kanban-next)
```powershell
cd ..\kanban-next
npm install
npm run dev
```

## Comandos úteis

- **Criar superusuário:** `python manage.py createsuperuser`
- **Fazer backup do banco:** `python manage.py dumpdata > backup.json`
- **Criar novas migrações:** `python manage.py makemigrations`
- **Ver rotas da API:** `python manage.py show_urls` (se instalado django-extensions)

## Troubleshooting

Se houver erro de "module not found":
1. Verifique se o venv está ativado (deve aparecer (.venv) no prompt)
2. Reinstale as dependências: `pip install -r requirements.txt`
3. Verifique se está no diretório correto do projeto