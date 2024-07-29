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
    fk_fornecedor INT,
    FOREIGN KEY (fk_fornecedor) REFERENCES tb_fornecedor(id) ON DELETE CASCADE
);

CREATE TABLE tb_contato(
    id SERIAL PRIMARY KEY,
    tipo CHAR,
    valor VARCHAR(50),
    fk_fornecedor INT,
    FOREIGN KEY (fk_fornecedor) REFERENCES tb_fornecedor(id)
);

CREATE TABLE tb_entrada(
    id SERIAL PRIMARY KEY,
    dt_hr_entrada DATE NOT NULL DEFAULT CURRENT_DATE,
    nu_nota_fiscal VARCHAR(50),
    fk_fornecedor INT,
    FOREIGN KEY (fk_fornecedor) REFERENCES tb_fornecedor(id)
);

CREATE TABLE tb_item_entrada(
    fk_produto INT,
    fk_entrada INT,
    FOREIGN KEY (fk_produto) REFERENCES tb_produto(id),
    FOREIGN KEY (fk_entrada) REFERENCES tb_entrada(id)
);

CREATE TABLE tb_venda(
    id SERIAL PRIMARY KEY,
    dt_hr_venda DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE tb_item_venda(
    fk_produto INT,
    fk_venda INT,
    FOREIGN KEY (fk_produto) REFERENCES tb_produto(id),
    FOREIGN KEY (fk_venda) REFERENCES tb_venda(id)
);

INSERT INTO tb_produto (nome, descricao, preco_venda, qtd_estoque)
VALUES
  ('Lápis Preto HB', 'Lápis preto de madeira com grafite HB para escrita em papel.', 1.50, 100),
  ('Caneta Esferográfica Azul', 'Caneta esferográfica com tinta azul para escrita em geral.', 2.00, 80),
  ('Borracha Branca', 'Borracha branca macia para apagar marcas de lápis em papel.', 3.00, 50),
  ('Caderno Universitário Brochura 100 Folhas', 'Caderno universitário brochura com 100 folhas pautadas para anotações.', 9.90, 30),
  ('Canetas Coloridas', 'Kit com 12 canetas coloridas para desenhos e anotações.', 12.00, 25),
  ('Marca-texto Amarelo', 'Marca-texto amarelo fluorescente para destacar informações importantes.', 2.50, 40),
  ('Post-it Bloco 100 Folhas', 'Bloco de notas adesivas Post-it com 100 folhas em cores variadas.', 5.00, 60),
  ('Pasta Suspensa com Elástico', 'Pasta suspensa com elástico para arquivar documentos.', 6.00, 15),
  ('Grampeador de Mesa', 'Grampeador de mesa para grampear folhas de papel.', 15.00, 10),
  ('Calculadora', 'Calculadora eletrônica básica para cálculos matemáticos.', 20.00, 8);


INSERT INTO tb_fornecedor (cnpj, razao_social, nome_empresarial)
VALUES
  ('12345678000112', 'Material Escolar Ltda', 'Papelaria Legal'),
  ('54789123000145', 'Comércio de Artigos para Escritório Ltda', 'Casa do Escritório');

INSERT INTO tb_endereco (logradouro, numero, complemento, fk_fornecedor)
VALUES
  ('Rua da Penha, 100', 20, NULL, 1),
  ('Avenida Brasil, 500', 300, 'Sala 2', 2);

INSERT INTO tb_contato (tipo, valor, fk_fornecedor)
VALUES
  ('F', '(32) 3333-4444', 1),
  ('E', '[endereço de e-mail removido]', 1),
  ('F', '(32) 98877-6543', 2),
  ('E', '[endereço de e-mail removido]', 2);

INSERT INTO tb_entrada (dt_hr_entrada, nu_nota_fiscal, fk_fornecedor)
VALUES
  ('2024-07-08', '123456', 1),
  ('2024-07-08', '654321', 2);

INSERT INTO tb_item_entrada (fk_produto, fk_entrada)
VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (4, 2);


-- FOREIGN KEY (cod_produto) REFERENCES produtos(cod_produtos)