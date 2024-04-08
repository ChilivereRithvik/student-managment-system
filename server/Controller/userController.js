const User = require("../Models/userSchema.js");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/jwtToken.js");

const cloudinary = require("cloudinary"); // Add missing import statement
// Add missing import statement

const registration = async (req, res, next) => {
  const { firstName, lastName, email, phone, password, role } = req.body;

  //console.log(firstName, lastName, email, phone, nic, password, role, HodDepartment);

  // Check if all required fields are provided
  if (!firstName || !lastName || !email || !phone  || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  if (password.length < 8 || phone.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Please enter details correctly",
    });
  }

  // Check if a user with the provided email already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  // Create a new user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    role,
  });

  // Send success response with the newly created user
  // res.status(200).json({
  //   success: true,
  //   user: newUser,
  //   message: "User created successfully",
  // });

  generateToken(newUser, "User created successfully", 200, res);
};

//------------------------------------------------------------------------------------------------------------------

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  // Validate email format
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email",
    });
  }

  // Find user by email and include password in query result
  let userExist = await User.findOne({ email }).select("+password");
  if (!userExist) {
    // If user doesn't exist, return error
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  // Compare provided password with hashed password stored in the database
  if (!(await bcrypt.compare(password, userExist.password))) {
    // If passwords don't match, return error
    return res.status(400).json({
      success: false,
      message: "Invalid email or password",
      
    });
  }

  // Call generateToken function with userExist and response object
  generateToken(userExist, "Login successful", 200, res);
};

// -------------------------

//add new admin by admin
const addnewAddmin = async (req, res, next) => {
  const { firstName, lastName, email, phone, nic, password } = req.body;

  if (!firstName || !lastName || !email || !phone || !nic || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return res.status(400).json({
      success: false,
      message: `Admin is already registered`,
    });
  }
  const newadmin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    password,
    role: "admin",
  });

  console.log(newadmin);

  return res.status(200).json({
    success: true,
    message: "Admin added successfully",
    newadmin,
  });
};

//------------------------------------------------------------------------------

const getallstudentRequest = async (req, res, next) => {
  // Get user by id
  const request = await User.find({ role: "student" });
  return res.status(200).json({
    success: true,
    allstudents: request,
  });
};

//---------------------------------------------------------------

const getAlluserDetails = async (req, res, next) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    user,
  });
};

//admin logout-----
const logoutAdmin = async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
};

//user logout----------
const logoutUser = async (req, res, next) => {
 return  res
    .status(200)
    .cookie("userToken", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully",
    });
};





const addnewHod = async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload a file",
    });
  }
  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return res.status(400).json({
      success: false,
      message: "Please upload a valid image file",
    })
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    password,
    HodDepartment
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !HodDepartment ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields.....................",
    });
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return res.status(400).json({
      success: false,
      message: `${isRegistered.role} is already registered with this email`,
    });
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return res.status(500).json({
      success: false,
      message: "Failed to upload image to Cloudinary",
    });
  }
  const userAvatar = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    password,
    role: "HOD",
    HodDepartment,
    Avatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Successfull",
    userAvatar,
  });
};









module.exports = {
  registration,
  login,
  getallstudentRequest,
  addnewAddmin,
  getAlluserDetails,
  logoutAdmin,
  logoutUser,
  addnewHod,

}; // Correct function name in module.exports
