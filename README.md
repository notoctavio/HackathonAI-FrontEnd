# HackathonAI Frontend

A modern React application for HR management with an integrated AI assistant.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/HackathonAI.git
   cd HackathonAI/HackathonAI-FrontEnd
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following content:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   VITE_API_URL=http://localhost:8080/api
   ```
   
   Replace `your_api_key_here` with your actual Gemini API key.

4. Start the development server
   ```
   npm run dev
   ```

## API Keys and Security

### Handling API Keys

**Important**: Never commit API keys to version control. The `.env` file is included in `.gitignore` for this reason.

To share the project with others:
1. Create a `.env.example` file with placeholder values
2. Tell your teammates to copy this file to `.env` and add their own API keys

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Add it to your `.env` file

## What to Push / What Not to Push

### DO Push:
- Source code (`.js`, `.ts`, `.tsx`, etc.)
- Configuration files (without secrets)
- Documentation
- Tests
- `.gitignore` file
- `.env.example` file (with placeholder values)

### DO NOT Push:
- API keys or secrets (`.env` file)
- `node_modules` directory
- Build artifacts (`/dist` or `/build` directories)
- Large binary files
- Personal IDE configuration
- Logs

## Features

- Dashboard for HR management
- Integrated AI HR assistant using Google's Gemini API
- Modern, responsive design
- Real-time notifications
