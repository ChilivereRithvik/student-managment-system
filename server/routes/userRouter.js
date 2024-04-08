const express = require('express');
const userRouter = express.Router();
const { isAdminAuthonticated,isUserAuthonticated } = require('../Middlewares/auth.js');
const { 
     registration, 
     login,
     getallstudentRequest,
     addnewAddmin,
     getAlluserDetails,
     logoutAdmin,
     logoutUser,
     addnewHod
    } = require('../Controller/userController.js');

// Corrected the function name to registration
userRouter.post('/registration', registration);

// Added a new route for login
userRouter.post('/login', login);
//userRouter.get('/admin/addnew',addnewAddmin);

userRouter.get('/students',getallstudentRequest);


// Added a new route for addnewAddmin
userRouter.post('/admin/addnew',isAdminAuthonticated,addnewAddmin);

userRouter.get('/admin/me',isAdminAuthonticated,getAlluserDetails);

userRouter.get('/userapil/me',isUserAuthonticated,getAlluserDetails);

userRouter.get('/admin/logout',isAdminAuthonticated,logoutAdmin);

userRouter.get('/userapil/logout',isUserAuthonticated,logoutUser);

userRouter.post('/hod/addnewhod',isAdminAuthonticated,addnewHod);



module.exports = userRouter;
