# 🧠 Log Manager - Fullstack App

A fullstack log management system built with:

- 🌐 **Frontend:** Next.js (TypeScript, Tailwind CSS, App Router)
- 🔧 **Backend:** Node.js, Express, MongoDB, JWT Auth
- 🐳 **Deployment:** Docker + Docker Compose

---

## 🏗️ Project Architecture

## ⚙️ Technologies Used

| Layer      | Stack                                     |
|------------|--------------------------------------------|
| Frontend   | Next.js, React, Tailwind CSS, TypeScript   |
| Backend    | Node.js, Express, MongoDB, JWT             |
| Database   | MongoDB (local or Docker container)        |
| Auth       | JWT-based authentication (cookie-based)    |
| DevOps     | Docker, Docker Compose                     |

---

## 🚀 Getting Started

### 🧪 1. Clone the repository

```bash
git clone https://github.com/Vidul-Verma/log-manager.git
cd log-manager

### 🧪 2. Run docker compose
Install docker 
https://www.docker.com/products/docker-desktop/

docker-compose build --no-cach
docker-compose up


### 🧪 3. Run frontend from browser using 
http://localhost:3000/

Go to http://localhost:3000/login and register a new user
Once registered you will be redirected to add logs for current user. Use same password to login later or create new user to add/update/delete logs.

Postman can be used to http://localhost:4000/ to hit server urls for nodejs after running the app

