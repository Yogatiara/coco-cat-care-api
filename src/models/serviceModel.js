const mysqlDatabase = require("../../configs/databaseConfig");

const findAll = () => {
  const query = `CALL pelayananManagement('SELECTALL', ${null}, ${null}, ${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

const create = (idPenitipan, idKucing, idPegawai) => {
  const query = `CALL pelayananManagement('INSERT',${null},${idPenitipan},${idKucing},${idPegawai})`;
  return mysqlDatabase.execute(query);
};

const findOne = ({ id }) => {
  query = `CALL pelayananManagement('SELECTBYID', ${id}, ${null}, ${null}, ${null})`;

  return mysqlDatabase.execute(query);
};

const update = (id, idPenitipan, idKucing, idPegawai) => {
  if (!idPenitipan) {
    idPenitipan = null;
  } else if (idPenitipan) {
    idPenitipan = idPenitipan;
  }

  if (!idKucing) {
    idKucing = null;
  } else if (idKucing) {
    idKucing = idKucing;
  }

  if (!idPegawai) {
    idPegawai = null;
  } else if (idPegawai) {
    idPegawai = idPegawai;
  }

  const query = `CALL pelayananManagement('UPDATE', ${id}, ${idPenitipan} ,${idKucing}, ${idPegawai})`;
  return mysqlDatabase.execute(query);
};

const destroy = (id) => {
  const query = `CALL pelayananManagement('DELETE',${id},${null}, ${null},${null})`;
  return mysqlDatabase.execute(query);
};

module.exports = {
  Service: {
    findAll,
    create,
    findOne,
    update,
    destroy,
  },
};
