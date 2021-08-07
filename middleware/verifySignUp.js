const db = require("../database/models");
const ROLES = db.ROLES;
const Usuario = db.Usuario;

checkDuplicateEmailOrPhone = async (req, res, next) => {
  // check email
  Usuario.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "E-mail, Telefone ou CPF já estão cadastrados."
      });
    }

    //check Phone
    Usuario.findOne({
      where: {
        telefone: req.body.telefone
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "E-mail, Telefone ou CPF já estão cadastrados."
        });
      }

      //check CPF
      Usuario.findOne({
        where: {
          cpf: req.body.cpf
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "E-mail, Telefone ou CPF já estão cadastrados."
          });
        } else {
          next();
        }

      })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });

    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });

  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Falhou! Role não existe = " + req.body.roles[i]
        });
        return;
      }
    }
  }

  next();
};

verificarUsuario_emailCpfTelefone = (req, res, next) => {
  Usuario.findOne({
    where: {
      cpf: req.body.cpf
    }
  }).then(user => {
    if (user) {
      next();
    }

  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

}

const verifySignUp = {
  checkDuplicateEmailOrPhone: checkDuplicateEmailOrPhone,
  checkRolesExisted: checkRolesExisted,
  verificarUsuario: verificarUsuario_emailCpfTelefone,
};

module.exports = verifySignUp;