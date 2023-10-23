const mysqlDatabase = require('../../configs/databaseConfig');

const findAll = () => {
  const query = `CALL pegawaiManagement('SELECTALL', ${null}, ${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

const create = (nama, noTelepon) => {
  const query = `CALL pegawaiManagement('INSERT',${null}, '${nama}', '${noTelepon}')`;
  return mysqlDatabase.execute(query);
};

const findOne = ({ id, noTelepon }) => {
  let query;
  if (noTelepon) {
    query = `CALL pegawaiManagement('SELECTBYTELEPON', ${null}, ${null}, '${noTelepon}')`;
  } else if (id) {
    query = `CALL pegawaiManagement('SELECTBYID', ${id}, ${null}, ${null})`;
  }

  return mysqlDatabase.execute(query);
};

const update = (id, nama, noTelepon) => {
  if (!noTelepon) {
    noTelepon = null;
  } else if (noTelepon) {
    noTelepon = `'${noTelepon}'`;
  }

  if (!nama) {
    nama = null;
  } else if (nama) {
    nama = `'${nama}'`;
  }

  const query = `CALL pegawaiManagement('UPDATE', ${id}, ${nama}, ${noTelepon})`;
  return mysqlDatabase.execute(query);
};

const destroy = (id) => {
  const query = `CALL pegawaiManagement('DELETE',${id}, ${null},${null})`;
  return mysqlDatabase.execute(query);
};

module.exports = {
  Servant: {
    findAll,
    create,
    findOne,
    update,
    destroy,
  },
};
