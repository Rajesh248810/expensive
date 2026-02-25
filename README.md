# Expensive - AI-Powered Expense Tracker

"Expensive" is a modern, full-stack expense tracking application designed to help users manage their finances with ease and security. Built with a robust Django backend and a dynamic React frontend, it features interactive visualizations and end-to-end encryption for sensitive data.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login system.
- **Dynamic Dashboard**: Real-time insights into spending habits with interactive charts using Recharts.
- **Transaction Management**: Easily record, view, and categorize income and expenses.
- **Category Customization**: Organize transactions with user-defined categories.
- **Data Security**: Sensitive transaction descriptions are encrypted in the database using Fernet symmetric encryption.
- **Responsive Design**: Sleek UI built with Tailwind CSS, optimized for all devices.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**: Fast and modern frontend framework.
- **Tailwind CSS**: Utility-first CSS for premium styling.
- **Recharts**: For data visualization and analytics.
- **Lucide React & React Icons**: For high-quality iconography.
- **Axios**: For seamless API communication.

### Backend
- **Django**: High-level Python web framework.
- **Django REST Framework**: For building robust APIs.
- **Cryptography (Fernet)**: For secure data encryption.
- **PostgreSQL**: Reliable relational database.

## ⚙️ Getting Started

### Prerequisites
- Python 3.10+
- Node.js & npm

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers cryptography python-dotenv
   ```
4. Configure environment variables in `.env`:
   ```env
   ENCRYPTION_KEY=your_fernet_key_here
   DEBUG=True
   SECRET_KEY=your_django_secret_key
   ```
5. Run migrations and start the server:
   ```bash
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
expense tracker/
├── backend/            # Django API and Logic
│   ├── api/            # App endpoints and encryption
│   └── backend/        # Project settings
├── frontend/           # React Application
│   ├── src/            # Components, pages, and hooks
│   └── public/         # Static assets
└── README.md           # Project documentation
```

## 🔒 Security Note
The application uses the `cryptography` library to encrypt transaction descriptions. Ensure your `ENCRYPTION_KEY` is kept secure and never committed to version control.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
