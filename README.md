# FrancesinhasWiki

## Overview

FrancesinhasWiki is a web application that provides information about Francesinhas, a famous Portuguese sandwich. The application allows users to view, create, and manage records of Francesinhas, restaurants, and ingredients. It is built using a Flask backend and a React frontend, with MongoDB as the database.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Installation](#installation)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
3. [Usage](#usage)
4. [Docker Setup](#docker-setup)

## Project Structure

.
├── backend/
│ ├── app.py
│ ├── Dockerfile
│ └── requirements.txt
├── docker-compose.yml
├── frontend/
│ ├── Dockerfile
│ ├── package.json
│ ├── public/
│ │ ├── index.html
│ │ ├── manifest.json
│ │ └── robots.txt
│ ├── README.md
│ └── src/
│ ├── App.css
│ ├── App.js
│ ├── App.test.js
│ ├── components/
│ ├── index.css
│ ├── index.js
│ ├── pages/
│ ├── reportWebVitals.js
│ └── setupTests.js
├── README.md
├── requirements.txt



## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Python 3.x
- Node.js and npm
- Docker (optional, for Docker setup)

### Backend Setup

1. Clone the repository:

git clone https://github.com/yourusername/FrancesinhasWiki.git
cd FrancesinhasWiki

2. Create a virtual environment:

python -m venv venv

3. Activate the virtual environment:

    - On Windows:

    venv\Scripts\activate

    - On macOS/Linux:

    source venv/bin/activate


4. Install the required packages:

pip install -r requirements.txt

5. Set up environment variables (refer to the [Environment Variables](#environment-variables) section).

6. Run the backend application:

python backend/app.py

### Frontend Setup

1. Navigate to the frontend directory:

cd frontend

2. Install the required packages:

npm install

3. Run the frontend application:

npm start

## Usage

Provide detailed instructions on how to use your project. You can include examples, screenshots, and explanations of key functionalities. For example:

1. Access the frontend application at `http://localhost:3000`.
2. Interact with the application by navigating through different pages and using the available features.
3. For API interactions, send requests to the backend at `http://localhost:5000`.

## Docker Setup

### Building and Running Containers

1. Ensure Docker is installed and running on your system.

2. Build and run the containers using Docker Compose:


docker-compose up --build


3. The backend will be available at `http://localhost:5000` and the frontend at `http://localhost:3000`.




