# Admission Management & CRM System

*Overview*

This project is a web-based Admission Management system designed for colleges to manage the complete admission lifecycle. It allows administrators to configure academic structures, admission officers to process applicants, and management to monitor admission progress through dashboards.

The system ensures strict seat allocation rules, quota validation, and a simple but structured admission workflow.

---

*Features*

* Master Setup (Admin)
  - Create Institution, Campus, Department
  - Configure Programs and Academic Year
  - Define Course Type (UG/PG), Entry Type, Admission Mode
  - Set total intake and quota distribution

* Applicant Management (Admission Officer)
  - Create and manage applicants
  - Capture basic applicant details (limited fields)
  - Track document status (Pending / Submitted / Verified)

* Seat Allocation
  - Allocate seats based on quota (KCET, COMEDK, Management)
  - Prevent over-allocation beyond quota limits
  - Real-time validation of seat availability

* Admission Confirmation
  - Generate unique admission numbers
  - Ensure admission only after fee payment
  - Maintain immutable admission records

* Fee Tracking
  - Track payment status (Pending / Paid)
  - Restrict confirmation until fee is paid

* Dashboard (Management)
  - Total intake vs admitted count
  - Quota-wise seat utilization
  - Remaining seats
  - Pending documents and fees

---

*User Roles*

* Admin
  - Configure system setup
  - Define programs and quotas

* Admission Officer
  - Create applicants
  - Allocate seats
  - Verify documents
  - Confirm admissions

* Management
  - View dashboard and reports (read-only access)

---

*Tech Stack*

* Frontend
  - React.js
  - Material UI

* Backend
  - Node.js
  - Express.js

* Database
  - MongoDB

---

*Installation*

*Backend Setup*

1. Navigate to backend folder
2. Install dependencies
   npm install
3. Create .env file
   MONGO_URI=your_mongodb_connection
   PORT=5000
4. Start server
   npx nodemon server.js

*Frontend Setup*

1. Navigate to frontend folder
2. Install dependencies
   npm install
3. Start application
   npm start

---

*System Rules*

* Quota seats must not exceed total intake
* Seat allocation blocked when quota is full
* Admission number generated only once
* Admission confirmed only after fee payment
* Seat counters update dynamically

---

*Future Improvements*

* Authentication with JWT
* Role-based access control (backend)
* Advanced reporting and analytics
* Multi-institution support
* Payment gateway integration

---

*Author*

Kishore R

Developed as part of an Admission ERP system to demonstrate full-stack development using React, Node.js, and MongoDB.
