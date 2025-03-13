# Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Create .env File

Create a `.env` file in the project root with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
JWT_SECRET=your_jwt_secret_here
DATABASE_URL="file:./dev.db"
```

## 4. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## 5. Start Backend Server

Run the backend server:

```bash
cd backend
node server.js
```

## 6. Start Next.js Application

Run the frontend:

```bash
cd frontend
npm run dev
```

## 7. Open the App

Visit [http://localhost:3000](http://localhost:3000) in your browser.


