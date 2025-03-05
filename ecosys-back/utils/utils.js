const fs = require('fs')

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

}

module.exports.Utils = new Utils();
