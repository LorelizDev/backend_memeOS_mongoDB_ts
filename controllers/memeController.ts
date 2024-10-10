import { Request, Response } from "express";
import memeModel from "../models/memeModel";
import mongoose from "mongoose";

const memeController = {
	// Create a new meme
	createMeme: async (req: Request, res: Response): Promise<void> => {
		try {
			const { name, image, date, author, stream, description } = req.body;
			const newMeme = await memeModel.create({
				name,
				image,
				date,
				author,
				stream,
				description,
			});
			console.log("✅ Meme created successfully");
			res.status(201).json(
				newMeme,
			);
			return;
		} catch (error: unknown) {
			console.error(error);
			res.status(500).json({
				message: "❌ Failed to delete meme",
				error: error instanceof Error ? error.message : String(error),
			});
			return;
		}
	},
	// Get all memes
	getAllMemes: async (req: Request, res: Response): Promise<void> => {
		try {
			const allMemes = await memeModel.find();
			console.log("✅ Memes retrieved successfully");
			res.status(200).json(
				allMemes,
			);
			return;
		} catch (error: unknown) {
			console.error(error);
			res.status(500).json({
				message: "❌ Failed to delete meme",
				error: error instanceof Error ? error.message : String(error),
			});
			return;
		}
	},
	// Get one meme by ID
	getOneMeme: async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
	
			// Verifica si el ID es un ObjectId válido
			if (!mongoose.Types.ObjectId.isValid(id)) {
				res.status(404).json({
					message: "❌ Meme not found",
				});
				return;
			}
	
			const oneMeme = await memeModel.findById(id);
			console.log("✅ Meme retrieved successfully");
			res.status(200).json(oneMeme);
			return;
		} catch (error: unknown) {
			console.error(error);
			res.status(500).json({
				message: "❌ Failed to delete meme",
				error: error instanceof Error ? error.message : String(error),
			});
			return;
		}
	},
	
	// Update a meme by ID
	updateMeme: async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { name, date, author, stream, description } = req.body;

            // Verifica si el ID es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(400).json({
                    message: "❌ Invalid ID format",
                });
                return;
            }

            const updatedMeme = await memeModel.findByIdAndUpdate(
                id,
                { name, date, author, stream, description },
                { new: true }
            );

            // Verifica si el meme fue encontrado y actualizado
            if (!updatedMeme) {
                res.status(404).json({
                    message: "❌ Meme not found",
                });
                return;
            }

            res.status(200).json({
                message: "✅ Meme updated successfully",
                updatedMeme,
            });
        } catch (error: unknown) {
            console.error(error);
            res.status(500).json({
                message: "❌ Failed to update meme",
                error: error instanceof Error ? error.message : String(error),
            });
        }
    },
	
	// Delete a meme by ID
	deleteMeme: async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			// Verifica si el ID es un ObjectId válido
			if (!mongoose.Types.ObjectId.isValid(id)) {
				res.status(404).json({
					message: "❌ Meme not found",
				});
				return;
			}
			await memeModel.findByIdAndDelete(id);
			res.status(200).json({
				message: "✅ Meme deleted successfully",
			});
			return;
		} catch (error: unknown) {
			console.error(error);
			res.status(500).json({
				message: "❌ Failed to delete meme",
				error: error instanceof Error ? error.message : String(error),
			});
			return;
		}
	},
};

export default memeController;