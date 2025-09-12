# TodoApp Backend

This is the Spring Boot backend for the TodoApp project. It provides RESTful APIs for todo management and user authentication, and connects to a MariaDB database.

---

## Features
- User registration and login (JWT-based authentication)
- CRUD operations for todos
- Secure endpoints
- CORS configuration for frontend integration

---

## Getting Started (Local Development)

1. Install Java 17+ and Maven.
2. Set up MariaDB (or MySQL) and create a database named `todo_app`.
3. Update `src/main/resources/application.properties` with your database credentials if needed.
4. Build the backend:
   ```bash
   mvn clean package
   ```
5. Run the backend:
   ```bash
   java -jar target/todo-backend-0.0.1-SNAPSHOT.jar
   ```

---

## Containerization & Collaboration

This backend is fully containerized using Docker. Collaborators can run the backend in a consistent environment:

### Build and Run with Docker
```bash
docker build -t todo-backend .
docker run -p 8080:8080 todo-backend
```
Or use Docker Compose for full-stack orchestration:
```bash
docker-compose up --build
```

### How Containerization Helps
- Ensures all collaborators use the same Java version and dependencies
- No need to install Java or Maven locally
- Easy to deploy to cloud or other machines

---

## Project Structure
- `src/` - Java source code
- `resources/` - Configuration files
- `Dockerfile` - Container build instructions
- `README.md` - This documentation

---

## License

This project is open-source and available under the MIT License.
