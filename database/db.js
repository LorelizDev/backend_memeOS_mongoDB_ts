import mongoose from 'mongoose';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_TEST_NAME } from "../config.js";

// Determina si estamos en un entorno de prueba
const isTest = process.env.NODE_ENV === 'test';
const dbName = isTest ? DB_TEST_NAME : DB_NAME;

// Crea la URL de conexión a MongoDB
const dbURL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}`;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conectado a MongoDB en la base de datos: ${DB_NAME}`);
  } catch (error) {
    console.log('Error al conectar a MongoDB:', error);
    // Salir del proceso si no se puede conectar
    process.exit(1);
  }
};

export default connectToMongoDB;