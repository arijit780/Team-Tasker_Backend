const express = require('express');
const router = express.Router()


const {getAllUser,getUserById,createUser,deleteUser,updateUser, loginUser, updateUserPassword, logoutUser} = require("../controller/userController");
const { createTask, getAllTasks, getTaskById, updateTaskById, deleteTaskById, addAttachments, addComments, addCommentsReplies, deleteCommentsById, deleteCommentsRepliesById } = require('../controller/taskController');

//---------------------------------------------------
//------------------User API-------------------------
//---------------------------------------------------


//api/v1/allusers/       http://localhost:5000/api/v1/allusers/
router.route("/allusers/").get(getAllUser); 

//api/v1/user/:id       http://localhost:5000/api/v1/user/:id
router.route("/user/:id").get(getUserById);

//api/v1/createuser/     http://localhost:5000/api/v1/createuser/
router.route("/createuser").post(createUser);

//api/v1/user/     http://localhost:5000/api/v1/user/
router.route("/user").post(loginUser);

//api/v1/user/:id      http://localhost:5000/api/v1/user/:id 
router.route("/user/:id").put(updateUser);

//api/v1/user/:id/password      http://localhost:5000/api/v1/user/:id/password 
router.route("/user/:id/password").put(updateUserPassword);

//api/v1/user/:id      http://localhost:5000/api/v1/user/:id 
router.route("/user/:id").delete(deleteUser);

router.route('/logout').get(logoutUser);



//---------------------------------------------------
//------------------Task API-------------------------
//---------------------------------------------------


//api/v1/tasks/     http://localhost:5000/api/v1/tasks/
router.route("/tasks").post(createTask);

//api/v1/tasks/     http://localhost:5000/api/v1/tasks/
router.route("/tasks").get(getAllTasks);

//api/v1/tasks/:id     http://localhost:5000/api/v1/tasks/:id
router.route("/tasks/:id").get(getTaskById);

//api/v1/tasks/:id     http://localhost:5000/api/v1/tasks/:id
router.route("/tasks/:id").put(updateTaskById);

//api/v1/tasks/:id     http://localhost:5000/api/v1/tasks/:id
router.route("/tasks/:id").delete(deleteTaskById);

//api/v1/tasks/:id/attachments     http://localhost:5000/api/v1/tasks/:id/attachments
router.route("/tasks/:id/attachments").post(addAttachments);

//api/v1/tasks/:id/comments     http://localhost:5000/api/v1/tasks/:id/comments
router.route("/tasks/:id/comments").post(addComments);

//api/v1/tasks/:taskId/comments/:commentId/replies   http://localhost:5000/api/v1/tasks/:taskId/comments/:commentId/replies
router.route("/tasks/:taskId/comments/:commentId/replies").post(addCommentsReplies);

//api/v1/tasks/:taskId/comments/:commentId   http://localhost:5000/api/v1/tasks/:taskId/comments/:commentId
router.route("/tasks/:taskId/comments/:commentId").delete(deleteCommentsById);

//api/v1/tasks/:taskId/comments/:commentId/replies/:replyId   http://localhost:5000/api/v1/tasks/:taskId/comments/:commentId/replies/:replyId
router.route("/tasks/:taskId/comments/:commentId/replies/:replyId").delete(deleteCommentsRepliesById);



module.exports = router;  