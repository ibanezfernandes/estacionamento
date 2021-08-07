const db = require("../../database/models");
const Op = db.Sequelize.Op;

const registrarCurriculo = async (req, res) => {
  //validação se já existe um curriculo cadastrado para o id do usuário logado.
  try{
    const curriculoCadastrado = await db.Curriculo.findOne({
      where: { usuarioId: req.userId },
      include: [
        {
          model: db.Usuario,
          as: "autor",
        }
      ]
    })
    if(curriculoCadastrado){
      return res.status(400).send({ message: "Curriculo já cadastrado, dog" });
    }
  }catch(err) {
    return res.status(500).json({ error: error.message });
  };

  try{
      const curriculo = await db.Curriculo.create({
        apresentacao: req.body.apresentacao,
        estado_civil: req.body.estado_civil,
        nacionalidade: req.body.nacionalidade,
        cidade: req.body.cidade,
        estado: req.body.estado,
        usuarioId: req.userId,
        formacoes: req.body.formacoes,
        experiencias: req.body.experiencias
      }, {
        include: [
          {
            model: db.FormacoesAcademicas,
            as: 'formacoes'
          }, 
          {
            model: db.ExperienciasProfissionais,
            as: 'experiencias'
          }
        ]
      })
      .then( (createdCurriculo) => res.status(201).send(createdCurriculo))
      .catch((err) => res.status(400).send(err));
  }catch (error){
      return res.status(500).json({ error: error });
  }
};

const getMeuCurriculo = async (req, res) => {
  try {
    const curriculo = await db.Curriculo.findOne({
      where: { usuarioId: req.userId },
      include: [
        {
          model: db.Usuario,
          as: "autor",
        },
        {
          model: db.ExperienciasProfissionais,
          as: 'experiencias'
        },
        {
          model: db.FormacoesAcademicas,
          as: 'formacoes'
        }
      ]
    });
    if (curriculo) {
      return res.status(200).json({ curriculo });
    }
    return res.status(404).send("Curriculo não existe");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getCurriculoPeloUserId = async (req, res) => {
    try {
      const { curriculoId } = req.params;
      const curriculo = await db.Curriculo.findOne({
        where: { id: curriculoId },
        include: [
          {
            model: db.Usuario,
            as: "autor",
          }
        ]
      });
      if (curriculo) {
        return res.status(200).json({ curriculo });
      }
      return res.status(404).send("Curriculo não existe");
    } catch (error) {
      return res.status(500).send(error.message);
    }
};

const updateCurriculoBase = async (req, res) => {
    try {
      const { curriculoId } = req.params;
      const [updated] = await db.Curriculo.update(req.body, {
        where: { id: curriculoId },
        include: [{ model: db.FormacoesAcademicas, as: 'formacoes'}, { model: db.ExperienciasProfissionais, as: 'experiencias'}]
      });
      if (updated) {
        const updatedCurriculo = await db.Curriculo.findOne({ where: { id: curriculoId } });
        return res.status(200).json({ Curriculo: updatedCurriculo });
      }
      throw new Error("Curriculo não encontrado");
    } catch (error) {
        return res.status(500).send(error.message);
    }
  };
  
  const updateCurriculoCompleto = async (req, res) => {
    const { curriculoId } = req.params;
    return db.Curriculo.findByPk(curriculoId, {
      include: [
        {
          model:db.FormacoesAcademicas,
          as: 'formacoes'
        },
        {
          model:db.ExperienciasProfissionais,
          as: 'experiencias'
        }
      ],
    })
    .then(curriculoCompleto => {
      if(!curriculoCompleto){
        return res.status(404).send({
          message: 'Curriculo não encontrado'
        });
      }
      return curriculoCompleto.update({
        apresentacao: req.body.apresentacao || curriculoCompleto.apresentacao,
        estado_civil: req.body.estado_civil || curriculoCompleto.estado_civil,
        nacionalidade: req.body.nacionalidade || curriculoCompleto.nacionalidade,
        cidade: req.body.cidade || curriculoCompleto.cidade,
        estado: req.body.estado || curriculoCompleto.estado,
        formacoes: req.body.formacoes || curriculoCompleto.formacoes,
        experiencias: req.body.experiencias || curriculoCompleto.experiencias
      }, {
        include: [
          {
            model: db.FormacoesAcademicas,
            as: 'formacoes'
          },
          {
            model: db.ExperienciasProfissionais,
            as: 'experiencias'
          }
        ]
      })
      .then( () => res.status(200).send(curriculoCompleto))
      .catch((err) => { console.log(err); res.status(400).send(err);})
    })
    .catch((err) => { console.log(err); res.status(400).send(err);});
    /*
    const curriculo = await db.Curriculo.findOne({ where: { id: curriculoId } });
    try {
      const [updated] = await curriculo.update({
        apresentacao: req.body.apresentacao || curriculo.apresentacao,
        estado_civil: req.body.estado_civil || curriculo.estado_civil,
        nacionalidade: req.body.nacionalidade || curriculo.nacionalidade,
        cidade: req.body.cidade || curriculo.cidade,
        estado: req.body.estado || curriculo.estado,
        formacoes: req.body.formacoes || curriculo.formacoes,
        experiencias: req.body.experiencias || curriculo.experiencias
      }, {
        include: [
          {
            model: db.FormacoesAcademicas,
            as: 'formacoes'
          },
          {
            model: db.ExperienciasProfissionais,
            as: 'experiencias'
          }
        ]
      });
      if (updated) {
        const updatedCurriculo = await db.Curriculo.findOne({ where: { id: curriculoId } });
        return res.status(200).json({ Curriculo: updatedCurriculo });
      }
      throw new Error("Curriculo não encontrado");
    } catch (error) {
        return res.status(500).send(error.message);
    }*/
  };

  const deleteCurriculo = async (req, res) => {
    try {
      const { curriculoId } = req.params;
      const deleted = await db.Curriculo.destroy({
        where: { id: curriculoId }
      });
      if (deleted) {
        return res.status(204).send("Curriculo deleted");
      }
      throw new Error("Curriculo not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
  };

module.exports = {
    registrarCurriculo,
    getCurriculoPeloUserId,
    getMeuCurriculo,
    updateCurriculoBase,
    updateCurriculoCompleto,
    deleteCurriculo
};