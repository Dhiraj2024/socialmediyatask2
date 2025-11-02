# Mini Social Media App

## Overview
A complete social media application built with Node.js, Express.js, MongoDB, and EJS templates following the MVC (Model-View-Controller) architecture pattern. The app includes user authentication, posts with images, comments, likes, and a follow system.

## Current State
- Fully implemented MVC architecture
- All features working: authentication, posts, comments, likes, follows
- Responsive UI with clean design
- MongoDB database with Mongoose ODM
- Session-based authentication with Passport.js
- File uploads for profile photos and post images

## Recent Changes (2025-01-02)
- Initial project setup with complete MVC structure
- Created User, Post, and Comment models
- Implemented authentication system with Passport.js and bcrypt
- Built complete CRUD operations for posts
- Added like/unlike and comment functionality
- Implemented follow/unfollow system
- Created feed showing posts from followed users
- Built responsive UI with EJS templates and custom CSS
- Added client-side JavaScript for interactive features

## Project Architecture

### MVC Structure
- **Models**: User, Post, Comment (Mongoose schemas)
- **Views**: EJS templates for auth, user profiles, posts, and feed
- **Controllers**: authController, userController, postController
- **Routes**: Separated routes for auth, user, and post operations

### Key Features
1. User authentication with password hashing
2. User profiles with customizable bio and photo
3. Create, edit, delete posts with optional images
4. Like/unlike posts with real-time updates
5. Comment on posts
6. Follow/unfollow users
7. Personalized feed showing posts from followed users

### Technologies
- Node.js & Express.js
- MongoDB & Mongoose
- Passport.js (local strategy)
- bcrypt for password hashing
- Multer for file uploads
- EJS templating
- express-session with connect-mongo

## User Preferences
None specified yet.
