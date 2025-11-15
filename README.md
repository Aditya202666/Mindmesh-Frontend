# MindMesh Frontend

**MindMesh** is a simple yet powerful personal task management web app built using the **MERN stack** (MongoDB, Express, React, Node.js). This frontend, designed in React, features a sticky-note-inspired interface using soft pastel colors. It helps individuals manage their daily tasks visually and efficiently.

---

## 🔐 Test Credentials

* **Username**: `user1`
* **Password**: `123123123`
* **Live**: https://mindmesh-frontend.onrender.com/
---

## 📌 Key Features

### 🔑 Authentication

* Register and login functionality
* Email-based **2FA (OTP)** during login
* Forgot password flow with email verification

### 🗂 Project & Task Management

* Create and manage **projects** to categorize tasks
* Tasks support:

  * Title and Description
  * Due Date
  * Status (Pending, In Progress, Completed)
  * Priority (Low, Medium, High, Normal)
  * Colored backgrounds using **7 soft pastel shades** to reflect priority

### ✅ Subtasks

* Add subtasks to main tasks
* View completion count (e.g., 2/4 subtasks done) directly on the task card

### 📊 Overview Dashboard

* Displays top 5 tasks in the following categories:

  * **Overdue**
  * **Recently Added**
  * **Due in 7 Days**
  * **In Progress**
* Quick access to urgent and ongoing work

### 📁 Task Tabs

* View tasks grouped by status:

  * **Pending**
  * **In Progress**
  * **Completed**
  * **Overdue**
  * **All Tasks**

### 🔎 Filters & Search

* Filter tasks by **date range**
* Search tasks by **title** or **description** in real-time

---

## 🚧 Work in Progress

* Profile page UI and logic
* Mobile responsiveness and mobile-first layout improvements
* Real-time updates (Socket.io) – not yet implemented
* Team collaboration support – future roadmap

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Add YourFeature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

Feel free to explore, use, and contribute. For bugs or suggestions, open an issue on GitHub.
