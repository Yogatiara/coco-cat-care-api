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

const update = (id, tanggalAkhir, hargaPerHari) => {
  if (!tanggalAkhir) {
    tanggalAkhir = null;
  } else if (tanggalAkhir) {
    tanggalAkhir = `'${tanggalAkhir}'`;
  }

  console.log(hargaPerHari);

  const query = `CALL penitipanManagement('UPDATE', ${id}, ${null}, ${null},${tanggalAkhir}, ${hargaPerHari})`;

  return mysqlDatabase.execute(query);
};

const destroy = (id) => {
  const query = `CALL penitipanManagement('DELETE',${id}, ${null},${null}, ${null}, ${null})`;
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
