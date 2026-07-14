> **🔗 Looking for the API and Gemini AI Integration Layer? [Click here to visit the MockMate Backend Repository](https://github.com/preetChaudhary04/mockmatebackend)**

---

# 🚀 MockMate (Frontend)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://mockmate-gules.vercel.app/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white)](#)

**MockMate** is an AI-powered interview preparation platform designed to help developers and job seekers practice smarter. By analyzing a user's resume, self-description, and target job description, MockMate generates a highly personalized, ATS-style interview strategy using Google's Gemini AI.

This repository contains the **Frontend** code for the application, built with React, Vite, and Tailwind CSS.

🔗 **Live Demo:** [https://mockmate-gules.vercel.app](https://mockmate-gules.vercel.app)  
⚙️ **Backend Repository:** [https://github.com/preetChaudhary04/mockmatebackend](https://github.com/preetChaudhary04/mockmatebackend)

---

## 📖 Table of Contents

1. [Key Features](#-key-features)
2. [Tech Stack](#️-tech-stack)
3. [Architecture & State Management](#-architecture--state-management)
4. [Folder Structure](#-folder-structure)
5. [Environment Setup](#-environment-setup)
6. [Getting Started](#-getting-started)
7. [Vercel Deployment Guide](#-vercel-deployment-guide)
8. [Contributing](#-contributing)

---

## ✨ Key Features

### 🎨 Interface & Design

- **Sleek Dark Mode UI:** A modern, premium interface with glowing neon gradients and glassmorphism effects, built entirely with Tailwind CSS.
- **Fully Responsive Design:** Seamless experience across desktop, tablet, and mobile devices with interactive sidebars and adaptive layouts.

### 📊 AI-Driven Dashboards

- **Dynamic Dashboards:** Visually engaging representation of AI-generated data, including circular progress indicators for **Match Scores** and color-coded pills for **Skill Gaps**.
- **Interactive Q&A Modules:** Accordion-style UI for Technical and Behavioral questions, allowing users to toggle between questions, interviewer intentions, and model answers.
- **Actionable Roadmaps:** A beautifully styled vertical timeline mapping out a day-by-day interview preparation plan.

### 🔒 Auth & Data Handling

- **Secure Authentication Flow:** Complete frontend routing for Login and Registration with protected routes and JWT-cookie handling.
- **PDF Resume Upload:** Integrated file handling for resume uploads directly to the backend, parsed alongside a self-description and target job description to generate the personalized interview strategy.

---

## 🛠️ Tech Stack

- **Core:** React.js
- **Build Tool:** Vite (for fast HMR and optimized production builds)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **State Management:** React Context API (`AuthContext`, `InterviewContext`) + custom hooks (`useInterview`)
- **API Communication:** Axios (with credentials enabled for secure cookie transfer)
- **Icons:** Lucide React

---

## 🏗 Architecture & State Management

MockMate's frontend centers around the `InterviewContext`, which holds the AI-generated session data (match score, skill gaps, question sets, and the prep roadmap) once the resume, self-description, and job description are submitted to the backend. The `useInterview` hook exposes this state to page-level components (`Home.jsx`, `Interview.jsx`) so the dashboards, accordions, and timeline all stay in sync without prop drilling.

Authentication is handled separately through `AuthContext`, which manages the logged-in user's session and gates access to interview-related routes via protected routing.

---

## 📂 Folder Structure

```text
mockmate-frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components (Loader, etc.)
│   ├── context/           # Context API providers (Auth, Interview)
│   ├── hooks/              # Custom hooks (useInterview, etc.)
│   ├── pages/              # Main application views (Home, Interview, Login, Register)
│   ├── services/           # API integration logic (auth.api.js, interview.api.js)
│   ├── App.jsx              # Main application routing
│   └── main.jsx              # Entry point
├── .env                     # Local environment variables
├── vite.config.js           # Vite bundler configuration
└── package.json              # Dependencies and scripts
```

---

## 🔐 Environment Setup

Create a `.env` file in the root directory and add your backend API URL.

```env
VITE_API_BASE_URL=http://localhost:3000
```

> **Note:** Ensure your `axios.create` instance in `services/` points to this environment variable instead of a hardcoded string, so it works correctly across local and production deployments.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/preetChaudhary04/mockmate.git
```

Navigate to the project directory:

```bash
cd mockmate
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser to view the app.

### Available Scripts

- `npm run dev` - Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build` - Compiles the application into static files inside the `dist/` folder for production deployment.
- `npm run preview` - Boots up a local web server to preview the compiled `dist/` production build.

---

## 🚀 Vercel Deployment Guide

Because this is a Single Page Application (SPA) using React Router, direct navigation or hard refreshes on nested routes (like `/interview`) will return a 404 Not Found error on Vercel by default unless rewrites are configured.

Add a `vercel.json` file at the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

When deploying, connect your GitHub repository to Vercel, set the `VITE_API_BASE_URL` environment variable to your live backend URL, and Vercel will handle the `npm run build` step and route all traffic through your React Router automatically.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
