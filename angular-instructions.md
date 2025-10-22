// ...existing code...
# Passo a passo para criar projeto Angular e configurá-lo

1. Navegue até o diretório onde deseja criar o projeto.

2. Instale o gerenciador de pacotes pnpm (globalmente):
```bash
npm install -g pnpm@latest-10
```

3. Reinicie sua IDE.

4. Instale o Angular CLI (globalmente):
```bash
pnpm install -g @angular/cli
```

5. Crie o novo projeto Angular:
```bash
ng new <nome-do-projeto>
```

6. Após escolher as opções de configuração, você deverá ver mensagens semelhantes a:
- ✔ Packages installed successfully.
- Successfully initialized git.

7. Entre no diretório do projeto:
```bash
cd <nome-do-projeto>
```

8. Inicialize o projeto:
```bash
pnpm start
```

Observações rápidas:
- Substitua `<nome-do-projeto>` pelo nome desejado.
- Se houver problemas de permissões no Linux, avalie usar `sudo` apenas quando necessário.
- Ajuste as versões dos comandos se você usar outra versão do pnpm/npm.

9. Instale o prime ng:

```pnpm add primeng @primeuix/themes```