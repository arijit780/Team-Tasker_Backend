const Task = require("../model/TaskSchema");

// POST /tasks
exports.createTask = async (req, res) => {
  try {
    const { name, dueDate, priority, assignee, status, description } = req.body;

    // Create a new task
    const task = new Task({
      name,
      dueDate,
      priority,
      assignee,
      status,
      description,
    });

    // Save the task to the database
    const createdTask = await task.save();

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: createdTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// GET /tasks
exports.getAllTasks = async (req, res) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find();

    res.json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tasks",
      error: error.message,
    });
  }
};

// GET /tasks/:id
exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Retrieve the task by ID from the database
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get the task",
      error: error.message,
    });
  }
};

// PUT /tasks/:id
exports.updateTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { name, dueDate, priority, assignee, status, description } = req.body;

    // Find the task by ID and update its properties
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name, dueDate, priority, assignee, status, description },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update the task",
      error: error.message,
    });
  }
};

// DELETE /tasks/:id
exports.deleteTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;

    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the task",
      error: error.message,
    });
  }
};

// POST /tasks/:id/attachments
exports.addAttachments = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { user, file } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Add the attachment to the task
    task.attachments.push({ user, file });
    const updatedTask = await task.save();

    res.json({
      success: true,
      message: "Attachment added successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add attachment to the task",
      error: error.message,
    });
  }
};

// POST /tasks/:id/comments
exports.addComments = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { user, content } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Add the comment to the task
    task.comments.push({ user, content });
    const updatedTask = await task.save();

    res.json({
      success: true,
      message: "Comment added successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add comment to the task",
      error: error.message,
    });
  }
};

// POST /tasks/:taskId/comments/:commentId/replies
exports.addCommentsReplies = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const commentId = req.params.commentId;
    const { user, content } = req.body;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Find the comment within the task
    const comment = task.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Add the reply to the comment
    comment.replies.push({ user, content });
    const updatedTask = await task.save();

    res.json({
      success: true,
      message: "Reply added successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add reply to the comment",
      error: error.message,
    });
  }
};

// DELETE /tasks/:taskId/comments/:commentId
exports.deleteCommentsById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const commentId = req.params.commentId;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Find the comment within the task
    const comment = task.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Remove the comment from the task
    comment.remove();
    const updatedTask = await task.save();

    res.json({
      success: true,
      message: "Comment deleted successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the comment",
      error: error.message,
    });
  }
};

// DELETE /tasks/:taskId/comments/:commentId/replies/:replyId
exports.deleteCommentsRepliesById = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;

    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Find the comment within the task
    const comment = task.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Find the reply within the comment
    const reply = comment.replies.id(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found",
      });
    }

    // Remove the reply from the comment
    reply.remove();
    const updatedTask = await task.save();

    res.json({
      success: true,
      message: "Reply deleted successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the reply",
      error: error.message,
    });
  }
};
