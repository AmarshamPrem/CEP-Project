# CEP Project

CEP Project is a full-stack Node.js application for managing a library system. It supports admin and student roles, book management, issuing/returning books, and user authentication with sessions and cookies.

## Features

- Admin and student authentication
- Book management (add, view, issue, return)
- Student dashboard and profile
- Admin dashboard with statistics
- Secure password hashing (bcrypt)
- Session and cookie-based authentication
- EJS templating and modern UI

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Set up your `.env` file for environment variables
4. Start the server with `npm run dev`

## Folder Structure

- `controllers/` - Route logic for admin, auth, and student
- `models/` - Mongoose models for Admin, Student, Book, etc.
- `routes/` - Express route definitions
- `views/` - EJS templates for UI
- `public/` - Static assets (CSS, JS, images)
- `utils/` - Utility functions
- `config/` - Database configuration
- `middleware/` - Custom Express middleware

## License

MIT
