import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/jwt.js";
import {sendFollowNotification} from "../utils/notificationHandler.js";

//REGISTER USER
const registerUser = async(req,res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "Provide All Credentials" });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({ message: "User Already Exists!" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        return res.status(201).json({ message: "User Registered Successfully", token: generateToken(user._id)  });

    } catch (error) {
        return res.status(500).json({Error: error.message});
    }
}

//LOGIN USER
const loginUser = async(req,res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: "Provide All Credentials" });
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: "Invalid User" });
        }

        if(user.email != email || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        return res.status(200).json({ message: "Logged In Successfully", token: generateToken(user._id) });

    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

// FOLLOW USER
const followUser = async(req,res) => {
    try {
       const {userId, userToBeFollowed} = req.body;
       
       if(!userId || !userToBeFollowed) {
        return res.status(400).json({ message: "Provide All Details" });
       }

       const existingFollow = await User.findOne({
        _id: userId,
        following: userToBeFollowed
      });

      if(existingFollow) {
        return res.status(400).json({ message: "Follow Exists!" });
      }

       const followUser = await User.findById(userToBeFollowed);

       const user = await User.findByIdAndUpdate(userId, {
            $push: {
                following: userToBeFollowed
            }
       });
    //    console.log(user);
       await user.save();

       const follower = await User.findByIdAndUpdate(userToBeFollowed, {
        $push: {
            followers: userId
        }
        });
        await follower.save();

        // console.log(followUser.email);

        const emailError = await sendFollowNotification({
           email: followUser.email, user: user.name, followUser: followUser.name
        });

        if (emailError) {
            return res.status(500).json({ message: "User followed, but notification failed." });
        }

        return res.status(200).json({ message: "User Followed!" });

    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

// UNFOLLOW USER
const unfollowUser = async(req,res) => {
    try {
        const { userId, userToBeUnFollowed } = req.body;

        if(!userId || !userToBeUnFollowed) {
            return res.status(400).json({ message: "Provide All Details" });
           }
    
           const user = await User.findByIdAndUpdate(userId, {
                $pull: {
                    following: userToBeUnFollowed
                }
           });
           await user.save();
    
           const followingUser = await User.findByIdAndUpdate(userToBeUnFollowed, {
            $pull: {
                followers: userId
            }
            });

            await followingUser.save();

            const followUser = await User.findById(userToBeUnFollowed);
    
            return res.status(200).json({ message: "User UnFollowed!" });

    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

// GET USER PROFILE
const getUserProfile = async(req,res) => {
    try {
        const {id} = req.params;
        console.log(id);

        const user = await User.findById(id).populate({
            path: 'posts',
            options: {
                sort: { createdAt: -1 }
            }
        });
        console.log(user);

        return res.status(200).json({ message: "Fetched User Profile!", user });
    } catch (error) {
        return res.status(500).json({ Error: error.message })
    }
}

// GET USER FOLLOW STATUS
const getUserFollowStatus = async(req,res) => {
    const { userId, profileId } = req.params;

  try {
    const user = await User.findById(userId);
    const isFollowing = user.following.includes(profileId);

    return res.status(200).json({ isFollowing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: error.message });
  }
}

//
const UserImageUpload = async(req,res) => {
    try {
        const userId = req.user.id;

        if(!userId || !req.file) {
            return res.status(400).json({ message: "Provide All Details!" });
        }
        console.log(req.file.path, userId);
        const user = await User.findByIdAndUpdate(userId,{
                profileUrl: req.file.path
        });
        await user.save();
        // console.log(user);

        return res.status(200).json({ message: "User Image Updated!", user });

    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}

// SEARCH USERS
const SearchUsers = async(req,res) => {
    try {
        const { query } = req.query;

        const users = await User.find({
            name: {
                $regex: query,
                $options: 'i'
            }
        }).select('name profileUrl');

        if(!users) return res.status(404).json({ message: "No Users Found" });

        return res.status(200).json({ message: "Fetched Users", users });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
}



export { registerUser, loginUser, followUser, unfollowUser, getUserProfile, getUserFollowStatus, SearchUsers, UserImageUpload };
