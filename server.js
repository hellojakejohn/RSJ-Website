// server.js
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.server' });

const app = express();
const PORT = process.env.PORT || 5001;

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET'],
  allowedHeaders: ['Content-Type'],
  credentials: false
}));

// Mock data
const mockBlogPosts = [
  {
    id: 1,
    title: "The Art of Improvisation in Public Speaking",
    excerpt: "How spontaneous techniques from theater can transform your communication skills in professional settings.",
    date: "May 15, 2023",
    readTime: "5 min read",
    category: "Public Speaking",
    image: "/blog-improv.jpg"
  },
  {
    id: 2,
    title: "Building Complex Characters: A Writer's Guide",
    excerpt: "Psychological techniques to create multidimensional characters that resonate with audiences.",
    date: "April 2, 2023",
    readTime: "8 min read",
    category: "Writing",
    image: "/blog-characters.jpg"
  },
  {
    id: 3,
    title: "Overcoming Stage Fright: Practical Exercises",
    excerpt: "Evidence-based methods to conquer performance anxiety and own the stage.",
    date: "March 18, 2023",
    readTime: "6 min read",
    category: "Performance",
    image: "/blog-stagefright.jpg"
  },
  {
    id: 4,
    title: "The Chocolate Metaphor: Teaching Through Storytelling",
    excerpt: "How I use chocolate-making as an analogy for creative processes in my workshops.",
    date: "February 5, 2023",
    readTime: "4 min read",
    category: "Teaching",
    image: "/blog-chocolate.jpg"
  },
  {
    id: 5,
    title: "Digital Storytelling in the Modern Classroom",
    excerpt: "Adapting traditional narrative techniques for virtual learning environments.",
    date: "January 22, 2023",
    readTime: "7 min read",
    category: "Teaching",
    image: "/blog-digital.jpg"
  },
  {
    id: 6,
    title: "The Power of Silence in Effective Communication",
    excerpt: "Why what you don't say can be more important than your words.",
    date: "December 10, 2022",
    readTime: "5 min read",
    category: "Public Speaking",
    image: "/blog-silence.jpg"
  }
];

// API endpoints
app.get('/api/blogs', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.json(mockBlogPosts);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});