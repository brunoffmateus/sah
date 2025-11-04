# SAH — Quick Hospital/Healthcare System

Just a quick project. Nothing too serious — mainly to mess around with **React**, **PostgreSQL**, and **Docker**.

The idea is to simulate a simple **hospital/healthcare management system**, just to explore full-stack concepts, containers, and database integrations.

## Purpose
A simple hospital/healthcare management system built to practice React, Node.js, PostgreSQL, and Docker. The goal is mainly to explore full-stack best practices, authentication, CRUD operations, and containerized deployment.

The project simulates a small-scale hospital platform where:

- Patients can register and manage their data
- Doctors can log in and create/view appointments
- The app ensures secure access and clean database relations.

## Stack
- **Frontend:** React + React Router DOM
- **Backend:** Node.js + Express + Sequelize ORM
- **Database:** PostgreSQL  
- **Containerization:** Docker & Docker Compose  

## Quick Start
Clone the repo:
```bash
git clone https://github.com/brunoffmateus/sah.git
cd sah
```
Start the backend:
```bash
cd backend
npm install
npm run dev
```
Start the frontend:
```bash
cd ../frontend
npm install
npm start
```
### Docker
If Docker is installed, run:
```bash
docker compose up --build
```
That will:
- Start a PostgreSQL container
- Start the backend container
- Start the frontend container

Access:
- Frontend → http://localhost:3000
- Backend API → http://localhost:5000


## Future Work
Not sure if or when I'll finish it :)