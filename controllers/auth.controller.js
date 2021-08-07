const db = require("../database/models");
const config = require("../config/auth.config");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");

exports.signup = (req, res) => {

  console.log(req.body)
  //Save User to Database
  db.Usuario.create({
    nome_completo: req.body.nome_completo,
    cpf: req.body.cpf,
    email: req.body.email,
    telefone: req.body.telefone,
    usuarioAtivo: false,
    senhaTemporaria: false,
    senha: bcrypt.hashSync(req.body.senha, 8)
  })
    .then(user => {
      if (req.body.roles) {
        db.Role.findAll({
          where: {
            nome: {
              [Op.or]: req.body.roles
            }
          }
        });
      } else {
        // role = 3 === Usuario
        user.setRoles([3]).then(() => {
          res.send({ message: "User registered successfully!"});
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  db.Usuario.findOne({
    where: {
      email: req.body.email,
      usuarioAtivo: true
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.senha,
        user.senha
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].nome.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          nome_completo: user.nome_completo,
          ultimo_nome: user.ultimo_nome,
          email: user.email,
          senhaTemporaria: user.senhaTemporaria,
          telefone: user.telefone,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.validarUsuario = (req, res) => {
  db.Usuario.update(
    { usuarioAtivo: true },
    {
      where: {
        email: req.body.email,
        telefone: req.body.telefone,
        cpf: req.body.cpf
      }
    }
  ).then(user => {
    if (!user) {
      res.status(500).send({ message: "Usuario não cadastrado" });
    }
    res.status(200).send({ message: "Usuario validado com sucesso!" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.recuperarSenha = (req, res) => {
  var cpf = req.params.cpf;
  var id = crypto.randomBytes(4).toString('hex').toUpperCase();

  try{
    recuperarTel_CPF(cpf).then(usuario => {
      let dados_usuario = usuario;
      var mensagemEnviar = "Joobis - Utilize essa senha temporaria para entrar em sua conta: " + id;
    })

    res.status(200).send({ message: "Redefinição de senha concluido!" });
  }catch (err) {
    res.status(500).send({ message: "Ocorreu um problema!" });
}

}

exports.editarDadosUsuario = (req, res) => {
  console.log(req.body)
  try {
      db.Usuario.update(
        {
          senha: bcrypt.hashSync(req.body.senha, 8),
          senhaTemporaria: false,
        },
        {
          where: {
            cpf: req.body.cpf
          }
        }
      )
      res.status(200).send({ message: "Dados atualizados com sucesso!" });
  }
  catch(err){
    res.status(500).send({ message: "Ocorreu um problema!" });
  }
}

function recuperarTel_CPF(cpf) {
  return db.Usuario.findOne({
    raw: true,
    where: {
      cpf: cpf,
      usuarioAtivo: true
    }
  })
}