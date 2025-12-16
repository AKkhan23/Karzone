const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// register function start here register API..
const register = async (req, res) => {
    const { name, email, password, phone } = req.body;
    // checkinhg all fields are filled or not is liyte yeh finction create kiya hai 
    // and asynchrounus function banaya hai kyuki database se data lena hai or async ek function hai father or await uske under ki ek keyword hai 
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "please fill all fields" })

    }
    // yeh hamne user data base mai exist hai ya nahi iska pata lagane kai liye yeh function banaya hai
    // user model kyu kiya hai user model is a searching function jo database mai jake dekhega ki email exist karta hai ya nahi
    try {
        const existuser = await userModel.findOne({ email });
        if (existuser) {
            return res.status(400).json({ message: "user already exist" });
        }
        // yeh password ko encrypt karne kai liye hai
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const user = new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: genrateToken(user._id),
            isAdmin: user.isAdmin
        }, { message: "user registered successfully" });  
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
};
// Login function start here login API..
const login = async (req, res) => {
    // res.json("login user here")
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ message: "please fill all details" })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "EMAIL NOT FOUND" })
        }
        // bcrypt ek esa function hai jo password ko hashing algorithm mai convert krta hai or safe rkhata hai/
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "inavalid password" })

        }
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: genrateToken(user._id),
            isAdmin: user.isAdmin
        }, { message: "login successful" });

    }
    catch (error) {
        res.status(500).json({ message: error.message });

    }
}

// Get all users function start here get all users API..yeh apno ke sare user data base mai se uthakr lakr derhai hai 
// const getAllusers = async (req, res) => {
//     try {
//         const users = await userModel.find()
//         console.log(users)
//         return res.status(200).json(users)
//     } catch (error) {
//         return res.status(500).json({ message: error.message }) non workeble only for demo use
        
//     }
// }

 privateController = (req, res) => {
    return res.json({ message: "Welcome to the private route", user: req.user });
}

const genrateToken = (id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    return token;
};



module.exports = { register, login, privateController};