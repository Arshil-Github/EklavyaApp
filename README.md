# Eklavya App: Connecting Students with New Gen Teachers

![image](https://github.com/user-attachments/assets/722c7bb7-93d2-4274-9a4a-25a72053aac6)



## Introduction 
This app bridges the educational gap for underprivileged Indian students by connecting them with volunteer teachers. It features student and teacher portals, where students submit learning requests, matched with teachers based on region and language. Teachers accept requests, triggering confirmation notifications. After teaching, both parties provide feedback, contributing to a global leaderboard ranking teachers. Students can also access and request top-rated teachers for a small fee, incentivizing educators. The platform supports multilingual access, fosters inclusive education, and promotes affordable, quality learning opportunities, driving impact in underserved communities while encouraging teacher engagement through recognition and rewards.

## Features
- Student and Teacher Portals
  - Dedicated interfaces for students to submit learning requests and teachers to manage and accept requests.
- Smart Matching System
  - Matches students with teachers based on region, language, and availability for efficient connections.
- Feedback and Leaderboard
  - Post-session feedback drives a global leaderboard showcasing top-performing teachers, enhancing visibility and motivation.
- Top-Rated Teacher Requests
  - Students can request highly-rated teachers nearby for a small fee, incentivizing educator participation.
 
## Frontend

This repository contains the frontend for the Education Bridge App, developed using React Native with Expo and Expo Router. The app aims to connect underprivileged Indian students with volunteer teachers, promoting accessible and affordable education.

### Features
- Get Started Page
  - Initial onboarding screen to introduce users to the app and guide them to sign up or log in.

- Authentication
  - Sign-In Page: For new users to register.
  - Login Page: For existing users to log in securely.

- Student Portal
  - Student Requests: View and manage all active learning requests.
  - Create Requests: Submit new learning requests with region and language preferences.

- My Mentors: View connected teachers and feedback history.

- Teacher Portal
  - All Requests: View and accept student learning requests.
  - My Students: Manage students connected with the teacher.
  - Leaderboard: View the top-rated teachers globally and regionally.

- Technology Stack
  - Framework: React Native
  - Navigation: Expo Router
  - Development Environment: Expo


![image](https://github.com/user-attachments/assets/47af25b9-a6d9-48f9-8a0c-ec7f01ec7a21)
![image](https://github.com/user-attachments/assets/a42e428e-910f-4439-8f71-72eef46bd084)
![image](https://github.com/user-attachments/assets/07ea1b0d-5b4e-4e85-8a3f-afc8811b7fd8)


## Backend
This repository contains the backend for the Education Bridge App, developed using MongoDB and Express. The backend supports the app's functionality by managing databases, handling API requests, and ensuring smooth communication between the frontend and the database.

### Features
**Database Architecture**

- studentdb: Stores information about students, including profiles and ratings.
- teacherdb: Stores teacher profiles, ratings, and leaderboard details.
- questsdb: Manages student learning requests and their statuses.

**API Endpoints**

_Authentication:_
- POST /studentsignin - Register new students.
- POST /teachersignin - Register new teachers.
- POST /login - Authenticate existing users (students/teachers).

_Requests Management:_
- POST /createrequest - Submit a new learning request.
- GET /getallavailablerequests - Fetch all pending requests for teachers.
- PUT /updaterequests - Update request details or status.
- PUT /acceptRequest - Allow teachers to accept a specific request.

_Rating Updates:_
- PUT /updatestudentrating - Update student feedback score.
- PUT /updateteacherrating - Update teacher ratings based on feedback.

_User Information:_
- GET /getstudentinfo - Retrieve detailed information about a specific student.

![image](https://github.com/user-attachments/assets/12e5496e-a2ac-4d98-9ac1-d344bc29cd00)


### Technology Stack
- Backend Framework: Express.js
- Database: MongoDB
- FrontEnd: React Nativev
