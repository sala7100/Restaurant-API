# 🍽️ Restaurant API

**Restaurant API** is a **Node.js + Express + MongoDB** project for managing a restaurant.  
It provides RESTful APIs for managing **meals, orders, and users** with full **authentication and role-based access**.

---

## 🚀 Features
- User registration and login with JWT.
- Add, update, delete, and list meals.
- Create and manage orders linked to meals.
- Role-based access control (Admin / User).
- Auto-create Admin user from environment variables.

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Bcrypt.js
- Multer (for file uploads)

---

## 📂 Project Structure
│── models/ # Mongoose models (Meal, Order, User)
│── routes/ # API routes
│── controllers/ # Business logic controllers
│── utils/ # Utility classes (AppError, etc.)
│── middleware/ # Auth, validation, upload middlewares
│── uploads/ # Meal images
│── server.js # Main entry point


---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/sala7100/Restaurant-API.git
   cd Restaurant-API
