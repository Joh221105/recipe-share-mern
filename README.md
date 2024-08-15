# Recipe Circle

## Description:

This project is a web application focused on sharing and discovering recipes. Users can create, browse, and manage their own recipes while connecting with other users through the recipes they create. The platform offers features like personalized recipe management, user profiles, and discovery of new recipes. The application is built using React for the frontend, Node.js with Express for the backend, and MongoDB for data storage, ensuring a responsive and scalable experience.

## Current Features:
- User Profiles: Create personalized profiles to showcase recipes.
- Recipe Creation: Create and publish new recipes with ingredients, directions, and images.
- Search and Filter: Search for recipes filtering by name or tags.
- Authentication: Secure login and registration process.
- User Dashboard: Manage personal recipes and updates profile settings.

## Planned Features:
- Like, comment, and bookmark recipes
- Search and follow other users
- Responsive design across devices
- Filter recipes by time to cook
- Delete account
- Users can select their top 3 recipes to display on their profile
- Option to make recipes public or private
- Allow users to edit their recipes
- Customizable User Profiles (Cover photo, saved recipes, badges)

## Installation:

Follow these steps to set up the project locally on your machine:

### Clone the Repository
```
git clone git@github.com:Joh221105/recipe-share-mern.git
cd recipe-share-mern
```

### Install Dependencies
```
cd backend
npm install
```
```
cd ../frontend
npm install
```

## Setting Up Environment Variables

```
cd backend
touch .env
```

Open the .env file and add the following variables:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret-key
```

## Running the Application

### Backend (Express Server)

```
cd backend
nodemon app.js
```

The backend server will start on http://localhost:5001

### Frontend (React Application)

```
cd frontend
npm start
```
The React application will start on http://localhost:3000

