# A2RunAlliance - Frontend


## Project Overview
A2RunAlliance is a web application designed for running enthusiasts. It allows users to register, participate in running sessions, track their performances, and access exclusive content. The platform is developed for A2 Running, an association founded by Alice and Anne in Bordeaux, which brings together runners of all levels in a friendly and supportive environment.

As a member of the association and a junior developer, I wanted to contribute to this spirit of solidarity by developing an intuitive and secure application that facilitates event organization, performance tracking, and user engagement. This project is also part of my professional certification as an "Application Designer and Developer" (Level 6).

## Technologies Used
- **Frontend Framework**: Angular 18
- **UI Components**: PrimeNG, PrimeIcons, PrimeFlex
- **Charting Library**: Chart.js
- **State Management**: Angular Services
- **Authentication**: JWT (JSON Web Token) with Interceptors
- **Styles**: SCSS

## Features
### 1. User Authentication & Management
- Secure user registration and login with email & password.
- Role-based access control (Admin/User).
- Admin dashboard for managing users (CRUD operations).

### 2. Running Session Management
- Admins can create, update, and delete running events.
- Users can view available running sessions and register for them.

### 3. Performance Tracking
- Users can track their running history.
- Display of key statistics (distance, total duration, average speed) using interactive charts.

### 4. Security & Privacy
- Secure API communication using JWT authentication.
- Data protection mechanisms to ensure user confidentiality.
- Private and public profile settings for users.

### 5. Accessibility & Eco-Responsibility
- Responsive design for an optimal experience on all devices.
- Optimized code for reduced environmental impact.

## Project Structure
```
RunAlliance-front-angularv18/
├── src/
│   ├── app/
│   │   ├── features/  # Main application features
│   │   ├── core/      # Core components & services
│   │   ├── shared/    # Shared modules, guards, and utilities
│   │   ├── layout/    # Application layout components
│   ├── assets/        # Static assets
│   ├── environments/  # Environment configuration files
│   ├── styles.scss    # Global styles
├── angular.json       # Angular project configuration
├── package.json       # Project dependencies & scripts
├── Dockerfile         # Containerization setup
├── docker-compose.yml # Docker Compose configuration
```

## Installation & Setup
### Prerequisites
- Node.js (latest LTS version recommended)
- Angular CLI
- Docker (optional for containerized deployment)

### Local Development
```sh
# Clone the repository
git clone https://github.com/your-repo/RunAlliance-front-angularv18.git
cd RunAlliance-front-angularv18

# Install dependencies
npm install

# Start the development server
npm start
```
Access the app at `http://localhost:4200/`.

### Running with Docker
```sh
# Build and start the frontend container
docker-compose up --build
```

## JWT Authentication Workflow
### 1. User Login
- User submits credentials to `/api/auth/login`.
- Backend returns an **access token** and a **refresh token**.
- Access token is stored in memory and used for authenticated requests.

### 2. Token Interception & Refresh
- HTTP requests include the `Authorization: Bearer <access_token>` header.
- If the token expires, the app automatically requests a new token using the refresh token (`/api/auth/refresh`).
- If refresh fails, the user is logged out and redirected to the login page.

### 3. Logout
- User logs out, and both tokens are cleared from storage.

## Contribution
Contributions are welcome! Feel free to fork the repository, create a feature branch, and submit a pull request.

## License
This project is licensed under the MIT License.

---
Developed with ❤️ for A2 Running. Let's run together! 🏃‍♂️🏃‍♀️
