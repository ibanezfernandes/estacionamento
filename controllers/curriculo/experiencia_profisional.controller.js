const db = require("../../database/models");

const registrarExperienciasProfissionais = async (req, res) => {
    const idCurriculo = await db.Curriculo.findOne({ where: {usuarioId: req.userId} });
    try{
      const experienciaCadastrada = await db.ExperienciasProfissionais.findOne({
        where: 
        { 
          curriculoId: idCurriculo.id,
          empresa: req.body.empresa,
          cargo: req.body.cargo
        }
      });
      if(experienciaCadastrada){
        return res.status(400).send({ message: "Experiencia já cadastrada, dog" });
      }
    }catch(err) {
      return res.status(500).json({ message: err.message });
    };
    const dataInicio = new Date(req.body.data_inicio);
    const dataTermino = new Date(req.body.data_termino);
    try{
        const experienciaProfissional = await db.ExperienciasProfissionais.create({
            empresa: req.body.empresa,
            data_inicio: dataInicio,
            data_termino: dataTermino,
            trabalho_atual: req.body.trabalho_atual,
            cargo: req.body.cargo,
            curriculoId: req.body.curriculoId
        })

        return res.status(201).send({
            message:"Experiência Profissional Registrada!"
        })
    }catch (error){
        return res.status(500).json({ error: error.message });
    }
};

const getMinhasExperiencias = async (req, res) => {
  const idCurriculo = await db.Curriculo.findOne({ where: {usuarioId: req.userId} });
  try {
    const experienciasProfissionais = await db.ExperienciasProfissionais.findAll({
      where: { curriculoId: idCurriculo.id },
    });
    if (experienciasProfissionais) {
      return res.status(200).json({ experienciasProfissionais });
    }
    return res.status(404).send("Você não possui experiências profissional registradas");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const updateExperienciaProfissional = async (req, res) => {
  try {
    const { idExperiencia } = req.params;
    const [updated] = await db.ExperienciasProfissionais.update(req.body, {
      where: { id: idExperiencia }
    });
    if (updated) {
      const updatedExperiencia = await db.ExperienciasProfissionais.findOne({ where: { id: idExperiencia } });
      return res.status(200).json({ ExperienciaProfissional: updatedExperiencia });
    }
    throw new Error("Experiencia Profissional não encontrada");
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

const deleteExperienciaProfissional = async (req, res) => {
  try {
    const { idExperiencia } = req.params;
    const deleted = await db.ExperienciasProfissionais.destroy({
      where: { id: idExperiencia }
    });
    if (deleted) {
      return res.status(204).send("Experiencia Profissional deletada.");
    }
    throw new Error("Experiencia Profissional não encontrada.");
  } catch (error) {
      return res.status(500).send(error.message);
  }
};

module.exports = {
    registrarExperienciasProfissionais,
    getMinhasExperiencias,
    updateExperienciaProfissional,
    deleteExperienciaProfissional
};