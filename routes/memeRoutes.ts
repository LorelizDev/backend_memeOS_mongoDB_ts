import express, { Router } from "express";
import { createMemeValidator, updateMemeValidator, idValidator } from "../validators/memeValidator";
import validate from "../validators/handleValidator";
import memeController from "../controllers/memeController";

const router: Router = express.Router();

router.post("/",createMemeValidator, validate, memeController.createMeme);
router.get("/", memeController.getAllMemes);
router.get("/:id", idValidator, validate, memeController.getOneMeme);
router.put("/:id", updateMemeValidator, validate, memeController.updateMeme);
router.delete('/:id', idValidator, validate, memeController.deleteMeme);

export default router;
