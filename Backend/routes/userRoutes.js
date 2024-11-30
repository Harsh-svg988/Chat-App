import express from 'express'
import protectRoute from '../middlewares/protectRoute';
const router = express.Router

router.get("/",protectRoute,getUsersForSidebar)
export default router;
