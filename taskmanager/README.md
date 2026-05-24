# Task Manager Backend

Backend desarrollado con Java y Spring Boot para la gestión de tareas mediante una API RESTful.

## Tecnologías utilizadas

- Java 17
- Spring Boot
- PostgreSQL
- Maven
- Spring Data JPA

---

## Arquitectura

El proyecto implementa:

- Arquitectura MVC
- Repository Pattern
- Validaciones de datos
- Manejo de errores
- API RESTful

---

## Configuración

Crear previamente la base de datos PostgreSQL:

```sql
CREATE DATABASE task_manager_db;
````

### Configurar las siguientes variables de entorno:

```sql
DB_URL=jdbc:postgresql://localhost:5432/task_manager_db
DB_USERNAME=postgres
DB_PASSWORD=your_password
Ejecutar proyecto
mvn spring-boot:run
````

### Backend disponible en:

http://localhost:8081

### Swagger disponible en:

http://localhost:8081/swagger-ui/index.html

```sql
Endpoints principales
GET /tasks
POST /tasks
PUT /tasks/{id}
DELETE /tasks/{id}
````