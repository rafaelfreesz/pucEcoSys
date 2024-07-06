CREATE TABLE tb_produtos(
    id serial,
    nome character varying(100),
    descricao character varying(250),
    preco_venda decimal,
    qtd_estoque int
)

CREATE TABLE tb_endereco(
    id serial,
    logradouro character varying(100),
    numero character varying(50),
    complemento character varying(5)
)