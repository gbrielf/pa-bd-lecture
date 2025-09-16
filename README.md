<div  align="center">
    <img width="400"
        alt="BD Logo"
        src="https://media.licdn.com/dms/image/v2/D4D12AQFor1IXlzvOpQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721822584091?e=2147483647&v=beta&t=UNz3RLjmgLJfVIKZe4HY6ftT_0tDIVTlE0uDc1bQaYI"
      />
    <h1> Programação e Administração de Banco de Dados </h1>
</div>

## No codespace:

Execute esses dois comandos antes de criar a base de dados no Postgres:
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start

## Objetivo

Este repositório é destinado ao aprendizado dos conceitos do Programação e Administração de Banco de Dados.

# Como executar os scripts SQL com PostgreSQL

## Passo a passo

1. Abra o terminal e acesse o PostgreSQL como superusuário:
  ```bash
  psql -U postgres
  ```

2. Crie o banco de dados:
  ```sql
  CREATE DATABASE vendas_online;
  ```

3. (Opcional) Crie um usuário e dê permissões:
  ```sql
  CREATE USER seu_usuario WITH PASSWORD 'sua_senha';
  GRANT ALL PRIVILEGES ON DATABASE vendas_online TO seu_usuario;
  ```

4. Saia do psql:
  ```sql
  \q
  ```

5. Execute o script para criar as tabelas e inserir os dados:
  ```bash
  psql -U postgres -d vendas_online < scripts/consultas_sql/ddl_dml_vendas.sql
  # Ou, se criou um usuário:
  psql -U seu_usuario -d vendas_online < scripts/consultas_sql/ddl_dml_vendas.sql
  ```

6. Execute os comandos SELECT do arquivo `select.sql`:
  ```bash
  psql -U postgres -d vendas_online -f scripts/consultas_sql/select.sql
  # Ou, se criou um usuário:
  psql -U seu_usuario -d vendas_online -f scripts/consultas_sql/select.sql
  ```

Pronto! Agora você pode consultar e manipular os dados do banco normalmente.

## Metodologia

O processo de aquisição dos conhecimentos deve ser realizado a partir do estudo de cada branch existente neste repositório.

Cada branch implementada marca um conjunto de conceitos que são aplicados em código e que vai sendo refatorado até aplicação de todo conteúdo visto na disciplina.

## Pré-Requistos 

- Conhecimento em [Programação de Computadores]()
- Conhecimento em [Banco de Dados]()

## Agenda

### 1o Bimestre

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/conteudo_entendendo_e_modelando_dados"> Conteúdo 1. Modelando Dados</a>

- Criação de um Modelo de Dados
- Criação das Tabelas


<a href="https://github.com/placidoneto/pa-bd-lecture/tree/conteudo_manipulando_dados"> Conteúdo 2. Manipulando Dados</a>

- Inserção de Dados
- Consultas SQL
  

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/conteudo_consultas_avancadas"> Conteúdo 3 Consultas Avançadas</a>

- Join
- Filtragem
- Ordenação
- Valores Distintos
- Subconsultas
  
<a href="https://github.com/placidoneto/pa-bd-lecture/tree/exercicio-consultas-avancadas"> Exercício Fixação de Conteúdo</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp-consultas-avancadas"> Trabalho Prático 1</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture01-fundamentos"> Conteúdo 4. Django Rest Frameork</a>

- Introdução ao Django Rest Framework
- Conceitos Básicos
- Exemplo simples usando Model/ORM com Postgres

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/exercicio-django-rest-introducao"> Exercício Fixação de Conteúdo (Django Rest Franmework)</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp-modelagem-django"> Trabalho Prático 2</a>


<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture-orm-model-relacionamento">Conteúdo 5. Relacionamento entre Modelos ORM em Django Rest</a>

- Relacionamento entre Modelos
- Relacionamento 1 para 1
- Relacionamento 1 para N
- Relacionamento N para N

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp-orm-model-relacionamento"> Exercício Fixação de Relacionamento entre Modelos ORM em Django Rest </a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp-relacionamento-model-20251"> Trabalho Prático 3</a>


<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture-view-functions">Conteúdo 6. Funções em Classes ViewSet do Django Rest Framework</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/autenticacao-token">Conteúdo 7. Autenticação Simples JWT Django Rest Framework</a>

  - Autenticação JWT
  - Sistema de Login e Logout

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp4-2025_1"> Trabalho Prático 4</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp5-2025_1"> Trabalho Prático 5</a>

### 2o Bimestre


<a href="https://github.com/placidoneto/pa-bd-lecture/tree/autenticacao-perfil-usuario">Conteúdo 8. Autenticação usando Perfil de Usuário</a>

  - Definindo Perfil de Usuário
  - Registro de Usuário
  - Login e Logout

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/autenticacao-perfil-usuario-especializacao">Conteúdo 9. Autenticação usando Perfil de Usuário Especializado</a>

  - Definindo Perfil de Usuário Específicos
  - Registro de Usuário
  - Login e Logout


<a href="https://github.com/placidoneto/pa-bd-lecture/tree/seminarios-2bimestre">SEMINÁRIO 2o BIMESTRE - Framework Spring Boot com Acesso a Banco</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp6-2025_1"> Trabalho Prático 6</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/filtragem-dados-django-rest">Conteúdo 10. Filtragem de Dados em Django Rest Framework</a>

  - Filtragem de Dados
  - Filtragem de Dados com Parâmetros

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/seminario-spring1">Spring Boot - Tema 1</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/seminario-spring2">Spring Boot - Tema 2</a>

<a href="https://github.com/MaVitor/Spring-Boot-Tema3">Spring Boot - Tema 3</a> 

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/seminario-spring3">TP Tema 3</a> 

<a href="https://github.com/MaVitor/seminario-spring4">Spring Boot - Tema 4</a> 

<a href="https://github.com/MaVitor/seminario-spring5">Spring Boot - Tema 5</a> 


<!--  - [Atividade sobre Autenticação](https://github.com/placidoneto/pa-bd-lecture/tree/atividade-autenticacao)-->


<!--
<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture00-modelando-dados"> Conteúdo 1. Modelando Dados</a>

- Criação de um Modelo de Dados
- Criação das Tabelas
- Inserção de Dados
- Consultas SQL
- <a href="https://github.com/placidoneto/pa-bd-lecture/blob/lecture00-modelando-dados/tp1.md"> TP1 - Trabalho Prático 1</a>

  
<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture03-consultas-avancadas">Conteúdo 2. Consultas Avançadas I</a>

- Filtragem
- Ordenação
- Valores Distintos
- Intervalos de Busca
- Consultas com `JOIN
- <a href="https://github.com/placidoneto/pa-bd-lecture/blob/lecture03-consultas-avancadas/lecture01/tp2.md"> TP2 - Trabalho Prático 2</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture01-fundamentos"> Conteúdo 3. Django Rest Frameork</a>

- Estrutura da Aplicação Web (API) com Django Rest para a aplicação de Venda de Veículos
- Exemplo simples usando Model/ORM com Postgres



<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture-orm-model-relacionamento">Conteúdo 4. Relacionamento entre Modelos ORM em Django Rest</a>

- Relacionamento entre Modelos
- Relacionamento 1 para 1
- Relacionamento 1 para N
- Relacionamento N para N

-  <a href="https://github.com/placidoneto/pa-bd-lecture/tree/tp-orm-model-relacionamento"> TP3 - Trabalho Prático 3</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/lecture-view-functions">Conteúdo 5. Funções em Classes ViewSet do Django Rest Framework</a>

- Funções de Listagem
- <a href="https://github.com/placidoneto/pa-bd-lecture/blob/lecture-view-functions/atividade-fixacao.md"> TP Substitutivo - Atividade Fixação</a>

### 2o Bimestre

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/seminario-2oBimestre">SEMINÁRIO 2o BIMESTRE - Frameworks Rest com Acesso a Banco</a>

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/autenticacao-token">Conteúdo 6. Autenticação JWT Django Rest Framework</a>

  - Autenticação JWT
  - Sistema de Login e Logout


<a href="https://github.com/placidoneto/pa-bd-lecture/tree/autenticacao-perfil-usuario">Conteúdo 7. Autenticação usando Perfil de Usuário</a>

  - Definindo Perfil de Usuário
  - Registro de Usuário
  - Login e Logout

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/autenticacao-perfil-usuario-especializacao">Conteúdo 8. Autenticação usando Perfil de Usuário Especializado</a>

  - Definindo Perfil de Usuário Específicos
  - Registro de Usuário
  - Login e Logout
  - [Atividade sobre Autenticação](https://github.com/placidoneto/pa-bd-lecture/tree/atividade-autenticacao)

<a href="https://github.com/placidoneto/pa-bd-lecture/tree/filtragem-dados-django-rest">Conteúdo 9. Filtragem de Dados em Django Rest Framework</a>

  - Filtragem de Dados
  - Filtragem de Dados com Parâmetros
  - Filtragem de Dados com Parâmetros de URL
  
  ### Seminários API Rest

  - [Seminário 1 - API Rest com Fastify](https://github.com/placidoneto/pa-bd-lecture/tree/seminario_festify)
  - [Seminário 2 - API Rest com ExpressJS](https://github.com/placidoneto/pa-bd-lecture/tree/seminario-express-js)
  - [Seminário 3 - API Rest com FastAPI](https://github.com/placidoneto/pa-bd-lecture/tree/seminario-fast-api)
  - [Seminário 4 - API Rest com Spring Boot](https://github.com/placidoneto/pa-bd-lecture/tree/seminario-spring)
  - [Seminário 5 - API Rest com Flask](https://github.com/placidoneto/pa-bd-lecture/tree/seminario-flask)
  -->

  