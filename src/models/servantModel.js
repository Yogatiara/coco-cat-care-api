const mysqlDatabase = require('../../configs/databaseConfig');

const findAll = () => {
  const query = `CALL pegawaiManagement('SELECTALL', ${null}, ${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

const create = (nama, noTelepon) => {
  const query = `CALL pegawaiManagement('INSERT',${null}, '${nama}', '${noTelepon}')`;
  return mysqlDatabase.execute(query);
};

const findOne = ({
  idPegawai,
  noTeleponPegawai,
}) => {
  let query;
  if (noTeleponPegawai) {
    query = `CALL pegawaiManagement('SELECTBYTELEPON', ${null}, ${null}, '${noTeleponPegawai}')`;
  } else if (idPegawai) {
    query = `CALL pegawaiManagement('SELECTBYID', ${idPegawai}, '${null}', '${null}')`;
  }

  return mysqlDatabase.execute(query);
};

const update = (id, noTelepon) => {
  const query = `CALL pegawaiManagement('UPDATE', ${id}, ${null}, '${noTelepon}')`;
  return mysqlDatabase.execute(query);
};

module.exports = {
  Servant: {
    findAll,
    create,
    findOne,
  },
};
