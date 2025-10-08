TravelMate — Ticket Booking System with Payments

Project Overview

TravelMate is a web-based travel booking platform that allows users to search and book flights and hotels, make secure payments, and track upcoming trips in one unified dashboard. It is designed to simplify travel planning by combining multiple functionalities into a single, intuitive interface.

Key Features:

User registration and login with JWT authentication

Search flights and hotels by location and date

Book flights or hotels with availability checks

Secure payment simulation for bookings

Dashboard showing upcoming trips, booking history, and trends

Profile management with user preferences



---

Technology Stack

Backend: Node.js, Express, MongoDB (Mongoose)

Frontend: React.js, Tailwind CSS

Charts: Recharts for dashboard visualizations

Authentication: JWT (access + refresh tokens)

Payment: Mock or sandbox integration for demo

Hosting/Deployment: Vercel (frontend), Heroku / Railway (backend)



---

Project Structure

TravelMate/
├─ backend/
│  ├─ controllers/       # Business logic for auth, flights, hotels, bookings, payments
│  ├─ models/            # MongoDB schemas
│  ├─ routes/            # API endpoints
│  ├─ seedDemoData.js    # Script to populate demo data
│  ├─ app.js
│  ├─ server.js
│  └─ package.json
│
├─ frontend/
│  ├─ src/
│  │   ├─ api/           # Axios setup
│  │   ├─ components/    # Navbar, cards, forms
│  │   ├─ pages/         # Login, Register, Flights, Hotels, Dashboard, Bookings, Profile
│  │   ├─ App.js
│  │   └─ index.js
│  ├─ public/
│  ├─ tailwind.config.js
│  └─ package.json
│
└─ README.md


---

Setup & Installation

Backend

1. Navigate to backend folder:



cd backend

2. Install dependencies:



npm install

3. Configure environment variables:



cp .env.example .env

Fill in MONGO_URI, JWT_SECRET, and other keys.
4. Seed demo data:

npm run seed

5. Start backend server:



npm run dev

Frontend

1. Navigate to frontend folder:



cd frontend

2. Install dependencies:



npm install

3. Start React development server:



npm start


---

API Endpoints

Endpoint	Method	Description

/api/auth/register	POST	Register new user
/api/auth/login	POST	Login existing user
/api/auth/refresh	POST	Refresh access token
/api/auth/logout	POST	Logout user
/api/flights	GET	Search available flights
/api/hotels	GET	Search available hotels
/api/bookings	POST	Create a booking (flight/hotel)
/api/bookings	GET	List user bookings
/api/payments	POST	Make payment for booking


Sample Booking Request

{
  "type": "flight",
  "itemId": "64f8f9dbe4b0a2a12345abcd",
  "nights": 0
}

Sample Booking Response

{
  "booking": {
    "_id": "64f90012e4b0a2a12345abcd",
    "userId": "64f8f8f4e4b0a2a12345abcd",
    "type": "flight",
    "itemId": "64f8f9dbe4b0a2a12345abcd",
    "totalPrice": 300,
    "status": "Pending"
  }
}


---

Frontend Flow

1. Login / Register → JWT issued and stored in localStorage


2. Dashboard → Shows upcoming trips and booking summary


3. Search Flights / Hotels → Filter by date/location


4. Booking → Select item, calculate total price


5. Payment → Complete booking with simulated payment


6. Booking History → View past and upcoming bookings




---

Seed Demo Accounts

Email: demo@travel.com

Password: demo123


(Use these to quickly test login and demo features.)


---

Future Enhancements

Integration with real flight/hotel APIs

AI-based travel recommendations

Real-time payment gateway integration (Stripe/PayPal)

Mobile app using React Native for on-the-go bookings

Map visualization for hotels and destinations



---

Contribution

Fork the repo

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add new feature')

Push to branch (git push origin feature-name)

Open a Pull Request



---

License

This project is open-source and free to use for educational and hackathon purposes.
