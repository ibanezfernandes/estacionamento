  const db = require("../database/models");
  
  exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo Público.");
  };
    
  exports.userBoard = (req, res) => {
    res.status(200).send("Conteúdo do Usuário");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo do Admin ");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Conteúdo do Moderador");
  };

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await db.Usuario.findAll({
        include: [
          {
            model: db.Curriculo,
            as: 'meu_curriculo'
          }
        ]
      });
      return res.status(200).json({ users })
    }catch(err) {
      return res.status(500).send(err.message);
    };
  };