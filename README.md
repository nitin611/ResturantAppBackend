# 🍽️ Restaurant Application Backend

Welcome to the **Restaurant Application Backend**! This project is a robust backend solution built with **Node.js**, **Express.js**, and **MongoDB** to manage restaurant operations, including user authentication, menu management, and order processing.

---

## 🚀 Features  
- 🔒 **User Authentication & Authorization**  
  - JWT-based authentication for secure login.
  - Role-based access for admins and users.  
- 📂 **CRUD Operations**  
  - Manage restaurants, menu items, and orders with full CRUD functionality.  
- 🛠️ **Admin Dashboard**  
  - Admins can add, update, and delete restaurants and menu items.  
  - Update order statuses and track user activity.  
- 🛒 **User Features**  
  - Browse restaurant menus, add items to cart, and place orders.  
  - View order history and track order statuses.  
- 🛡️ **Secure & Scalable**  
  - Input validation and middleware for secure data handling.  
  - Scalable design with MongoDB for structured data management.  

---

## 🛠️ Tech Stack  
- **Backend:**  
  - [Node.js](https://nodejs.org/)  
  - [Express.js](https://expressjs.com/)  
- **Database:**  
  - [MongoDB](https://www.mongodb.com/)  
- **Authentication:**  
  - [JSON Web Tokens (JWT)](https://jwt.io/)  
- **Validation:**  
  - [Mongoose](https://mongoosejs.com/)  

---

## 📁 Project Structure  

## 🛣️ API Endpoints  

### 🔐 Authentication  
- `POST /api/auth/register` - Register a new user.  
- `POST /api/auth/login` - Login user.  

### 🍴 Restaurants (Admin Only)  
- `POST /api/restaurants` - Add a new restaurant.  
- `GET /api/restaurants` - View all restaurants.  
- `PUT /api/restaurants/:id` - Update restaurant details.  
- `DELETE /api/restaurants/:id` - Delete a restaurant.  

### 📋 Menus (Admin Only)  
- `POST /api/restaurants/:id/menu` - Add a menu item.  
- `GET /api/restaurants/:id/menu` - View all menu items.  
- `PUT /api/restaurants/:id/menu/:itemId` - Update menu item.  
- `DELETE /api/restaurants/:id/menu/:itemId` - Delete menu item.  

### 🛒 Orders  
- `POST /api/orders` - Place a new order.  
- `GET /api/orders` - View all orders for a user.  
- `PUT /api/orders/:orderId` - Update order status (Admin Only).  

---

## 💻 Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/nitin611/ResturantAppBackend.git
   cd restaurant-app-backend




