import { prisma } from "./application/database";
import { web } from "./application/web";

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

web.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log("Server running at: " + PORT);
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }
});
