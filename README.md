<div align="center">

![GadgetGalaxy Banner](<https://github.com/CodeWithArafat1/GadgetGalaxy-client/blob/267c65685de662b7cfcdc74507e6899e998678f4/public/gadget-galaxy-client.vercel.app_dashboard%20(1).png?raw=true>)


![GadgetGalaxy Banner](https://github.com/CodeWithArafat1/GadgetGalaxy-client/blob/5e0af6e9e3ac02c5405c560280c20c9aaff202c6/public/gadget-galaxy-client.vercel.app_dashboard.png?raw=true)


[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-Server-404D59?style=for-the-badge)](https://expressjs.com/)

**A cutting-edge full-stack e-commerce application built with the latest web technologies.**
<br />
This project demonstrates high-performance rendering, secure authentication, and a sleek UI using **Next.js 16** and **Tailwind v4**.

[Live Demo (Frontend)](https://gadget-galaxy-client.vercel.app/)

</div>

---

## 🚀 Key Features

### ⚡ Core Performance (Next.js 16)

- **App Router:** Fully utilized nested layouts and loading states for seamless navigation.
- **Server Actions:** Optimized data mutations directly from the server.
- **Image Optimization:** Used `next/image` with `priority` loading ensuring LCP < 0.6s.
- **SEO:** 100% Lighthouse score with Dynamic Metadata & JSON-LD structured data.

### 🎨 UI & UX (Tailwind v4 + Shadcn)

- **Modern Styling:** Built with the new **Tailwind CSS v4.1** engine for lightning-fast builds.
- **Components:** Modular and accessible UI using **Shadcn UI**.
- **Themes:** Seamless **Dark/Light mode** transition using `next-themes`.
- **Responsive:** Mobile-first design with Sidebar Drawer and intuitive navigation.

### 🔐 Security & Data

- **Authentication:** Secure Google & Credentials login via **NextAuth.js**.
- **Route Protection:** Middleware-based protection for Dashboard & Profile pages.
- **State Management:** **TanStack Query** for caching, auto-refetching, and optimistic updates.

---

## 🛠️ Tech Stack Breakdown

| Layer          | Technology           | Version       |
| :------------- | :------------------- | :------------ |
| **Frontend**   | Next.js (App Router) | **v16.0+**    |
| **Styling**    | Tailwind CSS         | **v4.1**      |
| **UI Library** | Shadcn UI            | Latest        |
| **Icons**      | Lucide React         | Latest        |
| **Auth**       | NextAuth.js          | v5+           |
| **Backend**    | Express.js           | v5+           |
| **Database**   | MongoDB              | Native Driver |

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally.

### 1. Clone the Repository

Open your terminal and run the following command to clone the project:

```bash
git clone git@github.com:CodeWithArafat1/GadgetGalaxy-client.git
cd GadgetGalaxy-client
```

## 2. Frontend Setup (Client)

# Install the necessary dependencies and start the Next.js development server.

```bash
# Install dependencies
npm install

# Create environment variables file
touch .env.local
```

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_key

# Google Console Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```


```bash
# Run the Frontend:
npm run dev
The app should now be running at http://localhost:3000.
```