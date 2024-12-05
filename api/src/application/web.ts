import express from "express";
import adminRoute from "../routers/adminRoute";
import authJwt from "../middleware/auth-jwt";
import cors from "cors";
import pdfRoute from "../routers/pdfRoute";

export const web = express();

web.use(express.json());
web.use(cors());

web.use(authJwt);
web.use(adminRoute);
web.use(pdfRoute);
