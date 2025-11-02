# Mini Social Media App

A full-featured social media application built with Node.js, Express, MongoDB, and EJS following the MVC architecture pattern.

## Features

- User authentication (register, login, logout) with Passport.js
- User profiles with bio and profile photos
- Create, edit, and delete posts with text and images
- Like/unlike posts
- Comment on posts
- Follow/unfollow users
- Feed showing posts from followed users
- Responsive design

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Local Strategy) with bcrypt
- **View Engine**: EJS
- **Session Management**: express-session with connect-mongo
- **File Uploads**: Multer

## Project Structure (MVC)

```
├── app.js                 # Main application file
├── models/                # Database models
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── views/                 # EJS templates
│   ├── auth/
│   ├── user/
│   ├── post/
│   └── partials/
├── controllers/           # Route controllers
│   ├── authController.js
│   ├── userController.js
│   └── postController.js
├── routes/                # Route definitions
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── postRoutes.js
├── config/                # Configuration files
│   ├── database.js
│   ├── passport.js
│   └── multer.js
├── middleware/            # Custom middleware
│   └── auth.js
├── public/                # Static assets
│   ├── css/
│   ├── js/
│   └── uploads/
└── utils/                 # Utility files
    └── ExpressError.js
```

## Setup Instructions

### 1. MongoDB Setup

You have two options:

**Option A: MongoDB Atlas (Recommended for Replit)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Add the connection string to Replit Secrets as `MONGODB_URI`

**Option B: Local MongoDB**
- Install MongoDB locally if running outside of Replit

### 2. Environment Variables

The following secrets need to be set in Replit:
- `SESSION_SECRET` - Already configured
- `MONGODB_URI` - Your MongoDB connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/social-media-app`)

### 3. Running the App

The app runs on port 5000. Once started:
1. Visit the login page
2. Register a new account
3. Start posting and following users!

## Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Log in with your email and password
3. **Create Posts**: Share your thoughts with text and optional images
4. **Follow Users**: Follow other users to see their posts in your feed
5. **Interact**: Like and comment on posts
6. **Edit Profile**: Update your bio and profile photo

## API Routes

### Authentication
- `GET /auth/register` - Registration page
- `POST /auth/register` - Register new user
- `GET /auth/login` - Login page
- `POST /auth/login` - Authenticate user
- `GET /auth/logout` - Logout user

### User
- `GET /user/:id` - View user profile
- `GET /user/edit` - Edit profile page
- `POST /user/edit` - Update profile
- `POST /user/:id/follow` - Follow/unfollow user

### Posts
- `GET /feed` - View feed
- `GET /post/create` - Create post page
- `POST /post/create` - Create new post
- `GET /post/:id/edit` - Edit post page
- `POST /post/:id/edit` - Update post
- `POST /post/:id/delete` - Delete post
- `POST /post/:id/like` - Like/unlike post
- `POST /post/:id/comment` - Add comment

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- CSRF protection with method-override
- Secure file uploads with validation
- Authentication middleware for protected routes

## Future Enhancements

- Real-time notifications
- User search functionality
- Direct messaging
- Hashtags and trending topics
- Post sharing and reposts
- Dark mode
