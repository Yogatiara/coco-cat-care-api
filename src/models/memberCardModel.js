const mysqlDatabase = require('../../configs/databaseConfig');

const findAll = () => {
  const query = `CALL kartuMemberManagement('SELECTALL', ${null}, ${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

const create = (jenis, diskon) => {
  const query = `CALL kartuMemberManagement('INSERT',${null}, '${jenis}', ${diskon})`;
  return mysqlDatabase.execute(query);
};

const findOne = ({ id, diskon }) => {
  let query;
  if (diskon) {
    query = `CALL kartuMemberManagement('SELECTBYDISKON', ${null}, ${null}, ${diskon})`;
  } else if (id) {
    query = `CALL kartuMemberManagement('SELECTBYID', ${id}, ${null}, ${null})`;
  }

  return mysqlDatabase.execute(query);
};

const update = (id, jenis, diskon) => {
  if (!jenis) {
    jenis = null;
  } else if (jenis) {
    jenis = `'${jenis}'`;
  }

  if (!diskon) {
    diskon = null;
  } else if (diskon) {
    diskon = `'${diskon}'`;
  }

  const query = `CALL kartuMemberManagement('UPDATE', ${id}, ${jenis}, ${diskon})`;
  return mysqlDatabase.execute(query);
};

const destroy = (id) => {
  const query = `CALL kartuMemberManagement('DELETE',${id}, ${null},${null})`;
  return mysqlDatabase.execute(query);
};

module.exports = {
  memberCard: {
    findAll,
    create,
    findOne,
    update,
    destroy,
  },
};
