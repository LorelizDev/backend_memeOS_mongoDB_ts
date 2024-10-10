import mongoose from 'mongoose';
import { DB_HOST, DB_DEV_NAME, DB_PASSWORD, DB_USER, DB_TEST_NAME, NODE_ENV } from "../config";

// Determina si estamos en un entorno de prueba
const isTest: boolean = NODE_ENV === 'test';
const dbName: string | undefined = isTest ? DB_TEST_NAME : DB_DEV_NAME;

// Crea la URL de conexión a MongoDB Atlas
const dbURL: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${dbName}?retryWrites=true&w=majority`;

// Alternativa para la conexión a una base de datos local
// const dbURL: string = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/${dbName}`;

const connectToMongoDB = async (): Promise<void> => {
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