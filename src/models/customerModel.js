const mysqlDatabase = require('../../configs/databaseConfig');

const findAll = () => {
  const query = `CALL pelangganManagement('SELECTALL', ${null}, ${null}, ${null}, ${null})`;
  // const query =
  //   'SELECT * FROM pelangganDanKucing';
  return mysqlDatabase.execute(query);
};

const create = (nama, noTelepon, alamat) => {
  const query = `CALL pelangganManagement('INSERT',${null}, '${nama}', '${noTelepon}', '${alamat}')`;
  return mysqlDatabase.execute(query);
};

const findOne = ({ id, noTelepon }) => {
  let query;
  if (noTelepon) {
    query = `CALL pelangganManagement('SELECTBYTELEPON', ${null}, ${null}, '${noTelepon}', ${null})`;
  } else if (id) {
    query = `CALL pelangganManagement('SELECTBYID', ${id}, ${null}, ${null}, ${null})`;
  }

  return mysqlDatabase.execute(query);
};

const update = (id, nama, noTelepon, alamat) => {
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

  if (!alamat) {
    alamat = null;
  } else if (alamat) {
    alamat = `'${alamat}'`;
  }

  const query = `CALL pelangganManagement('UPDATE', ${id}, ${nama}, ${noTelepon},  ${alamat})`;
  return mysqlDatabase.execute(query);
};

const destroy = (id) => {
  const query = `CALL pelangganManagement('DELETE',${id}, ${null},${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

module.exports = {
  Customer: {
    findAll,
    create,
    findOne,
    update,
    destroy,
  },
};
