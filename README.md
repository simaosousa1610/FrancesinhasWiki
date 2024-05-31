
# Project Title

## Overview
This project consists of a backend service and a frontend application. The backend is a Python-based API, and the frontend is a React-based web application. The project uses Docker to containerize both services for easy setup and deployment.

## Project Structure
```
.
├── .gitignore
├── backend/
│   ├── app.py
│   ├── Dockerfile
│   ├── populate.py
│   └── requirements.txt
├── docker-compose.yml
├── frontend/
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   └── src/
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── Modal.css
│       ├── Modal.js
│       ├── reportWebVitals.js
│       └── setupTests.js
├── README.md
└── requirements.txt
```

## Setup and Run the Project

### Prerequisites
- Docker
- Docker Compose

### Backend

1. Navigate to the backend directory:
    ```bash
    cd backend
    ```

2. Build the Docker image:
    ```bash
    docker build -t backend-image .
    ```

3. Run the Docker container:
    ```bash
    docker run -d -p 5000:5000 backend-image
    ```

### Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Build the Docker image:
    ```bash
    docker build -t frontend-image .
    ```

3. Run the Docker container:
    ```bash
    docker run -d -p 3000:3000 frontend-image
    ```

### Using Docker Compose

To simplify the process, you can use Docker Compose to build and run both services at once.

1. From the root directory of the project, run:
    ```bash
    docker-compose up --build
    ```

## Important Information
- The backend service will be available at `http://localhost:5000`.
- The frontend application will be available at `http://localhost:3000`.


