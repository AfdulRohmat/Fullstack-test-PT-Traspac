const columns = [
  {
    name: "No",
    selector: (row: any, index: any) => index + 1,
    sortable: true,
  },
  {
    name: "NIP",
    selector: (row: any) => row.nip,
    sortable: true,
  },
  {
    name: "Nama",
    selector: (row: any) => row.fullname,
    sortable: true,
  },
  {
    name: "Tempat Lahir",
    selector: (row: any) => row.tempat_lahir,
    sortable: true,
  },
  {
    name: "Alamat",
    selector: (row: any) => row.alamat,
    sortable: true,
  },
  {
    name: "Tanggal Lahir",
    selector: (row: any) => row.tanggal_lahir,
    sortable: true,
  },
  {
    name: "L/P",
    selector: (row: any) => row.jenis_kelamin,
    sortable: true,
  },
  {
    name: "Gol",
    selector: (row: any) => row.group.name,
    sortable: true,
  },
  {
    name: "Eselon",
    selector: (row: any) => row.echelon.name,
    sortable: true,
  },
  {
    name: "Jabatan",
    selector: (row: any) => row.position.name,
    sortable: true,
  },
  {
    name: "Tempat Tugas",
    selector: (row: any) => row.tempat_tugas,
    sortable: true,
  },
  {
    name: "Agama",
    selector: (row: any) => row.religion.name,
    sortable: true,
  },
  {
    name: "Unit Kerja",
    selector: (row: any) => row.work_unit.name,
    sortable: true,
  },
  {
    name: "No HP",
    selector: (row: any) => row.no_HP,
    sortable: true,
  },
  {
    name: "NPWP",
    selector: (row: any) => row.npwp,
    sortable: true,
  },
];

export { columns };
