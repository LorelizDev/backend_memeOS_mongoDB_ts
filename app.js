import express from "express";
import connectToMongoDB from "./database/db.js";
import memeModel from "./models/memeModel.js";
import memeRoutes from "./routes/memeRoutes.js";
import cors from 'cors';

export const app = express();
app.use(cors());
const PORT = process.env.PORT || 8000;

//middleware es para convertir json/js-js/json
app.use(express.json());

//para usar la ruta que queremos
app.use("/api/memes", memeRoutes);

try {
  await connectToMongoDB();
  console.log("👍Conexión a MongoDB exitosa");
} catch (error) {
  console.error("❌No se pudo conectar a MOngoDB", error);
}

export const server = app.listen(PORT, () => {
  console.log(`🏃‍♂️Server running on http://localhost:${PORT}`);
});
