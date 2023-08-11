# Purrfect Pawtners 🐱 

## Description

Welcome to a cat lover's paradise – a MERN (MongoDB, Express.js, React, Node.js) application that brings together adorable cats in need of homes with compassionate individuals looking to provide them with the love and care they deserve. Our platform serves as a bridge, connecting homeless cats with loving homes where they can thrive and find companionship.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anon I can sign up in the platform so that I can start connecting with homeless cats and homes.
- **Login:** As a user I can login to the platform so that I can see and interact with cat and home profiles.
- **Profile:** As a user I want to view and manage my profile information and preferences related to cat adoption.
- **Logout:** As a user I can logout from the platform so that my session is securely terminated.
- **Add Cats:** As a user I can add cat profiles to the platform so that they can find suitable homes.
- **View Cats:** As a user I want to see a list of available cats for adoption so that I can consider adopting them.
- **Adopt Cats:** As a user I can initiate the process of adopting a cat by contacting the cat owner.
- **Add Homes:** As a user I can add home profiles to the platform so that potential cat owners can connect with me.
- **Edit Homes:** As a user I want to edit the information of a home, including its name, location, and description.
- **Delete Homes:** As a user, I want to delete a home that I no longer want to manage.
- **View Homes:** As a user I want to see a list of homes available for adopting cats so that I can find a good match.
- **Post Articles:** As a user I want to post articles on various cat-related topics.
- **View Articles:** As a user I want to view a list of articles posted by other users, including titles and brief descriptions.
- **Receive messages:** As a user I want to receive messages from other users interested in adopting my cats or in offering their cats to be adopted by my home.
- **Contact HomeOwners:** As a user I can initiate the process of finding a new home for my cat by contacting the home owner.

## Backlog

- **Edit profile:**: As a user, I want to edit my profile information, including my name, photo and email.
- **Favorites:** As a user I want to mark cats and homes as favorites so that I can easily access them later.
- **Search Homes:** As a user I want to search homes by location or other criteria so that I can find suitable matches.
- **Search Cats:** As a user I want to search cats by name, age, gender or other criteria so that I can quickly find specific cats.
- **Error Handling:**:  As a user, I want to see appropriate error messages when performing actions, such as signing up, logging in, or editing profiles, to understand any issues.

## Client / Frontend

### Frontend Routes

| Path                  | Component              | Permissions              | Behavior                               |
|-----------------------|------------------------|--------------------------|----------------------------------------|
| /                     | HomePage               | Public                   | Display the homepage                   |
| /signup               | Signup                 | Public                   | Register a new user                     |
| /login                | Login                  | Public                   | Log in user                             |
| /articles             | Articles               | Public                   | Display list of articles                |
| /articles/new         | NewArticle             | Private                  | Display form to create a new article    |
| /comment/:id          | NewComment             | Private                  | Display form to create a new comment    |
| /comment/info/:id     | CommentDetails         | Private                  | Display details of a comment            |
| /profile              | Profile                | Private                  | Display user's profile                  |
| /profile/:id/update   | UpdateProfile          | Private                  | Display form to update user's profile   |
| /homes                | AllHomesPage           | Public                   | Display list of homes                   |
| /homes/new            | NewHomePage            | Private                  | Display form to create a new home       |
| /homes/:id            | HomeDetailsPage        | Private                  | Display details of a home               |
| /homes/:id/edit       | UpdateHomePage         | Private                  | Display form to update a home           |
| /cats                 | AllCatsPage            | Public                   | Display list of cats                    |
| /cats/:id             | CatDetailsPage         | Public                   | Display details of a cat                |
| /cats/new             | NewCat                 | Private                  | Display form to create a new cat        |
| /cats/:id/update      | UpdateCatPage          | Private                  | Display form to update a cat            |
| *                     | 404 page               | Public                   | Display a 404 error page                |

### Components & Pages

- IsPrivate
- Navbar
- HomePage
- SignUp
- LogIn
- Profile
- UpdateProfile
- NewCat
- AllCatsPage
- CatDetailsPage
- UpdateCatPage
- HomeForm
- NewHomePage
- AllHomesPage
- HomeDetailsPage
- UpdateHomePage
- NewArticle
- Articles
- NewComment
- CommentDetail

### Services

#### Auth Context Service
The Auth Context service manages user authentication and session information. It provides functions and states to handle authentication status.

##### Functions
- authenticateUser: Checks if the user is authenticated by verifying the token stored in local storage. If the token is valid, it sets the user, isLoading, and isLoggedIn states accordingly.
- logout: Clears the user and token from local storage, and sets isLoggedIn to false.

##### States
- user: The current authenticated user's information.
- isLoading: A boolean indicating whether the authentication process is in progress.
- isLoggedIn: A boolean indicating whether the user is currently authenticated.

## Server / Backend

### Models

#### User Model

The User model represents users of the application. It has the following fields:

- **name**: User's name.
- **email**: User's email address (unique).
- **password**: Hashed user password.
- **house**: An array of references to Home documents.
- **cat**: An array of references to Cat documents.
- **articles**: An array of references to Article documents.
- **comments**: An array of references to Comment documents.
- **travel**: An array of references to Travel documents.
- **createdAt** and **updatedAt**: Automatic timestamps.

#### Cat Model

The Cat model represents cats available for adoption. It includes the following fields:

- **name**: Cat's name.
- **description**: Description of the cat.
- **image**: URL of the cat's image.
- **Owner**: Reference to the User who owns the cat.
- **createdAt** and **updatedAt**: Automatic timestamps.

#### Comment Model

The Comment model stores comments made by users. It contains:

- **title**: Title of the comment.
- **information**: Content of the comment.
- **month**: Month of the comment (optional).
- **year**: Year of the comment (optional).
- **author**: Name of the comment author.
- **receptor**: Name of the comment receptor.
- **createdAt** and **updatedAt**: Automatic timestamps.

#### Home Model

The Home model represents homes of users. It has the following fields:

- **name**: Name of the home.
- **location**: Location of the home.
- **description**: Description of the home.
- **photo**: URL of a photo of the home.
- **Owner**: Reference to the User who owns the home.
- **createdAt** and **updatedAt**: Automatic timestamps.

#### Article Model

The Article model represents articles posted by users. It includes:

- **title**: Title of the article (unique).
- **information**: Content of the article.
- **month**: Month of the article (optional).
- **year**: Year of the article (optional).
- **author**: Name of the article author.
- **image**: URL of an image for the article.
- **createdAt** and **updatedAt**: Automatic timestamps.

### API Endpoints (Backend Routes)

| HTTP Method | URL                     | Request Body              | Success Status | Error Status | Description                                      |
|-------------|-------------------------|---------------------------|----------------|--------------|--------------------------------------------------|
| GET         | /cats                   | -                         | 200            | 500          | Fetch all cats                                  |
| GET         | /cats/:id               | -                         | 200            | 500          | Fetch details of a specific cat                 |
| POST        | /cats/:id/adopt         | { payload }               | 201            | 500          | Adopt a cat                                     |
| POST        | /cats                   | { payload }               | 201            | 500          | Add a new cat for adoption                      |
| PUT         | /cats/:id               | { payload }               | 202            | 500          | Update a cat's information                      |
| DELETE      | /cats/:id               | -                         | 202            | 500          | Delete a cat                                    |
| GET         | /auth/profile           | -                         | 200            | 404          | Check if user is logged in and return profile   |
| POST        | /auth/signup            | { name, email, password } | 201            | 500          | Create a new user                               |
| POST        | /auth/login             | { username, password }    | 202            | 401          | Authenticate user and provide JWT token          |
| POST        | /auth/logout            | -                         | 204            | 400          | Log out the user                                |
| GET         | /auth/verify            | -                         | 200            | 401          | Verify JWT token and return user information    |
| GET         | /auth/:id               | -                         | 200            | 500          | Fetch user details                              |
| POST        | /homes                  | { payload }               | 201            | 500          | Create a new home                               |
| GET         | /homes                  | -                         | 200            | 500          | Fetch all homes                                 |
| GET         | /homes/:id              | -                         | 200            | 500          | Fetch details of a specific home                |
| PUT         | /homes/:id              | { payload }               | 202            | 500          | Update a home's information                     |
| DELETE      | /homes/:id              | -                         | 202            | 500          | Delete a home                                   |
| POST        | /comments/:id           | { payload }               | 201            | 500          | Add a new comment                               |
| GET         | /comments/:id           | -                         | 200            | 500          | Fetch all comments related to a specific article|
| GET         | /comments/info/:id      | -                         | 200            | 500          | Fetch details of a specific comment             |
| DELETE      | /comments/delete/:id    | -                         | 202            | 500          | Delete a comment                                |
| GET         | /:id                    | -                         | 200            | 500          | Fetch user details                              |

## Links

### Trello/Kanban

[Trello board](https://trello.com/b/W1uU4gwI/purrfect-pawtners)
### Git

[Client repository Link](https://github.com/AleGarAlon/Proyect3-front) <br>
[Server repository Link](https://github.com/AleGarAlon/Proyect3-back) <br>
[Deploy Link](https://legendary-tanuki-442740.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1qJIOh0WGaxj8EA_32cAlyESbN7j-B9uU3KbZKPcF3Ak/edit#slide=id.g193b26f510_0_0)
