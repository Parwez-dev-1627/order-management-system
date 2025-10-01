# Order Management System 🛒

A full-stack application for managing orders with real-time dashboard visualization.  
Built using **.NET 8 Web API**, **React + TypeScript**, and **PostgreSQL**.  

## 🚀 Features
- Create, update, delete, and view orders
- Order status tracking (New, Pending, Cancelled, Completed)
- Dashboard with charts (orders by status, daily trends)
- JWT-based authentication & role-based access (Admin/User)
- Unit & integration tests
- Dockerized for local and cloud deployment
- CI/CD pipeline with GitHub Actions

## 🛠 Tech Stack
- **Backend:** .NET 8 Web API, EF Core
- **Frontend:** React + TypeScript, TailwindCSS/Material UI
- **Database:** PostgreSQL
- **DevOps:** Docker, GitHub Actions, Azure DevOps
- **Testing:** xUnit, Moq, Jest

## 📂 Project Structure
/backend -> .NET 8 Web API
/frontend -> React + TypeScript app
/db -> Migrations, seed data


## ⚡ Getting Started
Clone the repo:
```bash
git clone https://github.com/Parwez-dev-1627/order-management-system.git
cd order-management-system
```


Run with Docker Compose:
docker-compose up --build

Backend: http://localhost:5000

Frontend: http://localhost:3000

✅ Testing

Backend tests:
cd backend
dotnet test

Frontend tests:
cd frontend
npm test

📊 Roadmap

 Add user authentication

 Add role-based access (Admin/User)

 Add notifications (SignalR/WebSocket)

 Deploy to Azure App Service

📸 Screenshots

<img width="1562" height="831" alt="image" src="https://github.com/user-attachments/assets/eed145cb-b57d-4ae8-a169-3918743a0bb3" />


🤝 Contributing

Feel free to fork, raise issues, or submit PRs.

📜 License

MIT
