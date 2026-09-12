# Ledger — Task Manager

A full-stack task management app: Java Spring Boot REST API + MySQL (or H2 for
zero-setup local dev) on the backend, React on the frontend.

##Screenshot!(Screenshot.png)

## Features

- Create, read, update, delete tasks
- Priority levels: Low, Medium, High
- Mark tasks complete
- Filter tasks by priority
- Data persisted in a relational database (H2 in dev, MySQL in production)
- Responsive layout (desktop + mobile)
- SetUp Date for Tasks to Finish

## Tech stack

| Layer      | Technology                                |
|------------|--------------------------------------------|
| Backend    | Java 17, Spring Boot 3, Spring Data JPA    |
| Database   | MySQL (production) / H2 (local dev)        |
| Frontend   | React 18, Vite, Axios                      |
| Testing    | JUnit 5, Mockito                           |

## Project structure

```
task-manager/
├── backend/     Spring Boot REST API
└── frontend/    React single-page app
```

## Prerequisites

- Java 17+ (`java -version`)
- Maven 3.9+ (`mvn -version`)
- Node.js 18+ and npm (`node -v`)
- (Optional, for the real database) MySQL 8+

## 1. Run the backend

```bash
cd backend
mvn spring-boot:run
```

By default this runs against an **in-memory H2 database** — nothing to
install, data resets each restart. The API is now live at
`http://localhost:8080/api/tasks`.

To use a real MySQL database instead:

```bash
# 1. Create the database
mysql -u root -p -e "CREATE DATABASE taskmanager;"

# 2. Edit backend/src/main/resources/application-mysql.properties
#    with your MySQL username/password

# 3. Run with the mysql profile active
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

## 2. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## 3. API reference

| Method | Endpoint               | Description             |
|--------|-------------------------|--------------------------|
| GET    | `/api/tasks`             | List all tasks           |
| GET    | `/api/tasks?priority=HIGH` | Filter by priority     |
| GET    | `/api/tasks/{id}`        | Get one task              |
| POST   | `/api/tasks`             | Create a task             |
| PUT    | `/api/tasks/{id}`        | Update a task              |
| DELETE | `/api/tasks/{id}`        | Delete a task               |

Example request body for POST/PUT:

```json
{
  "title": "Write project README",
  "description": "Cover setup and API reference",
  "priority": "HIGH",
  "completed": false
}
```

## 4. Running tests

```bash
cd backend
mvn test
```

## 5. Building for production

```bash
cd frontend && npm run build     # outputs frontend/dist
cd backend && mvn clean package   # outputs backend/target/*.jar
```
