const db = require("../database/models");
const Usuario = db.Usuario;

cpfVinculadoConta = async (req, res, next) => {
    // Validar se o CPF possui correspondencia em algum usuário.
    Usuario.findOne({
        where: {
            cpf: req.params.cpf
        }
    }).then(user => {
        if (!user) {
            res.status(500).send({ message: "CPF desconhecido" });
        } else {
            next();
        }

    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

const verificar_recuperarSenha = {
    verificar_cpfVinculadoConta: cpfVinculadoConta,
};

module.exports = verificar_recuperarSenha;