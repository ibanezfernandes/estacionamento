const db = require("../../database/models");

const registrarFormacoesAcademicas = async (req, res) => {
    const idCurriculo = await db.Curriculo.findOne({ where: {usuarioId: req.userId} });
    try{
      const formacaoCadastrada = await db.FormacoesAcademicas.findOne({
        where: 
        { 
          curriculoId: idCurriculo.id,
          curso: req.body.curso,
          instituicao: req.body.instituicao
        }
      });
      if(formacaoCadastrada){
        return res.status(400).send({ message: "Formação já cadastrada, dog" });
      }
    }catch(err) {
      return res.status(500).json({ message: err.message });
    };

    const dataInicio = new Date(req.body.data_inicio);
    const dataConclusao = new Date(req.body.data_conclusao);
    try{
        const formacao = await db.FormacoesAcademicas.create({
          instituicao: req.body.instituicao,
          curso: req.body.curso,
          data_inicio: dataInicio,
          data_conclusao: dataConclusao,
          curriculoId: req.body.curriculoId
        })
  
        return res.status(201).send({
            message:"Formação Acadêmica Registrada!"
        })
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
};

const getMinhasFormacoes = async (req, res) => {
  const idCurriculo = await db.Curriculo.findOne({ where: {usuarioId: req.userId} });
  try {
    const formacoes = await db.FormacoesAcademicas.findAll({
      where: { curriculoId: idCurriculo.id },
    });
    if (formacoes) {
      return res.status(200).json({ formacoes });
    }
    return res.status(404).send("Não possui formações registradas");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateFormacao = async (req, res) => {
  try {
    const idCurriculo = await db.Curriculo.findOne({ where: {usuarioId: req.userId} });
    const { idFormacao } = req.params;
    const [updated] = await db.FormacoesAcademicas.update(req.body, {
      where: 
      { 
        id: idFormacao,
        curriculoId: idCurriculo.id
      }
    });
    if (updated) {
      const updatedFormacao = await db.FormacoesAcademicas.findOne({ where: 
        { 
          id: idFormacao,
          curriculoId: idCurriculo.id
        } 
      });
      return res.status(200).json({ Formacao: updatedFormacao });
    }
    throw new Error("Formacao não encontrada");
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

const deleteFormacao = async (req, res) => {
  try {
    const idCurriculo = await db.Curriculo.findOne({ where: {usuarioId: req.userId} });
    const { idFormacao } = req.params;
    const deleted = await db.Curriculo.destroy({
      where: { id: idFormacao, curriculoId: idCurriculo }
    });
    if (deleted) {
      return res.status(204).send("Formação deleted");
    }
    throw new Error("Formação not found");
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

module.exports = {
    registrarFormacoesAcademicas,
    getMinhasFormacoes,
    updateFormacao,
    deleteFormacao
};