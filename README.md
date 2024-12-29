# AlgoTime

A web application for learning and practicing algorithms with multiple solution approaches.

## Features

- Interactive problem-solving platform
- Multiple solution approaches for each problem
- Detailed explanations with time and space complexity
- Syntax-highlighted code implementations
- Edge cases and limitations analysis

## Tech Stack

- Frontend: React.js, TailwindCSS
- Backend: Node.js, Express
- Code Highlighting: react-syntax-highlighter
- Icons: Lucide React

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/algotime.git
cd algotime


# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Start the backend server

cd server
npm run dev

# Start the frontend development serve
cd client
npm start

# Project Structure
algotime/
├── client/              # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   └── App.js
├── server/              # Backend Node.js server
│   ├── routes/         # API routes
│   └── index.js
└── README.md