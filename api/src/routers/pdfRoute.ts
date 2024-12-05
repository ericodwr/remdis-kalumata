import express from "express";
import { Request, Response, NextFunction } from "express";
import { getPasienData } from "../services/pdfService";

const pdfRoute = express.Router();

pdfRoute.get(
  "/pdf",
  async (req: Request, res: Response, next: NextFunction) => {
    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment;filename=data.pdf",
    });
    getPasienData(
      (chunk: any) => stream.write(chunk),
      () => stream.end()
    );
  }
);

export default pdfRoute;
