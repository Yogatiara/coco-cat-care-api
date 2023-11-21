const mysqlDatabase = require("../../configs/databaseConfig");

const findAll = () => {
  const query = `CALL penitipanManagement('SELECTALL',  ${null}, ${null}, ${null}, ${null}, ${null})`;

  return mysqlDatabase.execute(query);
};

const create = (idPelanggan, currentDate, tanggalAkhir, hargaPerHari) => {
  const query = `CALL penitipanManagement('INSERT',${null}, ${idPelanggan}, '${currentDate}', '${tanggalAkhir}', ${hargaPerHari})`;
  return mysqlDatabase.execute(query);
};

const findOne = ({ id }) => {
  const query = `CALL penitipanManagement('SELECTBYID', ${id},  ${null}, ${null}, ${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

const update = (id, nama, noTelepon) => {
  if (!noTelepon) {
    noTelepon = null;
  }

  if (!nama) {
    nama = null;
  }

  const query = `CALL pegawaiManagement('UPDATE', ${id}, ${
    nama !== null ? `'${nama}'` : null
  }, ${noTelepon !== null ? `'${noTelepon}'` : null})`;

  return mysqlDatabase.execute(query);
};

const destroy = (id) => {
  const query = `CALL pegawaiManagement('DELETE',${id}, ${null},${null})`;
  return mysqlDatabase.execute(query);
};

module.exports = {
  Care: {
    findAll,
    create,
    findOne,
    update,
    destroy,
  },
};
