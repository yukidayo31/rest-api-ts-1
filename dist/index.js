"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./connection"));
const response_1 = __importDefault(require("./response"));
const app = (0, express_1.default)();
const port = 3000;
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
app.listen(port, () => {
    console.log(`Example app running on port ${port}`);
});
