// yeh meddile wear is liye bante hai ki ham yaha se login mtlb jo user login krega uska token genrate or token handel krne ke liye middle wear bnta hai

const jwt=require("jsonwebtoken");
const User=require("../model/userModel");

const protect = async (req, res, next) => {
  let token;
  try {
    if (  
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // verifying token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);      
        throw new Error("Invalid Token!!");
      }
    } else {
      res.status(401);
      throw new Error("No Token Found!!");
    }
  } catch (error) {
    res.status(401);
    throw new Error("No Token Found!!");
  }
}; 

module.exports = protect;
