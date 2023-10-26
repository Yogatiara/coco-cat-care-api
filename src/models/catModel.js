const mysqlDatabase = require('../../configs/databaseConfig');

const findAll = () => {
  const query = `CALL kucingManagement('SELECTALL', ${null}, ${null}, ${null}, ${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

const create = (
  nama,
  ras,
  umur,
  jenisKelamin
) => {
  const query = `CALL kucingManagement('INSERT',${null},'${namaKucing}', '${umur}', '${ras}', '${jenisKelamin}')`;
  return mysqlDatabase.execute(query);
};

const findOne = ({
  nama,
  id,
  umur,
  ras,
  jenisKelamin,
  moreThanUmur,
  lessThanUmur,
}) => {
  let query;
  if (jenisKelamin && umur) {
    query = `CALL kucingManagement('SELECTBYJENISKELAMINANDUMUR', ${null}, ${null}, ${null}, '${umur}','${jenisKelamin}')`;
  } else if (jenisKelamin && moreThanUmur) {
    query = `CALL kucingManagement('SELECTBYJENISKELAMINANDUMUR(moreThan)', ${null}, ${null}, ${null}, '${moreThanUmur}','${jenisKelamin}')`;
  } else if (jenisKelamin && lessThanUmur) {
    query = `CALL kucingManagement('SELECTBYJENISKELAMINANDUMUR(lessThan)', ${null}, ${null}, ${null}, '${lessThanUmur}','${jenisKelamin}')`;
  } else if (id) {
    query = `CALL kucingManagement('SELECTBYID', ${id}, ${null}, ${null}, ${null}, ${null})`;
  } else if (ras) {
    query = `CALL kucingManagement('SELECTBYRAS', ${null}, ${null}, '${ras}', ${null}, ${null})`;
  } else if (umur) {
    query = `CALL kucingManagement('SELECTBYUMUR', ${null}, ${null}, ${null}, '${umur}', ${null})`;
  } else if (jenisKelamin) {
    query = `CALL kucingManagement('SELECTBYJENISKELAMIN', ${null}, ${null}, ${null}, ${null},'${jenisKelamin}')`;
  } else if (nama) {
    query = `CALL kucingManagement('SELECTBYNAMA', ${null}, '${nama}', ${null}, ${null},${null})`;
  }

  return mysqlDatabase.execute(query);
};

const update = (
  id,
  nama,
  ras,
  umur,
  jenisKelamin
) => {
  if (!nama) {
    nama = null;
  } else if (nama) {
    nama = `'${nama}'`;
  }

  if (!umur) {
    umur = null;
  } else if (umur) {
    umur = `'${umur}'`;
  }

  if (!ras) {
    ras = null;
  } else if (ras) {
    ras = `'${ras}'`;
  }

  if (!jenisKelamin) {
    jenisKelamin = null;
  } else if (jenisKelamin) {
    jenisKelamin = `'${jenisKelamin}'`;
  }

  const query = `CALL kucingManagement('UPDATE', ${id}, ${nama}, ${ras},  ${umur}, ${jenisKelamin})`;
  return mysqlDatabase.execute(query);
};

const destroy = (id) => {
  const query = `CALL kucingManagement('DELETE',${id}, ${null},${null}, ${null}, ${null})`;
  return mysqlDatabase.execute(query);
};

module.exports = {
  Cat: {
    findAll,
    create,
    findOne,
    update,
    destroy,
  },
};
