const { Router } = require('express');
const {FornecedorController} = require('../controller/fornecedor.controller');
const router = Router();



router.get('/', FornecedorController.consultarTodos);
router.get('/:id', FornecedorController.consultarPorId);
router.post('/', FornecedorController.incluir)
router.put('/:id', FornecedorController.alterar);
router.delete('/:id',FornecedorController.excluirPorId)

//TODO refatorar Funções auxiliares
// const preencherEnderecos = async (fornecedores) => {

//     for await (const fornecedor of fornecedores){
//         fornecedor['endereco'] = (await pool.query('SELECT * FROM tb_endereco WHERE fk_fornecedor = $1',[fornecedor.id])).rows[0]; 
//     }

// }

// const cadastrarEndereco = async (endereco, idFornecedor) => {
//     await pool.query(
//         `INSERT INTO
//         tb_endereco(logradouro, numero, complemento, fk_fornecedor)
//         VALUES ($1,$2,$3,$4)`,
//         [endereco.logradouro, endereco.numero, endereco.complemento, idFornecedor]
//     )
// }

module.exports=router;