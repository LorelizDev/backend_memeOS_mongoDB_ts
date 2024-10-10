import mongoose from 'mongoose';
import { DB_HOST, DB_DEV_NAME, DB_PASSWORD, DB_USER, DB_TEST_NAME,NODE_ENV } from "../config.js";

// Determina si estamos en un entorno de prueba
const isTest = NODE_ENV === 'test';
const dbName = isTest ? DB_TEST_NAME : DB_DEV_NAME;

// Crea la URL de conexión a MongoDB Atlas
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${dbName}?retryWrites=true&w=majority`;
// Conexion a una base de datos local
// const dbURL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${dbName}`;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log(`Conectado a MongoDB en la base de datos: ${dbName}`);
  } catch (error) {
    console.log('Error al conectar a MongoDB:', error);
    // Salir del proceso si no se puede conectar
    process.exit(1);
  }
};

export default connectToMongoDB;