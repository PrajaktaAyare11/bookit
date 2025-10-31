# 🚗 Highway Delite — Book Your Adventure Experiences  

**A modern, dynamic adventure booking platform built with Next.js, Prisma, and Supabase.**  
Find curated travel experiences, view details, apply promo codes, and confirm bookings seamlessly — all powered by dynamic data.

---

## 🌐 Live Demo  
> 🎯 **Deployed on Railway**  
👉 [View Live Site](https://bookit-production-4e5f.up.railway.app/) 

---

## 🖼️ Project Preview  

### 🏠 Homepage  
Browse and search dynamic experiences from Supabase.  
![Homepage Preview](public/screenshots/homepage.png)

### 📄 Experience Details  
Each experience has its own dynamic `/experiences/[id]` page.  
![Experience Details](public/screenshots/experience-detail.png)

### 💳 Checkout  
Apply promo codes, calculate totals, and confirm bookings.  
![Checkout Page](public/screenshots/checkout.png)

### ✅ Confirmation  
Booking confirmation with unique reference ID.  
![Confirmation Page](public/screenshots/confirmation.png)

---

## ✨ Features  

- ✅ **Dynamic Experiences:** Pulled live from Supabase via Prisma.  
- 🔍 **Smart Search:** Filter by title, description, or location.  
- 📱 **Responsive Design:** Optimized for mobile and desktop.  
- 💰 **Promo Code Validation:** Dynamic discount logic.  
- 💳 **Booking Flow:** Calculates subtotal, taxes, and final total.  
- 🧾 **Confirmation Page:** Shows unique reference ID post-booking.  
- ⚙️ **API Routes:** Modular Next.js API for experiences, bookings, and promos.

---

## 🧠 Tech Stack  

| Category | Technology |
|-----------|-------------|
| **Frontend** | Next.js 14 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS, ShadCN UI |
| **Database** | Supabase (PostgreSQL) |
| **ORM** | Prisma |
| **UX Enhancements** | react-spinners, Sonner (toasts) |
| **Hosting** | Vercel |

---

## ⚙️ Setup Instructions  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/highway-delite.git
cd highway-delite


2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables

Create a .env file in your project root and add:

DATABASE_URL="postgresql://your-user:your-password@your-host:6543/postgres"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

If using Supabase:

DATABASE_URL="postgresql://postgres:yourpassword@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres"

4️⃣ Prisma Setup
Push schema to your database:
npx prisma db push

Generate Prisma client:
npx prisma generate

(Optional) Seed initial data:

If you have a prisma/seed.ts:

npm run seed

5️⃣ Run Development Server
npm run dev

Visit 👉 http://localhost:3000

6️⃣ Build for Production
npm run build
npm start

7️⃣ Deploy on Vercel

To deploy directly from CLI:

vercel

Or connect your GitHub repo via the Vercel Dashboard at https://vercel.com
.
.

📂 Folder Structure
src/
 ├─ app/
 │   ├─ api/
 │   │   ├─ experiences/
 │   │   │   └─ /[id]/route.ts          # Fetch individual experiences
 │   │   │   └─ route.ts               # Fetch all experiences
 │   │   ├─ experiences/[id]/           # Dynamic details API
 │   │   ├─ bookings/route.ts            # Booking API
 │   │   └─ promo/validate/route.ts     # Promo code validation
 │   ├─ experiences/[id]/page.tsx       #Details Page
 │   ├─ confirmation/page.tsx           #Result Page
 │   ├─ checkout/page.tsx               #Checkout Page
 │   ├─ layout.tsx
 │   ├─ page.tsx                  # Homepage
 ├─ components/
 │   ├─ ExperienceCard.tsx
 │   ├─ Header.tsx
 │   ├─ PriceSummary.tsx
 │   └─ ui/                       # ShadCN components
 ├─ prisma/
 │   ├─ schema.prisma
 │   └─ seed.ts
 ├─ public/
 │   ├─ favicon.ico
 │   ├─ logo.png
 │   └─ screenshots/
 ├─ lib/
 │   └─ prisma.ts
 ├─ types/
 │   └─ index.ts
 └─ .env

🧩 Key API Endpoints
Endpoint	Method	Description
/api/experiences	GET	Fetch all experiences
/api/experiences/[id]	GET	Fetch single experience by ID
/api/bookings	POST	Store booking details
/api/promo/validate	POST	Validate promo codes

🧾 For Database Schema go to (prisma/schema.prisma)

💡 Developer Notes

Run Prisma Studio to view/edit data manually:

npx prisma studio


Opens at 👉 http://localhost:5555

All pages (Home, Details, Checkout, Confirmation) fetch live data from Supabase, not hardcoded.

🧾 License

This project was developed as part of an academic assignment.
You are free to reuse or modify for educational and demo purposes.

🧭 Author

Prajakta Ayare
Mumbai, India
