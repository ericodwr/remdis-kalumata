import PDFDocument from "pdfkit";

const dummyData = [
  {
    id: "289c3c07-7230-44d1-bdf6-0cb5ec6ef710",
    nama: "testingtime",
    NIK: "81239812",
    pekerjaan: "testing dashboard",
    no_telp: "098912381",
    usia: 24,
    agama: "islam",
    jenis_kelamin: "laki-laki",
    alamat: "jalan testing tanggal",
    createdAt: "2024-11-04T11:53:12.377Z",
    updatedAt: "2024-11-04T11:53:12.377Z",
    createdBy: "da10af2d-9291-4435-92b5-26b3cf3f8d95",
    rekam_medis: [
      {
        id: "883ef742-2a60-4296-a185-bc537befd413",
        pasienId: "289c3c07-7230-44d1-bdf6-0cb5ec6ef710",
        userId: "da10af2d-9291-4435-92b5-26b3cf3f8d95",
        keluhan_utama: "gatau deh jujur",
        riwayat_penyakit_obat_opsional: "",
        diagnosa_penyakit: "nyoba doang",
        rencana_tindakan_opsional: "",
        tekanan_darah: 0,
        denyut_nadi: 0,
        pernapasan: 0,
        suhu_tubuh: 0,
        tinggi_badan: 0,
        berat_badan: 0,
        pemeriksaan_fisik_tambahan_opsional: "",
        nama_dokter: "Dr. Testing",
        createdAt: "2024-11-04T11:53:12.377Z",
        updatedAt: "2024-11-04T11:53:12.377Z",
        user: {
          nama: "Poli Umum",
        },
      },
    ],
  },
];

export const getPasienData = (dataCallback: any, endCallback: any) => {
  const doc = new PDFDocument();

  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc.fontSize(25).text("ini pdf bang");
  doc.end();
};
