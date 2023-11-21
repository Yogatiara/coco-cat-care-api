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
  const query = noTelepon
    ? `CALL pegawaiManagement('SELECTBYTELEPON', null, null, '${noTelepon}')`
    : id
    ? `CALL pegawaiManagement('SELECTBYID', ${id}, null, null)`
    : '';

  return mysqlDatabase.execute(query);
};


const update = (id, nama, noTelepon) => {
  if (!noTelepon) {
    noTelepon = null;
  }

  if (!nama) {
    nama = null;
  }

  const query = `CALL pegawaiManagement('UPDATE', ${id}, ${nama !== null ? `'${nama}'` : null}, ${noTelepon !== null ? `'${noTelepon}'` : null})`;

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
