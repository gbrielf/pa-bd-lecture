-- A ordem básica é:

-- 1FROM (de onde vêm os dados)
-- 2JOIN (junta tabelas)
-- 3WHERE (filtra os dados)
-- 4GROUP BY (agrupa os dados, se necessário)
-- 5HAVING (filtra grupos, se necessário)
-- 6ORDER BY (ordena o resultado)
-- 7LIMIT (limita o número de resultados)

-- 1. Listagem de Usuários Ativos
-- Escreva uma consulta que exiba o ID, nome, email e telefone de todos os usuários que estão ativos no sistema.

SELECT id_usuario, nome, email, telefone FROM usuario;

-- 2. Catálogo de Produtos por Categoria
-- Crie uma consulta que mostre todos os produtos da categoria 'Informática', exibindo nome, preço e quantidade em estoque. Ordene por preço crescente.

SELECT nome, preco, quantidade_estoque FROM produto WHERE categoria = 'Informática' ORDER BY preco;

-- 3. Contagem de Pedidos por Status
-- Desenvolva uma consulta que conte quantos pedidos existem para cada status diferente.

-- SELECT COUNT(*) AS quantidade_de_pedidos FROM pedidos WHERE status = 'pendente';
-- SELECT COUNT(*) AS quantidade_de_pedidos FROM pedidos WHERE status = 'confirmado';
-- SELECT COUNT(*) AS quantidade_de_pedidos FROM pedidos WHERE status = 'processando';
-- SELECT COUNT(*) AS quantidade_de_pedidos FROM pedidos WHERE status = 'enviado';
-- SELECT COUNT(*) AS quantidade_de_pedidos FROM pedidos WHERE status = 'entregue';
-- SELECT COUNT(*) AS quantidade_de_pedidos FROM pedidos WHERE status = 'cancelado'
-- as linhas de código acima podem ser substituidas pela consulta a baixo;

SELECT status, COUNT(*) AS quantidade_de_pedidos
FROM pedidos
GROUP BY status;

-- 4. Alerta de Estoque Baixo
-- Faça uma consulta que identifique produtos com quantidade em estoque menor que 30 unidades. Mostre nome do produto, quantidade atual e categoria.

SELECT nome, quantidade_estoque, categoria FROM produto WHERE quantidade_estoque < 30;

-- 5. Histórico de Pedidos Recentes
-- Escreva uma consulta que liste todos os pedidos realizados nos últimos 60 dias, mostrando ID do pedido, data, valor total e status.

SELECT id_pedido, data_pedido,valor_total, status FROM pedido WHERE data_pedido BETWEEN CURRENT_DATE - INTERVAL '60 days' AND CURRENT_DATE;

-- 6. Produtos Mais Caros por Categoria
-- Crie uma consulta que mostre o produto mais caro de cada categoria, exibindo categoria, nome do produto e preço.

SELECT p.categoria, p.nome, p.preco FROM produto p
JOIN( SELECT categoria, MAX(preco) AS max_preco FROM produto GROUP BY categoria)

-- 7. Clientes com Dados de Contato Incompletos
-- Desenvolva uma consulta para identificar usuários ativos que não possuem telefone cadastrado.

SELECT p.nome FROM usuario p WHERE p.telefoen is NULL;

-- 8. Pedidos Pendentes de Entrega
-- Faça uma consulta que liste todos os pedidos com status 'enviado', mostrando dados do cliente e endereço de entrega.

SELECT
  p.id_pedido,
  u.nome AS nome_cliente,
  u.email,
  p.endereco_entrega
FROM pedido p
JOIN usuario u ON p.id_usuario = u.id_usuario -- Significa: “Junte a tabela de pedidos (p) com a tabela de usuários (u), onde o id_usuario do pedido é igual ao id_usuario do usuário”.
WHERE p.status = 'enviado';

-- 9. Detalhamento Completo de Pedidos
-- Crie uma consulta que mostre, para um pedido específico (ID = 1), todas as informações: dados do cliente, produtos comprados, quantidades, preços unitários e subtotais.

SELECT p.*, u.*
FROM pedido p
JOIN usuario u ON p.id_usuario = u.id_usuario
WHERE p.id_pedido = 1;

-- 10. Ranking dos Produtos Mais Vendidos
-- Desenvolva uma consulta que liste os produtos ordenados pela quantidade total vendida (soma de todas as vendas). Mostre nome, categoria e total vendido.

SELECT produto.nome,
       produto.categoria,
       SUM(item_pedido.quantidade) AS total_vendido
FROM item_pedido
JOIN produto ON item_pedido.id_produto = produto.id_produto
GROUP BY produto.id_produto, produto.nome, produto.categoria
ORDER BY total_vendido DESC;

-- 11. Análise de Clientes Sem Compras
-- Escreva uma consulta que identifique todos os usuários ativos que nunca fizeram um pedido no sistema.

-- INNER JOIN: A ∩ B (só o que tem nos dois)
-- LEFT JOIN:  A + (A ∩ B) (todos da esquerda + correspondências)
-- RIGHT JOIN: (A ∩ B) + B (correspondências + todos da direita)
-- FULL JOIN:  A ∪ B (todos de ambos)

SELECT u.nome FROM usuario u
LEFT JOIN pedido p ON u.id_usuario = p.id_usuario
WHERE u.ativo = TRUE AND p.id_usuario IS NULL;

-- 12. Estatísticas de Compras por Cliente
-- Crie uma consulta que calcule, para cada cliente que já fez pedidos: número total de pedidos, valor médio por pedido e valor total gasto.

SELECT u.nome,
       COUNT(pedido.id_usuario) AS total_pedidos,
       AVG(pedido.valor_total) as media_por_pedido,
       SUM(pedido.valor_total) as soma_total 
FROM usuario u
JOIN pedido ON pedido.id_usuario = u.id_usuario
GROUP BY u.id_usuario, u.nome
ORDER BY u.nome;

-- 13. Relatório Mensal de Vendas
-- Desenvolva uma consulta que agrupe as vendas por mês/ano, mostrando: período, quantidade de pedidos, número de produtos diferentes vendidos e faturamento total.



-- 14. Produtos que Nunca Foram Vendidos
-- Faça uma consulta que identifique produtos ativos que nunca foram incluídos em nenhum pedido.

SELECT p.nome, p.categoria, p.preco from produto p
LEFT JOIN  item_pedido ON item_pedido.id_produto = p.id_produto
WHERE p.ativo IS TRUE AND item_pedido.id_pedido IS NULL
ORDER BY p.categoria, p.nome;


-- 15. Análise de Ticket Médio por Categoria
-- Crie uma consulta que calcule o ticket médio (valor médio de venda) para cada categoria de produto, considerando apenas pedidos não cancelados.

SELECT produto.categoria,
       COUNT(*) AS total_de_vendas,
       AVG(ip.subtotal) AS ticket_medio
FROM item_pedido ip
JOIN produto p ON ip.id_produto = produto.id_produto
JOIN pedido pd ON ip.id_pedido = pd.id_pedido
WHERE pd.status != 'cancelado'
GROUP BY p.categoria
ORDER BY p.categoria;
       

