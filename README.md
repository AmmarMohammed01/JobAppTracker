# Job Application Tracker
## 👔 About
A full-stack application to help users keep track of the jobs they apply to.

## 🖥️ Technologies Used
- Frontend: HTML/CSS/JavaScript
- Backend: Python
    - FastAPI
    - MySQL Connector
- Database: MySQL

## ✨ Features
- Allow user to add/edit/remove a job listing they applied to
- Allow user to set status of job tracker
    - Accepted, Rejected, Interviewing, In-Progress, No Response
- Filter jobs by:
    - Company
    - Job Field: software engineering, computer engineering, eletrical engineering
    - Job Type: full-time, part-time, internship
    - Date Applied
- Allow users to click URL to go directly to job application/status page
- Allow user to save username/password combinations for each of the job application sites

## 🧠 The Process
- Brainstorm functional requirements
- Design the database
- Write the SQL for the database
- Build the core user interface
- Construct the APIs

## 🍀 What I Learned
- I learned about and implemented API authentication for the first time
- How to use FastAPI

## 🚀 How To Run The Project
```bash
source .venv/bin/activate
uvicorn main:app --reload # Starts up the backend to connect to the APIs
# Running on localhost:8000
```

Live Server - VSCode<br>
- Running on localhost:5500
- This is being used to load up the frontend

Database
- Used MySQL Workbench to create and run the database queries
- Populate .env file with the following

```
# For Database Configuration
DB_HOST=127.0.0.1
DB_USER= USERNAME_HERE
DB_PASSWORD= PASSWORD_HERE
DB_NAME=JOB_APP

# For API Authentication
JWT_SECRET_KEY=KEY_HERE
```

<!--
In GitHub Repo About Section:
- Describe the project
- Link to project website
- Tags for technologies used

In Repo README:
- Short Intro
- Technologies Used
- Features (what users can do, keyboard shortcuts)
- The Process (of how it was built)
- What I learned
- How it could be improved
- How to run the project
- Video Demo
-->
