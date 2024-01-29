import express, { Express, Request, Response } from "express";
import db from "./connection";
import { QueryError, ResultSetHeader } from "mysql2";
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
  namaLengkap: String;
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

  db.query(sql, (err: QueryError, result: ResultSetHeader) => {
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

app.put("/mahasiswa", (req: Request, res: Response) => {
  const { nim, namaLengkap, kelas, alamat } = req.body;
  const sql: string = `UPDATE mahasiswa SET nama_lengkap = '${namaLengkap}', kelas = '${kelas}', alamat = '${alamat}' WHERE nim = ${nim}`;

  db.query(sql, (err: QueryError, result: any) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        info: result.info,
        details: req.body,
      };
      response(200, data, `Successfully UPDATE mahasiswa nim ${nim}!`, res);
      console.log(`UPDATE mahasiswa nim ${nim} data, OK!`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Failed to UPDATE mahasiswa nim ${nim} data`);
    }
  });
});

app.delete("/mahasiswa", (req: Request, res: Response) => {
  const { nim } = req.body;
  const sql: string = `DELETE FROM mahasiswa WHERE nim = ${nim}`;

  db.query(sql, (err: QueryError, result: ResultSetHeader) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        details: req.body,
      };
      response(200, data, `Successfully DELETE mahasiswa nim ${nim}!`, res);
      console.log(`DELETE mahasiswa nim ${nim} data, OK!`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Failed to DELETE mahasiswa nim ${nim} data`);
    }
  });
});

/*          DOSEN          */
interface IDosen {
  id: Number;
  nip: Number;
  namaLengkap: String;
  mataKuliah: String;
  alamat: String;
}

app.get("/dosen", (req: Request, res: Response) => {
  const sql: string = "SELECT * FROM dosen";

  db.query(sql, (err: QueryError, result: IDosen[]) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    response(200, result, "Successfully GET all dosen list!", res);
    console.log("GET all dosen list, OK!");
  });
});

app.get("/dosen/:nip", (req: Request, res: Response) => {
  const nip: String = req.params.nip;
  const sql = `SELECT * FROM dosen WHERE nip = ${nip}`;

  db.query(sql, (err: QueryError, result: IDosen[]) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    response(200, result, `Successfully GET dosen nip ${nip}!`, res);
    console.log(`GET dosen nip ${nip} data, OK!`);
  });
});

app.post("/dosen", (req: Request, res: Response) => {
  const { nip, namaLengkap, mataKuliah, alamat } = req.body;
  const sql: string = `INSERT INTO dosen (nip, nama_lengkap, mata_kuliah, alamat) VALUES (${nip}, '${namaLengkap}', '${mataKuliah}', '${alamat}')`;

  db.query(sql, (err: QueryError, result: ResultSetHeader) => {
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
      response(200, data, `Successfully ADD dosen nip ${nip}!`, res);
      console.log(`ADD dosen nip ${nip} data, OK!`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Failed to ADD dosen nip ${nip} data`);
    }
  });
});

app.put("/dosen", (req: Request, res: Response) => {
  const { nip, namaLengkap, mataKuliah, alamat } = req.body;
  const sql: string = `UPDATE dosen SET nama_lengkap = '${namaLengkap}', mata_kuliah = '${mataKuliah}', alamat = '${alamat}' WHERE nip = ${nip}`;

  db.query(sql, (err: QueryError, result: ResultSetHeader) => {
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        info: result.info,
        details: req.body,
      };
      response(200, data, `Successfully UPDATE dosen nip ${nip}!`, res);
      console.log(`UPDATE dosen nip ${nip} data, OK!`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Failed to UPDATE dosen nip ${nip} data`);
    }
  });
});

app.delete("/dosen", (req: Request, res: Response) => {
  const { nip } = req.body;
  const sql: string = `DELETE FROM dosen WHERE nip = ${nip}`;

  db.query(sql, (err: QueryError, result: ResultSetHeader) => {
    if (err) {
      response(500, "Invalid data", "Server error", res);
      console.log("SERVER ERROR");
    }
    if (result?.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        details: req.body,
      };
      response(200, data, `Successfully DELETE dosen nip ${nip}!`, res);
      console.log(`DELETE dosen nip ${nip} data, OK!`);
    } else {
      response(404, "user not found", "data doesn't exist", res);
      console.log(`Failed to DELETE dosen nip ${nip} data`);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app running on port ${port}`);
});
