# RunAlliance Backend

## Introduction

RunAlliance Backend is a Spring Boot-based REST API that powers the A2RunAlliance web application. This project was developed to meet the needs of the A2 Running association, founded by Alice and Anne, which brings together running enthusiasts in Bordeaux. The goal is to provide a modern platform to efficiently manage running events, register users for sessions, and track their performance.

This application is part of the certification process for the professional title "Application Developer Designer" and aims to offer an intuitive and secure solution for association members. It replaces the current WordPress-based site, which only allows static content publication.

## Key Features

- **Authentication & Authorization** using JWT
- **Complete user management** (registration, login, profile updates, roles)
- **Full CRUD operations** for races and registrations
- **API security** with Spring Security and role management (admin/user)
- **Email notifications** for race registrations
- **Integration with MySQL database**
- **Monitoring & health checks** with Spring Boot Actuator

## Versions Used

- **Java**: 21
- **Spring Boot**: 3.x
- **Spring Security**: 6.x
- **JWT**: jjwt 0.11.5
- **Database**: MySQL 8.x
- **Maven**: 3.x
- **Docker**: 20.x with Docker Compose

## Installation

### Prerequisites

- Java 21
- Maven
- Docker & Docker Compose

### Installation Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/RunAlliance-back.git
   cd RunAlliance-back
   ```
2. Build the application:
   ```sh
   mvn clean package
   ```
3. Run with Docker:
   ```sh
   docker-compose up --build
   ```
4. The API will be available at `http://localhost:8080`

## Configuration

### Environment Variables

- `SPRING_DATASOURCE_URL` - Database URL
- `SPRING_DATASOURCE_USERNAME` - Database username
- `SPRING_DATASOURCE_PASSWORD` - Database password
- `SECURITY_JWT_SECRET_KEY` - Secret key used to sign JWT tokens

## Security & JWT Management

The application uses **Spring Security** for authentication and access control.

### How JWT Works

1. **Token Generation**: When a user logs in, a JWT token is generated using the secret key (`SECURITY_JWT_SECRET_KEY`).
2. **Client-Side Storage**: The token is stored client-side (e.g., `localStorage` or `sessionStorage`).
3. **Token Validation**: The token is sent in the `Authorization` header with each request and validated server-side.
4. **Expiration & Refresh**: Tokens have a limited lifespan. A future implementation may include a refresh token mechanism.

## API Endpoints

| Method | Endpoint                                  | Description              | Access      |
|--------|------------------------------------------|--------------------------|-------------|
| POST   | `/api/auth/login`                       | Authenticate a user      | Public      |
| GET    | `/api/auth/me`                          | Retrieve current user info | User/Admin |
| GET    | `/api/runs`                             | Retrieve all races       | Public      |
| POST   | `/api/runs`                             | Create a new race        | Admin       |
| DELETE | `/api/runs/{id}`                        | Delete a race            | Admin       |
| POST   | `/api/registrations/register/{raceId}`  | Register for a race      | User        |
| DELETE | `/api/registrations/unregister/{raceId}`| Unregister from a race   | User        |

## Running Tests

Run unit and integration tests:
```sh
mvn test
```

## License

This project is licensed under the MIT License.

