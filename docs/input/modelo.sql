CREATE TABLE tb_produto(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    descricao VARCHAR(250),
    preco_venda DECIMAL,
    qtd_estoque INT
);

CREATE TABLE tb_fornecedor(
    id SERIAL PRIMARY KEY,
    cnpj VARCHAR(14),
    razao_social VARCHAR(100),
    nome_empresarial VARCHAR(100)
);

CREATE TABLE tb_endereco(
    id SERIAL PRIMARY KEY,
    logradouro VARCHAR(100),
    numero VARCHAR(50),
    complemento VARCHAR(10),
    cep VARCHAR(9),
    bairro VARCHAR(100),
    cidade VARCHAR(32),
    estado VARCHAR(18),
    fk_fornecedor INT,
    FOREIGN KEY (fk_fornecedor) REFERENCES tb_fornecedor(id) ON DELETE CASCADE
);

CREATE TABLE tb_contato(
    id SERIAL PRIMARY KEY,
    tipo CHAR,
    valor VARCHAR(50),
    fk_fornecedor INT,
    FOREIGN KEY (fk_fornecedor) REFERENCES tb_fornecedor(id) ON DELETE CASCADE
);

CREATE TABLE tb_entrada(
    id SERIAL PRIMARY KEY,
    dt_hr_entrada TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    nu_nota_fiscal VARCHAR(50),
    fk_fornecedor INT,
    FOREIGN KEY (fk_fornecedor) REFERENCES tb_fornecedor(id) ON DELETE CASCADE
);

CREATE TABLE tb_item_entrada(
    id SERIAL PRIMARY KEY,
    fk_produto INT, --Incluir NOT NULL
    fk_entrada INT, --Incluir NOT NULL
    quantidade INT,
    preco_compra DECIMAL,
    FOREIGN KEY (fk_produto) REFERENCES tb_produto(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_entrada) REFERENCES tb_entrada(id) ON DELETE CASCADE
);

CREATE TABLE tb_venda(
    id SERIAL PRIMARY KEY,
    dt_hr_venda TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    forma_pagamento VARCHAR(2)
);
CREATE TABLE tb_item_venda(
    id SERIAL PRIMARY KEY,
    fk_produto INT, --Incluir NOT NULL
    fk_venda INT, --Incluir NOT NULL
    quantidade INT,
    preco_unitario DECIMAL,
    FOREIGN KEY (fk_produto) REFERENCES tb_produto(id) ON DELETE CASCADE,
    FOREIGN KEY (fk_venda) REFERENCES tb_venda(id) ON DELETE CASCADE
);

-- Views
-- View para produtos com estoque baixo
CREATE VIEW vw_estoque_baixo AS
	SELECT nome, qtd_estoque FROM tb_produto WHERE qtd_estoque < 50 ORDER BY qtd_estoque DESC;

-- View para produtos vendidos no dia
CREATE VIEW vw_produtos_vendidos_dia AS
	SELECT 
			p.nome,
			SUM(iv.quantidade) as total_vendido,
			SUM(iv.quantidade*iv.preco_unitario) as valor_total_vendido
		FROM tb_venda as v 
		INNER JOIN 
		tb_item_venda as iv
		ON 
		iv.fk_venda = v.id
		INNER JOIN tb_produto as p
		ON
		p.id = iv.fk_produto
		where DATE(v.dt_hr_venda) = CURRENT_DATE GROUP BY p.id ORDER BY total_vendido desc;

-- View para contar as vendas do dia
CREATE VIEW vw_conta_vendas_dia AS
	SELECT COUNT(v.id) as vendas_dia FROM tb_venda as v where DATE(v.dt_hr_venda) = CURRENT_DATE;
  
-- View para somar o vendido do dia
CREATE VIEW vw_soma_valor_vendas_dia AS
	SELECT SUM(p.valor_total_vendido) as valor_total_vendido from vw_produtos_vendidos_dia as p;

--- View para retornar o proximo id disponivel em tbproduto
CREATE VIEW vw_proximo_id_produto AS
    SELECT MAX(id) + 1 FROM tb_produto;

INSERT INTO tb_produto (nome, descricao, preco_venda, qtd_estoque) VALUES 
  
INSERT INTO tb_fornecedor (cnpj, razao_social, nome_empresarial) VALUES
  
INSERT INTO tb_endereco (logradouro, numero, complemento, cep, bairro, cidade, estado, fk_fornecedor) VALUES

INSERT INTO tb_contato (tipo, valor, fk_fornecedor) VALUES
  
INSERT INTO tb_entrada (dt_hr_entrada, nu_nota_fiscal, fk_fornecedor) VALUES

INSERT INTO tb_item_entrada (fk_produto, fk_entrada, quantidade, preco_compra) VALUES

INSERT INTO tb_venda (dt_hr_venda,forma_pagamento) VALUES

INSERT INTO tb_item_venda (fk_produto, fk_venda, quantidade, preco_unitario) VALUES