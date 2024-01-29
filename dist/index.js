"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const response_1 = __importDefault(require("./response"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    (0, response_1.default)(200, "this is data", "OK, homepage success!", res);
    console.log("GET homepage, OK!");
});
app.get("/mahasiswa", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    connection_1.default.query(sql, (err, result) => {
        if (err) {
            (0, response_1.default)(500, "Invalid data", "Server error", res);
            console.log("SERVER ERROR");
        }
        (0, response_1.default)(200, result, "Successfully GET all mahasiswa list!", res);
        console.log("GET all mahasiswa list, OK!");
    });
});
app.get("/mahasiswa/:nim", (req, res) => {
    const nim = req.params.nim;
    const sql = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;
    connection_1.default.query(sql, (err, result) => {
        if (err) {
            (0, response_1.default)(500, "Invalid data", "Server error", res);
            console.log("SERVER ERROR");
        }
        (0, response_1.default)(200, result, `Successfully GET mahasiswa nim ${nim}!`, res);
        console.log(`GET mahasiswa nim ${nim} data, OK!`);
    });
});
app.post("/mahasiswa", (req, res) => {
    const { nim, namaLengkap, kelas, alamat } = req.body;
    const sql = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`;
    connection_1.default.query(sql, (err, result) => {
        if (err) {
            (0, response_1.default)(500, "Invalid data", "Server error", res);
            console.log("SERVER ERROR");
        }
        if (result === null || result === void 0 ? void 0 : result.affectedRows) {
            const data = {
                isSuccess: result.affectedRows,
                id: result.insertId,
                details: req.body,
            };
            (0, response_1.default)(200, data, `Successfully ADD mahasiswa nim ${nim}!`, res);
            console.log(`ADD mahasiswa nim ${nim} data, OK!`);
        }
        else {
            (0, response_1.default)(404, "user not found", "data doesn't exist", res);
            console.log(`Failed to ADD mahasiswa nim ${nim} data`);
        }
    });
});
app.put("/mahasiswa", (req, res) => {
    const { nim, namaLengkap, kelas, alamat } = req.body;
    const sql = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`;
    connection_1.default.query(sql, (err, result) => {
        if (err) {
            (0, response_1.default)(500, "Invalid data", "Server error", res);
            console.log("SERVER ERROR");
        }
        console.log(result);
    });
});
app.listen(port, () => {
    console.log(`Example app running on port ${port}`);
});
