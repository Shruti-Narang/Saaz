Saaz, your friends on one tap.

# 🔊 Saaz – A Walkie-Talkie Web Application

Saaz, your friends on one tap.

**Saaz** is a full-stack walkie-talkie web application that allows friends to connect instantly with just a tap. It integrates frontend, backend, and semantic vector search capabilities for a seamless and responsive user experience. Built with Dockerized services, it’s scalable, modular, and optimized for performance with caching.


## 🧰 Tech Stack

### 🔹 Frontend
- **React.js** – For building a dynamic and responsive user interface.
- **JavaScript** – Core language for frontend logic.
- **Axios** – Handles API requests to the backend.
- **React Toastify** – Provides user-friendly notifications and alerts.

### 🔹 Backend
- **Node.js + Express.js** – Powers the REST API that connects the frontend, vector service, and database.
- **PostgreSQL** – Relational database to store tasks and vector embeddings.
- **Redis** – Used as an in-memory cache for performance optimization.
- **pgvector** – PostgreSQL extension to store and search high-dimensional vectors.

### 🔹 Vector Service
- **Python + Flask** – Microservice that handles text embedding generation.
- **sentence-transformers** – NLP library to convert text into semantically meaningful vector embeddings.
- **pgvector** – Enables fast similarity searches on stored vector data.

### 🔹 DevOps
- **Docker** – Containers for each service to ensure consistency and scalability.
- **Docker Compose** – Simplifies orchestration of all services.
- **.env Configuration** – Stores environment variables securely.

---

## 📁 Project Structure

```

sazz/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── app.js         # Main app logic and routing
│   │   ├── index.js       # Entry point
│   │   ├── cache.js       # Caching logic (Redis)
│   │   └── components/
│   │       ├── taskform.js     # Form to create new task
│   │       ├── tasklist.js     # Displays all tasks
│   │       ├── searchbar.js    # Search for similar tasks
│   │       └── toast.js        # Toast notification wrapper
│   └── Dockerfile
│
├── backend/               # Express backend
│   ├── index.js           # API endpoints and business logic
│   ├── package.json
│   └── Dockerfile
│
├── vector-service/        # Python Flask vector service
│   ├── app.py             # Embedding logic using sentence-transformers
│   ├── requirements.txt
│   └── Dockerfile
│
├── docker-compose.yml     # Compose file for service orchestration
├── .env                   # Environment variables
└── init.sql               # PostgreSQL DB schema and seed

````

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sazz.git
cd sazz
````

### 2. Add Environment Variables

Create a `.env` file in the root directory and include the following:

```
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DB=sazz_db
REDIS_URL=redis://redis:6379
VECTOR_SERVICE_URL=http://vector-service:5000
```

### 3. Start the Application

```bash
docker-compose up --build
```

This will launch:

* Frontend at `http://localhost:3000`
* Backend at `http://localhost:5001`
* Vector service at `http://localhost:5000`
* PostgreSQL and Redis containers

---

## ✨ Features (with Details)

### 🔍 Semantic Search for Tasks

* Users can enter a new task description.
* The backend sends the text to the vector service to generate a vector embedding using **sentence-transformers**.
* This vector is stored in PostgreSQL with **pgvector**.
* When searching, embeddings of query text are compared against stored vectors using cosine similarity.
* The most relevant tasks are returned based on meaning, not exact keywords.

### ⚡ Redis Caching

* To improve speed and reduce server load, frequent semantic queries and results are cached in Redis.
* This allows repeated queries to be answered instantly without recomputation or database access.

### 🧠 Vector Embedding Service

* Python Flask-based microservice using `all-MiniLM-L6-v2` or similar sentence-transformer model.
* Receives text input and returns a high-dimensional vector embedding.
* Ensures the backend remains lightweight and offloads NLP computation.

### 📦 Microservice Architecture

* Each component (frontend, backend, vector service) runs independently in its own Docker container.
* This modularity improves maintainability, testing, and scalability.

### 🚀 Easy Deployment with Docker Compose

* One command (`docker-compose up --build`) sets up the entire environment.
* Ensures all dependencies and configurations are consistent across machines.

### 📬 Real-Time Feedback

* Users get toast notifications on task creation, errors, or search results.
* Provides a smooth and responsive user experience.

---

## 🧪 Sample Workflow

1. User opens the app and enters: “Prepare for data science interview”.
2. The backend sends this text to the vector service.
3. The vector embedding is generated and stored in PostgreSQL.
4. When a similar query like “Interview prep for ML role” is made,
   the app retrieves semantically similar entries using cosine similarity.
5. Results are cached for future searches.

---

## 🧑‍💻 Author

* 👩‍💻 **Shruti Narang**

---

## 📄 License

MIT License – feel free to use and modify.

---



