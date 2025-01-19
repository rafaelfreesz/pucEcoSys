import { Entrada } from "./entrada.model";
import { Produto } from "./produto.model";

export class ItemEntrada{
    id?: number = -1;
    quantidade: number = -1;
    preco_compra: number = -1;
    produto: Produto | null = null;
    fk_entrada: number = -1;
    in_excluir = false;
    valor_total_item = (): number => {return this.preco_compra*this.quantidade}
    
}

// CREATE TABLE tb_item_entrada(
//     id SERIAL PRIMARY KEY,
//     fk_produto INT, --Incluir NOT NULL
//     fk_entrada INT, --Incluir NOT NULL
//     quantidade INT,
//     preco_compra DECIMAL,
//     FOREIGN KEY (fk_produto) REFERENCES tb_produto(id) ON DELETE CASCADE,
//     FOREIGN KEY (fk_entrada) REFERENCES tb_entrada(id) ON DELETE CASCADE
// );