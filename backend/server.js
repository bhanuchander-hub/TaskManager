const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB when MONGO_URI is provided; otherwise skip to allow local dev
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
} else {
  console.log('MONGO_URI not set; skipping MongoDB connection');
}

// Mock data endpoint (hardcoded for speed; later you can fetch from DB)
app.get('/api/tasks', (req, res) => {
  const data = {
    runningTask: { count: 65, progress: 100 },
    activity: { tasks: 2, history: [1,3,2,4,3,3,2] },  // Add chart data if needed
    taskToday: {
      title: 'Creating Awesome Mobile Apps',
      progress: 90,
      time: '1 Hour',
      image: 'https://picsum.photos/seed/tasktoday/600/400'  // Use a working placeholder image URL
    },
    mentors: [
      { name: 'Curious George', tasks: 40, rating: 4.7, reviews: 350, avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=120&q=60' },
      { name: 'Abraham Lincoln', tasks: 32, rating: 4.9, reviews: 510, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=60' }
    ],
    upcomingTasks: [
      { title: 'Creating Mobile App Design', progress: 75, timeLeft: '3 Days Left', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=60' },
      { title: 'Creating Perfect Website', progress: 85, timeLeft: '4 Days Left', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=60' }
    ],
    detailTask: 'Understanding the basics of making Figma designs...',
    exploreTasks: {
      timeLimit: [
        { title: 'Creating Awesome Mobile Apps', progress: 60, time: '1 Hour', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=60' },
        { title: 'Creating Fresh Website', progress: 85, time: '2 Hour', image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=60' },
        { title: 'Creating Color Palettes', progress: 70, time: '7 Hour', image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=600&q=60' },
        { title: 'Awesome Web Dev', progress: 80, time: '3 Hour', image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=600&q=60' }
      ],
      newTasks: [
        { title: 'Creating Mobile App Design', progress: 95, timeLeft: '3 Days Left', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=60' },
        { title: 'Creating Perfect Website', progress: 79, timeLeft: '4 Days Left', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=60' },
        { title: 'Mobile App Design', progress: 65, timeLeft: '3 Days Left', image: 'https://images.unsplash.com/photo-1529336953121-ad3a8e71c8d0?auto=format&fit=crop&w=600&q=60' },
        { title: 'Creative Android', progress: 10, timeLeft: '10 Days', image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=60' }
      ]
    }
  };
  // Prepend any tasks added via POST to the "newTasks" list
  if (Array.isArray(tasks) && tasks.length) {
    data.exploreTasks.newTasks = [...tasks, ...data.exploreTasks.newTasks];
  }
  res.json(data);
});

const tasks = [];

app.post('/api/tasks', (req, res) => {
  const newTask = req.body;
  if (!newTask || !newTask.title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  tasks.push(newTask);
  res.status(201).json({ message: 'Task added successfully', task: newTask });
});

// Optional endpoint to fetch only newly added tasks
app.get('/api/new-tasks', (req, res) => {
  res.json({ tasks });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
