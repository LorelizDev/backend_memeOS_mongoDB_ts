import request from 'supertest';
import memeModel from '../models/memeModel.js';
import connectToMongoDB from '../database/db.js';
import { app, server } from '../app.js';
import mongoose from 'mongoose';

beforeAll(async () => {
    // Conectar a la base de datos de MongoDB
    await connectToMongoDB();
});

afterEach(async () => {
    // Limpiamos la colección de memes después de cada prueba
    await memeModel.deleteMany({});
});

afterAll(async() => {
    // Cerramos la conexión a la base de datos después de las pruebas
    await connectToMongoDB.close();
    // Cerramos el servidor después de las pruebas
    server.close();
});

// ===================
// TODAS LAS PRUEBAS DEL CRUD
// ===================
describe('Meme Controller CRUD Tests', () => {

    describe('CREATE meme', () => {
        
        it('should create a meme', async () => {
            const memeData = {
                name: 'Test Meme',
                image: 'http://example.com/image.jpg',
                date: '2024-01-01',
                author: 'Test Author',
                stream: 'test_stream',
                description: 'This is a test description',
            };
    
            const response = await request(app).post('/api/memes').send(memeData);
    
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(memeData.name);
            expect(response.body.image).toBe(memeData.image);
            expect(response.body.date).toBe(memeData.date);
            expect(response.body.author).toBe(memeData.author);
            expect(response.body.stream).toBe(memeData.stream);
            expect(response.body.description).toBe(memeData.description);
            expect(response.body).toHaveProperty('id');
        });

        it('should handle errors on meme creation', async () => {
            const response = await request(app).post('/api/memes').send({
                name: '',
                image: 'invalid-url',
                date: '',
                author: '',
                stream: '',
                description: '',
            });
    
            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });
    });

    describe('GET memes', () => {

        describe('GET all memes', () => {

            it('should get all memes', async () => {
                await memeModel.insertMany([{
                    name: 'Meme 1',
                    image: 'http://example.com/image1.jpg',
                    date: '2024-01-01',
                    author: 'Author 1',
                    stream: 'stream1',
                    description: 'Description 1'
                },
                {
                    name: 'Meme 2',
                    image: 'http://example.com/image2.jpg',
                    date: '2024-01-02',
                    author: 'Author 2',
                    stream: 'stream2',
                    description: 'Description 2'
                }]);

                const response = await request(app).get('/api/memes');
        
                expect(response.status).toBe(200);
                expect(response.headers['content-type']).toContain('application/json')
                expect(Array.isArray(response.body)).toBe(true);

                // Recuperamos los memes de la base de datos
                const memesInDb = await memeModel.find();
                //Comprobamos que la longitud de la respuesta coincida con la longitud de los memes en la base de datos
                expect(response.body).toHaveLength(memesInDb.length);
            });
        });

        describe('GET one meme by its ID', () => {

            it('should get one meme by id', async () => {
                const meme = await memeModel.create({
                    name: 'Test Meme',
                    image: 'http://example.com/image.jpg',
                    date: '2024-01-01',
                    author: 'Test Author',
                    stream: 'stream',
                    description: 'Test description'
                });

                const response = await request(app).get(`/api/memes/${meme.id}`);

                expect(response.status).toBe(200);
                expect(response.body.name).toBe(meme.name);
            });
            
            it('should return 404 if meme not found', async () => {
                const response = await request(app).get('/api/memes/999')
        
                expect(response.status).toBe(404);
                expect(response.body).toEqual({ message: "❌ Meme not found" });
            });
        });
    });

    describe('UPDATE meme ', () => {

        it('should update a meme', async () => {
            const meme = await memeModel.create({
                name: 'Old Meme',
                image: 'http://example.com/oldimage.jpg',
                date: '2024-01-01',
                author: 'Test Author',
                stream: 'stream',
                description: 'Old description'
            });
    
            const updateData = {
                name: 'Updated Meme',
                date: '2024-01-02',
                author: 'Updated Author',
                stream: 'updated_stream',
                description: 'Updated description'
            };

            const response = await request(app).put(`/api/memes/${meme.id}`).send(updateData);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("✅ Meme updated successfully");

            const updatedMeme = await memeModel.findById(meme.id);
            expect(updatedMeme.name).toBe(updateData.name);
        });

        it('should return 404 if meme not found', async () => {
            const response = await request(app).get('/api/memes/999')
    
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "❌ Meme not found" });
        });

        it('should handle errors on meme updating', async () => {
            const meme = await memeModel.create({
                name: 'Old Meme',
                image: 'http://example.com/oldimage.jpg',
                date: '2024-01-01',
                author: 'Test Author',
                stream: 'stream',
                description: 'Old description'
            });

            const response = await request(app).put(`/api/memes/${meme.id}`).send({
                name: '',
                date: '',
                author: '',
                stream: '',
                description: '',
            });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });
    });

    describe('DELETE meme', () => {

        it('should delete a meme', async () => {
        const meme = await memeModel.create({
            name: 'Test Meme to Delete',
            image: 'http://example.com/image.jpg',
            date: '2024-01-01',
            author: 'Test Author',
            stream: 'stream',
            description: 'Description'
        });

            const response = await request(app).delete(`/api/memes/${meme.id}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("✅ Meme deleted successfully");

            const deletedMeme = await memeModel.findById(meme.id);
            // Verificamos que el meme ya no existe
            expect(deletedMeme).toBeNull();
        });

        it('should return 404 if meme not found', async () => {
            const response = await request(app).get('/api/memes/999')
    
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ message: "❌ Meme not found" });
        });
    });
});