"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasienData = void 0;
const pdfkit_table_1 = __importDefault(require("pdfkit-table"));
const patientService_1 = require("./patientService");
const getPasienData = (dataCallback, endCallback, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, patientService_1.getPatientAndAllRemdis)(id);
        const doc = new pdfkit_table_1.default({ layout: "landscape" });
        doc.fontSize(12);
        doc.on("data", dataCallback);
        doc.on("end", endCallback);
        let col1LeftPos = 50;
        let colTop = 25;
        let colWidth = 75;
        let col2LeftPos = colWidth + col1LeftPos + 40;
        let col3LeftPos = col2LeftPos + 200;
        let col4LeftPos = col3LeftPos + colWidth + 40;
        doc
            .text("Nama", col1LeftPos, colTop, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.nama}`, col2LeftPos, colTop, {
            width: colWidth,
        })
            .text("NIK", col3LeftPos, colTop, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.NIK}`, col4LeftPos, colTop, {
            width: colWidth,
        });
        doc
            .text("Pekerjaan", col1LeftPos, colTop * 2, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.pekerjaan}`, col2LeftPos, colTop * 2, {
            width: colWidth,
        })
            .text("No Telp", col3LeftPos, colTop * 2, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.no_telp}`, col4LeftPos, colTop * 2, {
            width: colWidth,
        });
        doc
            .text("Usia", col1LeftPos, colTop * 3, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.usia}`, col2LeftPos, colTop * 3, {
            width: colWidth,
        })
            .text("Agama", col3LeftPos, colTop * 3, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.agama}`, col4LeftPos, colTop * 3, {
            width: colWidth,
        });
        doc
            .text("Jenis Kelamin", col1LeftPos, colTop * 4, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.jenis_kelamin}`, col2LeftPos, colTop * 4, {
            width: colWidth,
        })
            .text("Alamat", col3LeftPos, colTop * 4, { width: colWidth })
            .text(`: ${data === null || data === void 0 ? void 0 : data.alamat}`, col4LeftPos, colTop * 4, {
            width: colWidth,
        });
        doc.text("", col1LeftPos, colTop * 10, { width: colWidth });
        doc.table({
            headers: [
                { label: "Poli", property: "poli", width: 50, align: "center" },
                {
                    label: "Penanggung Jawab",
                    property: "penanggung_jawab",
                    width: 50,
                    align: "center",
                },
                {
                    label: "Keluhan Utama",
                    property: "keluhan_utama",
                    width: 70,
                    align: "center",
                },
                {
                    label: "Riwayat Penyakit Obat",
                    property: "riwayat_penyakit_obat",
                    width: 70,
                    align: "center",
                },
                {
                    label: "Diagnosa Penyakit",
                    property: "diagnosa_penyakit",
                    width: 70,
                    align: "center",
                },
                {
                    label: "Rencana Tindakan",
                    property: "rencana_tindakan",
                    width: 70,
                    align: "center",
                },
                {
                    label: "Tekanan Darah",
                    property: "tekanan_darah",
                    width: 40,
                    align: "center",
                },
                {
                    label: "Denyut Nadi",
                    property: "denyut_nadi",
                    width: 40,
                    align: "center",
                },
                {
                    label: "Pernapasan",
                    property: "pernapasan",
                    width: 40,
                    align: "center",
                },
                {
                    label: "Suhu Tubuh",
                    property: "suhu_tubuh",
                    width: 40,
                    align: "center",
                },
                {
                    label: "Tinggi Badan",
                    property: "tinggi_badan",
                    width: 40,
                    align: "center",
                },
                {
                    label: "Berat Badan",
                    property: "berat_badan",
                    width: 40,
                    align: "center",
                },
                {
                    label: "Pemeriksaan Fisik Tambahan",
                    property: "pemeriksaan_fisik",
                    width: 50,
                    align: "center",
                },
            ],
            datas: data === null || data === void 0 ? void 0 : data.rekam_medis.map((d) => ({
                poli: d.user.nama,
                penanggung_jawab: d.nama_dokter,
                keluhan_utama: d.keluhan_utama,
                riwayat_penyakit_obat: d.riwayat_penyakit_obat_opsional
                    ? d.riwayat_penyakit_obat_opsional
                    : "",
                diagnosa_penyakit: d.diagnosa_penyakit,
                rencana_tindakan: d.rencana_tindakan_opsional
                    ? d.rencana_tindakan_opsional
                    : "",
                tekanan_darah: d.tekanan_darah ? d.tekanan_darah : "",
                denyut_nadi: d.denyut_nadi ? d.denyut_nadi.toString() : "",
                pernapasan: d.pernapasan ? d.pernapasan.toString() : "",
                suhu_tubuh: d.suhu_tubuh ? d.suhu_tubuh.toString() : "",
                tinggi_badan: d.tinggi_badan ? d.tinggi_badan.toString() : "",
                berat_badan: d.berat_badan ? d.berat_badan.toString() : "",
                pemeriksaan_fisik: d.pemeriksaan_fisik_tambahan_opsional
                    ? d.pemeriksaan_fisik_tambahan_opsional
                    : "",
            })),
            // [
            //   { name: "bold:Name 1", age: "Age 1", year: "Year 1" },
            //   { name: "Name 2", age: "Age 2", year: "Year 2" },
            //   {
            //     name: "Name 3",
            //     age: "Age 3",
            //     year: "Year 3",
            //     renderer:
            //       "function(value, i, irow){ return value + `(${(1+irow)})`; }",
            //   },
            // ],
            // rows: [["Name 4", "Age 4", "Year 4"]],
            // title: "Rekam Medis",
        }, {
            columnSpacing: 10,
            divider: {
                horizontal: { disabled: false, width: 2 },
                header: { disabled: false, width: 2 },
            },
        });
        doc.end();
    }
    catch (error) { }
});
exports.getPasienData = getPasienData;
