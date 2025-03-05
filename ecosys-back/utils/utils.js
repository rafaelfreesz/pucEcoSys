const fs = require('fs')
const { exec } = require('child_process')

class Utils {

  salvarImagem(imagemBase64, id) {
    const imagemBuffer = Buffer.from(imagemBase64, "base64");
    fs.writeFileSync(
      `uploads/img_produtos/img-prod-${id}.jpg`,
      imagemBuffer,
      (erro) => {
        if (erro) {
          console.error("Erro ao salvar imagem:", erro);
        }
      }
    );

  }
  serializarImagem(produto){
    if(fs.existsSync(`uploads/img_produtos/img-prod-${produto.id}.jpg`)){
      const arquivo = fs.readFileSync(`uploads/img_produtos/img-prod-${produto.id}.jpg`);
      const arquivoBase64 = arquivo.toString('base64');
      produto.imagem = arquivoBase64;
    }
  }

  async excluirImagem(idProduto){
    
    if(fs.existsSync(`uploads/img_produtos/img-prod-${idProduto}.jpg`)){
      await exec(`rm uploads/img_produtos/img-prod-${idProduto}.jpg`) //TODO verificar porque as vezes alguns arquivos nao sao excluidos
    }else{
      console.log("Arquivo nao existe")
    }
  }

}

module.exports.Utils = new Utils();
