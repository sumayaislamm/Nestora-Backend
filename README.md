# 🏠 Nestora Backend API

A robust backend REST API for a rental property marketplace built with **Node.js**, **Express.js**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**.

Landlords can list and manage rental properties, tenants can request rentals, make payments, and leave reviews, while admins can oversee users, properties, and rental requests.

---

## 🚀 Live API

```

```

---

## 📂 GitHub Repository

```
https://github.com/sumayaislamm/Nestora-Backend
```

---

## 📮 API Documentation (Postman)

```

```

---

# ✨ Features

## Authentication

- Register
- Login
- JWT Authentication
- Role Based Authorization

---

## User

- Get My Profile
- Update My Profile

---

## Categories

- Create Category (Admin)
- Get All Categories
- Update Category
- Delete Category

---

## Properties

- Create Property
- Update Property
- Delete Property
- Get All Properties
- Get Single Property

Supports:

- Search
- Filter
- Pagination
- Sorting

---

## Rental Requests

Tenant can

- Submit Rental Request
- View Own Rental Requests
- View Single Rental Request

Landlord can

- View Rental Requests
- Approve Rental Request
- Reject Rental Request

---

## Payments

- Create Payment
- Confirm Payment
- Payment Status Tracking
- Get My Payments
- Get Single Payment

---

## Reviews

- Create Review
- Get All Reviews

---

## Admin

- Get All Users
- Ban / Unban Users
- Get All Properties
- Get All Rental Requests

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs
- Stripe
- Zod Validation

---

# 📁 Folder Structure

```
src
│
├── app.ts
├── server.ts
│
├── config
├── lib
├── middlewares
├── routes
├── utils
│
├── modules
│   ├── auth
│   ├── user
│   ├── category
│   ├── property
│   ├── rental-request
│   ├── payment
│   └── review
│
└── generated
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/sumayaislamm/Nestora-Backend
```

Move into project

```bash
cd nextora-backend
```

Install dependencies

```bash
npm install
```

Create `.env`

```env
DATABASE_URL=

JWT_SECRET=

JWT_REFRESH_SECRET=

JWT_ACCESS_EXPIRES_IN=

JWT_REFRESH_EXPIRES_IN=

BCRYPT_SALT_ROUNDS=

STRIPE_SECRET_KEY=
```

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Run Development Server

```bash
npm run dev
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## User

| Method | Endpoint |
|---------|----------|
| GET | /api/users/me |
| PATCH | /api/users/my-profile |

---

## Categories

| Method | Endpoint |
|---------|----------|
| POST | /api/categories |
| GET | /api/categories |
| PATCH | /api/categories/:id |
| DELETE | /api/categories/:id |

---

## Properties

| Method | Endpoint |
|---------|----------|
| POST | /api/properties |
| GET | /api/properties |
| GET | /api/properties/:id |
| PATCH | /api/properties/:id |
| DELETE | /api/properties/:id |

---

## Rental Requests

| Method | Endpoint |
|---------|----------|
| POST | /api/rentals |
| GET | /api/rentals |
| GET | /api/rentals/:id |
| GET | /api/landlord/requests |
| PATCH | /api/landlord/requests/:id |

---

## Payments

| Method | Endpoint |
|---------|----------|
| POST | /api/payments/create |
| POST | /api/payments/confirm |
| GET | /api/payments |
| GET | /api/payments/:id |

---

## Reviews

| Method | Endpoint |
|---------|----------|
| POST | /api/reviews |
| GET | /api/reviews |

---

## Admin

| Method | Endpoint |
|---------|----------|
| GET | /api/admin/users |
| PATCH | /api/admin/users/:id |
| GET | /api/admin/properties |
| GET | /api/admin/rentals |

---

# 🔐 Roles

## Tenant

- Browse Properties
- Submit Rental Request
- Make Payment
- View Payments
- Leave Reviews
- Manage Profile

---

## Landlord

- Manage Properties
- View Rental Requests
- Approve / Reject Requests

---

## Admin

- Manage Users
- Ban / Unban Users
- View Properties
- View Rental Requests
- Manage Categories

---

# ✅ Error Handling

The API returns consistent JSON responses.

Example

```json
{
  "success": false,
  "message": "Property not found",
  "errorDetails": {}
}
```

---

# ✅ Validation

Server-side request validation is implemented using **Zod**.

---

# 💳 Payment

Integrated using **Stripe Test Mode**.

Payment flow:

Rental Request

↓

Landlord Approval

↓

Create Payment

↓

Confirm Payment

↓

Rental Activated

↓

Property Status → RENTED

---

# 👤 Admin Credentials

Email

```
admin@rentnest.com
```

Password

```
admin123
```

---

# 👨‍💻 Author

**SUMAYA ISLAM**

GitHub

```
https://github.com/sumayaislamm
```