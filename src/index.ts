import express, { Express, Request, Response } from "express";
import db from "./connection";
import { QueryError, QueryOptions } from "mysql2";
import response from "./response";
import bodyParser from "body-parser";

const app: Express = express();
const port: Number = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  response(200, "this is data", "OK, homepage success!", res);
  console.log("GET homepage, OK!");
});

/*          MAHASISWA          */
interface IMahasiswa {
  id: Number;
  nim: Number;
  nama_lengkap: String;
  kelas: String;
  alamat: String;
}

app.get("/mahasiswa", (req: Request, res: Response) => {
  const sql: string = "SELECT * FROM mahasiswa";

  db.query(sql, (err: QueryError, result: IMahasiswa[]) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    response(200, result, "Successfully GET all mahasiswa list!", res);
    console.log("GET all mahasiswa list, OK!");
  });
});

app.get("/mahasiswa/:nim", (req: Request, res: Response) => {
  const nim: String = req.params.nim;
  const sql: string = `SELECT * FROM mahasiswa WHERE nim = ${nim}`;

  db.query(sql, (err: QueryError, result: IMahasiswa[]) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    response(200, result, `Successfully GET mahasiswa nim ${nim}!`, res);
    console.log(`GET mahasiswa nim ${nim} data, OK!`);
  });
});

app.post("/mahasiswa", (req: Request, res: Response) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql: string = `INSERT INTO mahasiswa (nim, nama_lengkap, kelas, alamat) VALUES (${nim}, '${namaLengkap}', '${kelas}', '${alamat}')`;

  db.query(sql, (err: QueryError, result: any) => {
    console.log(result);
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
        details: req.body,
      };
      response(200, data, `Successfully ADD mahasiswa nim ${nim}!`, res);
      console.log(`ADD mahasiswa nim ${nim} data, OK!`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Failed to ADD mahasiswa nim ${nim} data`);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app running on port ${port}`);
});
