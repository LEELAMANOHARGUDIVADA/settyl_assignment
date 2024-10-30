import { Router } from "express";
import { followUser, getUserFollowStatus, getUserProfile, loginUser, registerUser, SearchUsers, unfollowUser, UserImageUpload } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.config.js";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/follow-user', authMiddleware, followUser);
router.post('/unfollow-user', authMiddleware, unfollowUser);
router.get('/getUserProfile/:id', authMiddleware, getUserProfile);
router.get('/isFollowing/:userId/:profileId', authMiddleware, getUserFollowStatus);
router.get('/search', authMiddleware, SearchUsers);
router.post('/updateUserImage', upload.single("file"), authMiddleware, UserImageUpload);

export default router;