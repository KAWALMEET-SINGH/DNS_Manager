import express from "express";
import {
  addDomain,
  getDomainFiltering,
  getDomains,
  updateDomain,
  deleteDomain,
} from "../Controllers/domian.controller.js"; 
import { verifyToken } from "../Utils/verifyToken.js";
const router = express.Router();

router.post("/add", verifyToken,addDomain);
router.get("/", verifyToken, getDomains);
router.post("/filter?", verifyToken, getDomainFiltering);

router.put("/:id", verifyToken, updateDomain);
router.delete("/:id", verifyToken, deleteDomain); 

export default router;
