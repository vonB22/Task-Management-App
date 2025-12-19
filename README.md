# Taskler

A modern task management system with role-based access control, real-time notifications, and an intuitive Kanban board interface.

## Overview

Taskler is a full-featured task management web application designed for teams and organizations. It provides a clean, warm-themed interface for organizing tasks, tracking progress, and managing team workflows. Built with React and localStorage for persistence, it offers a complete task management solution without requiring a backend server.

## Features

### Core Functionality
- **Kanban Board**: Drag-and-drop task management across three columns (To Do, In Progress, Done)
- **Task CRUD Operations**: Create, read, update, and delete tasks with detailed information
- **Advanced Filtering**: Search and filter tasks by title, description, priority, status, and assignee
- **Real-time Notifications**: Toast notifications for all task operations and status changes

### User Management
- **Role-Based Access Control (RBAC)**: Four distinct roles with different permissions
  - Admin: Full system access including user management
  - Manager: Team oversight and task management
  - Team Member: Create and manage own tasks
  - Viewer: Read-only access
- **User Authentication**: Sign in/sign up with local storage persistence
- **Profile Management**: Editable user profiles with photo upload support (base64 encoding)

### Dashboard & Analytics
- **Task Statistics**: View task counts by status, priority, and assignment
- **Analytics Dashboard**: Visual insights into task distribution and team performance
- **User Dashboard**: Personalized overview of assigned and created tasks

### UI/UX Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Warm Color Theme**: Orange, amber, and yellow gradient design system
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Glass-morphism Effects**: Modern backdrop blur and transparency effects

## Tech Stack

### Frontend
- **React 18.2**: Component-based UI library
- **Vite**: Fast build tool and development server
- **React Router v6**: Client-side routing with protected routes

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Custom Theme**: Warm color palette (orange-500, amber-950, red-500)

### State Management
- **Context API**: Global state for authentication, notifications, tasks, and theme
- **Custom Hooks**: useLocalStorage, useFilter, useRBAC

### Storage
- **LocalStorage API**: Client-side data persistence for tasks, users, and preferences

### Development Tools
- **ESLint**: Code linting and quality checks
- **PostCSS**: CSS processing with Tailwind
- **date-fns**: Date formatting and manipulation

## System Requirements

- Node.js 16.x or higher
- npm 7.x or higher (or yarn/pnpm equivalent)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- 50MB free disk space

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/vonB22/task-management-app.git
cd task-management-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

## Usage Instructions

### First Time Setup
1. Navigate to the landing page
2. Click "Get Started" or "Sign Up"
3. Create an account with your name, email, and password
4. Select a role (for demo purposes, all roles are available)
5. Sign in with your credentials

### Quick Demo Access
On the sign-in page, use the quick demo buttons to instantly log in as:
- Admin: Full access to all features
- Manager: Team management capabilities
- Team Member: Task creation and management
- Viewer: Read-only access

### Creating Tasks
1. Navigate to Dashboard or Tasks page
2. Click "Add Task" button
3. Fill in task details:
   - Title (required)
   - Description
   - Priority (Low, Medium, High)
   - Due Date
   - Status (To Do, In Progress, Done)
4. Click "Add Task" to save

### Managing Tasks
- **Edit**: Click the pencil icon on any task card
- **Delete**: Click the trash icon on any task card
- **Change Status**: Drag and drop tasks between columns on the Dashboard
- **Filter**: Use the search bar and filter dropdowns to find specific tasks

### Profile Management
1. Click on your profile avatar in the header
2. Select "Profile" from the dropdown
3. Click "Edit Profile" button
4. Update your information and upload a photo (max 2MB)
5. Click "Save Changes"

## Folder Structure

```
Task-Management-App/
├── public/
│   ├── favicon.svg           # Custom TK logo
│   └── _redirects            # SPA fallback for Netlify
├── src/
│   ├── assets/               # Static assets
│   ├── components/
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── NotificationCenter.jsx
│   │   ├── task/             # Task-related components
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskFilters.jsx
│   │   │   └── StatusColumn.jsx
│   │   ├── ui/               # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Toast.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Avatar.jsx
│   │   │   ├── DateTimePicker.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   ├── ErrorBoundary.jsx
│   │   └── ProtectedRoute.jsx
│   ├── config/
│   │   ├── permissions.js    # RBAC configuration
│   │   └── theme.js          # Theme configuration
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── TaskContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   ├── useFilter.js
│   │   └── useRBAC.js
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Dashboard.jsx
│   │   ├── TasksPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── ErrorPage.jsx
│   │   └── NotFound.jsx
│   ├── router/
│   │   └── routes.jsx        # Route configuration
│   ├── utils/
│   │   ├── storageHelpers.js
│   │   └── taskHelpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── eslint.config.js
├── postcss.config.cjs
├── tailwind.config.cjs
├── vite.config.js
├── vercel.json               # Vercel deployment config
├── package.json
└── README.md
```

## Environment Variables

This application does not require environment variables as it uses localStorage for data persistence. All configuration is handled through:

- `src/config/permissions.js`: Role-based access control rules
- `src/config/theme.js`: Theme configuration
- `tailwind.config.cjs`: Tailwind CSS customization

## Known Issues / Limitations

### Data Persistence
- All data is stored in browser localStorage, which has a 5-10MB limit
- Data is not synchronized across devices or browsers
- Clearing browser data will delete all tasks and user information

### Authentication
- No backend authentication - passwords are stored in localStorage (demo purposes only)
- Not suitable for production use without a proper backend
- No password recovery or email verification

### File Uploads
- Profile photos are stored as base64 strings in localStorage
- 2MB file size limit to prevent localStorage overflow
- Large images can impact performance

### Browser Compatibility
- Requires modern browser with ES6+ support
- localStorage must be enabled
- No IE11 support

### Mobile Experience
- Touch-based drag-and-drop may have limited functionality
- Some animations may be reduced on low-performance devices

## Future Improvements

### Backend Integration
- Implement REST API or GraphQL backend
- Add database (MongoDB, PostgreSQL) for persistent storage
- Implement JWT-based authentication
- Add real-time updates with WebSockets

### Enhanced Features
- Task comments and activity log
- File attachments for tasks
- Team chat or messaging
- Email notifications
- Task templates
- Recurring tasks
- Time tracking
- Calendar view
- Export tasks to CSV/PDF

### Performance Optimizations
- Implement virtual scrolling for large task lists
- Add service worker for offline functionality
- Optimize image loading with lazy loading
- Add pagination for task lists

### Security Enhancements
- Implement proper password hashing (bcrypt)
- Add two-factor authentication
- Implement CSRF protection
- Add rate limiting for API calls

## Author

**Brezuela & Balana**

This project was developed as a comprehensive task management solution demonstrating modern React development practices, state management, and UI/UX design principles.

## License

MIT License

Copyright (c) 2025 Brezuela & Balana

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Vercel Link

https://taskflow-mocha-six.vercel.app