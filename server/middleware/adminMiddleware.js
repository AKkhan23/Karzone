// or yeh meddileware admin ke token handlling or usko genrate kerne ka liye meddleware bante hai yah se admin ka token hmne add kiya hai uski api hai yeh  

const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const adminProtect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verifying token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user data without password
      const user = await userModel.findById(decoded.id).select("-password");
      if (user.
        isAdmin) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Access denied: Admin privileges required!");
      }
    } else {
      res.status(401);
      throw new Error("No Token Found! Not Admin!");
    }
  } catch (error) {
    res.status(401);
    throw new Error("No Token Found! Not Admin!!");
  }
};

module.exports=adminProtect;
