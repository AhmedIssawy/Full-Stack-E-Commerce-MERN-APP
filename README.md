- [Video for clarifying](https://drive.google.com/file/d/1yxQb-9KpTvIgudCj7gLD2PHKdQd6P6sQ/view?usp=sharing)
- [POST MAN LINK](https://ai7777-7249.postman.co/workspace/E-Commerce~0ef9f903-b1d6-4345-adbc-e25c660a2208/collection/39355421-256af78b-2f60-4fef-a517-749934029e3e?action=share&creator=39355421)

# 🛒 MERN E-commerce Platform

A full-stack e-commerce web application built with the MERN stack. It offers a seamless shopping experience with full inventory management, secure authentication, and support for PayPal and bank payments. 

## ✨ Features 

- 🛍️ Product browsing and search
- 🛒 Shopping cart with quantity adjustments
- 👤 User authentication (JWT, cookies)
- 🔐 Role-Based Access Control (RBAC) for admin/user
- 📦 Inventory management for admins
- 💳 PayPal and bank payment integration
- 🧾 Order tracking and history
- ⚡ Caching for improved performance
- 📱 Responsive UI with Tailwind CSS + Setup for DaisyUI
- 🔄 Redux Toolkit for state management
- 🧠 Backend built with Express & Node.js
- 🗃️ MongoDB for data persistence
- 🛡️ Security best practices: Helmet, CORS, rate limiting, etc.
- ☁️ Image upload with Multer
- 🔐 Protected routes & authorization

# 🛠️ Tech Stack

**Frontend**  
- React  
- Tailwind CSS  
- DaisyUI  
- Redux Toolkit  

**Backend**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT, Cookies  
- Multer


## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd Full-Stack-E-Commerce-MERN-APP
```

# 2. Set Up Environment Variables
Create a .env file in both /frontend and /backend with your configuration like:
# Example for backend
```bash
PORT=5000
NODE_ENV=development
DATABASE_URL=your_mongo_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
PAYPAL_CLIENT_ID=your_paypal_id
REDIS_URL=redis://localhost:6379
```
# Do this env for front end
```bash
NODE_ENV=development
```

# 3. Install Dependencies
Using docker 
```bash
  docker-compose up
```

Using npm
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
cd ..
npm install
npm run dev
```

# 📸 Screenshots
## Admin Dashboard
![image](https://github.com/user-attachments/assets/ad0e4eb8-c5c3-49a2-83c4-9e97efdd8c2b)

## Home page
![image](https://github.com/user-attachments/assets/d0856f79-d856-4074-a274-b649578ebe55)

## Login page
![image](https://github.com/user-attachments/assets/a8f8ea3e-e928-4769-bd57-1fb7ca306f43)

## Orders page
![image](https://github.com/user-attachments/assets/72356e65-58c0-493d-859a-ec5f4f5ee214)

## Reviews and suggestions
![image](https://github.com/user-attachments/assets/45d44788-fa24-43d2-a8bd-086cc1e17ec6)


And more... [Video for clarifying](https://drive.google.com/file/d/1yxQb-9KpTvIgudCj7gLD2PHKdQd6P6sQ/view?usp=sharing)

## Suggestions
- Add stripe its already configured for it
- Mobile app version (React Native)
- Real-time order status updates with WebSockets

👨‍💻 Author
- Ahmed Issawy
- 📍 Cairo, Egypt
- 🔗 [LinkedIn](https://www.linkedin.com/in/ahmed-issawy-53b29528b/)

📄 License
U can use the project for any thing
