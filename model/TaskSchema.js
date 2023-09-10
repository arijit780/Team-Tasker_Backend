const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  assignee: [{
    type: String,
    ref: "User",
    required: true,
  }],
  status: {
    type: String,
    enum: ["In Progress", "Completed"],
    default: "In Progress",
  },
  description: {
    type: String,
    required: true,
  },
  attachments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      file: {
        type: String,
        required: true,
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
        required: true,
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          content: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
