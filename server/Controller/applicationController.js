
const { Application } = require("../Models/applicationSchema.js");
const User = require("../Models/userSchema.js");

const postApplication = async (req, res) => {
  const { firstName, lastName, email,role, HodDepartment,rollNumber } = req.body;

  // Check if all required fields are present
  if (!firstName || !lastName || !email || !HodDepartment || !role || !rollNumber) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if user's role is "user"
    if (user.role !== "user") {
      return res.status(403).send(`You are not authorized to apply for this ${req.body.role} role`);
    }

    // Create application
    const application = await Application.create({
      firstName,
      lastName,
      email,
      role,
      HodDepartment,
      rollNumber,
      Id: user._id, // Store the user's ID in the application document
    });
    
  //console.log(application);

    res.status(201).send("Application sent successfully");
  } catch (error) {
    console.log(error);
    res.status(400).json({
        success:false,
        message:`Error while sending Message ${error.message}`
    })
  }
};


//get all Applications

const getallApplications=async(req,res,next)=>{
    try{
    const appApplication=await Application.find({});
    res.status(200).json({
        success:true,
        message:"All Applications",
        appApplications:appApplication
    })
    }catch(er){
        res.status(400).json({
            success:false,
            message:"error while fetching all messages"
        })
    }
}



module.exports = { postApplication,getallApplications };
