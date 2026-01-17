# 📱 Byte Us - Super App Prototype

A Next.js-based "Super App" prototype built for the 2026 Hackathon. This application mimics the experience of leading delivery platforms (like Snoonu/Uber Eats) with a focus on a seamless dark-mode UI and an integrated **AI Voice Assistant**.

🔗 **Live Demo:** [https://snoonu-hackathon-byte-us-2026.vercel.app/](https://snoonu-hackathon-byte-us-2026.vercel.app/)

## ✨ Key Features

### 1. 🤖 AI Voice Assistant (Snoonu Bot)
- **Interactive Mascot:** Clicking the mascot in the footer triggers a full-screen voice overlay.
- **Speech-to-Text:** Users can speak their requests naturally using the Web Speech API.
- **Text-to-Speech:** The assistant replies verbally, reading out recommendations and captions.
- **Smart Recommendations:** Context-aware product suggestions (e.g., Musical instruments, Food) based on user queries.
- **Visualizers:** Real-time animated sound waves when listening or speaking.

### 2. 🛍️ Super App Interface
- **Bento Grid Layout:** A responsive, visually hierarchical grid separating "Essentials" (Food, Grocery) from "Lifestyle" services (Laundry, Travel).
- **Horizontal Scroll Sections:** "Popular Brands" and "Offers & Events" sections designed for touch/mobile interaction.
- **Sticky Navigation:** A bottom navigation bar that remains accessible without overlapping content.

### 3. 🛒 Dynamic Market Pages
- **Product Routing:** Dynamic routing (`/market/[slug]`) to render individual product details.
- **Data Driven:** Fetches product details (Images, Description, Price) from a local JSON dataset.
- **Cart Interactions:** Functional quantity selectors and "Add to Cart" logic.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** SVG & Custom Assets
- **AI/Voice:** Native Web Speech API (`SpeechRecognition` & `speechSynthesis`)
- **HTTP Client:** Axios (with Next.js API Proxy for CORS handling)

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
