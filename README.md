# 📅 Live Story (Life-In-Weeks Timeline) (SD-2)

**Life-In-Weeks** is a powerful visual storytelling app that transforms every week of your life into a rich, interactive timeline — blending personal milestones with significant global events.

Whether you're reflecting on your journey, planning ahead, or simply curious about how time has flown, this app provides a clear and customizable view of your life in weeks.

---




## 🌟 Table of Contents

- [🎯 Project Purpose](#-project-purpose)
- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📦 Installation & Setup](#-installation--setup)
- [📁 Project Structure](#-project-structure)
- [📄 Timeline Export](#-timeline-export)
- [🤝 Contributors](#-contributors)
- [📄 PowerPoint Presentation](#-contributors)


---

## 🎯 Project Purpose

Time passes faster than we realize. Most people live over **4,000 weeks**, but rarely get to visualize them. This app solves that by:

- Helping users **visualize their entire life**, week-by-week
- Encouraging **reflection on key personal milestones**
- Allowing discovery of **contextual world events** during important phases
- Providing a **structured record** of a life lived, goals set, and memories made

---

## 🚀 Features

### ✅ Core Functionalities

| Feature                | Description |
|------------------------|-------------|
| 👤 **Authentication**  | User sign-up, login, and profile setup with Clerk |
| 🎂 **Birthdate Logic** | Auto-calculates total weeks lived since user's birth and also some additional data Gender, Bio, Relevant Links and also the User can update the Profile Picture|
| 🧠 **Timeline Engine** | Scrollable & zoomable interface to visualize each week and Interactive Interface|
| 📅 **Event Management** | Add, edit, delete personal events with title, date, category |
| 🖼️ **Image Attachments** | Upload and attach media (photos, documents) via ImageKit.io |
| 🗃️ **Category Tagging** | Filter, color-code events by type (e.g., Personal, Academic, Travel) |
| 🔔 **Reminders** | Show a Panel of Upcoming Anniversary |
| 📄 **Export Timeline** | Convert entire visual timeline into a downloadable PDF using jsPDF |

### 💎 Optional Features Added
- Dark mode & accessibility enhancements
- Uploading Cover Image for the events
- Users can add Additinal Notes and Relevant Links

---

## 🛠️ Tech Stack

| Layer           | Technology                     |
|----------------|---------------------------------|
| Framework       | **Next.js** (React 18, App Router and Used API routes for backend handling) |
| Styling         | **Tailwind CSS**, responsive utility-first design, **ShadCN UI** |
| Auth & Profile  | **clerk.com** for modern identity management |
| ORM             | **Drizzle ORM** for type-safe, schema-driven PostgreSQL |
| Database        | **PostgreSQL** hosted on **NeonDB** |
| File Handling   | **ImageKit.io** for image uploads, transformations |
| PDF Generation  | **jsPDF** to convert timeline data into downloadable format |
| Hosting         | Hosted the App on Vercel

---

## 📦 Installation & Setup

### 🖥 Prerequisites

- Node.js (for running the app in the localhost)
- PostgreSQL account (NeonDB)
- Clerk.com account (get the keys for it)
- ImageKit.io account (also need to get the public keys and private keys and the URL Endpoint)

### ⚙️ Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/life-in-weeks.git
cd AlgoArchitects---Live-Story-Life-in-a-Weeks-Timeline-Project-

# 2. Install dependencies
npm install --force (Use force if using React 19)

# 3. Set up environment variables
touch .env 
touch .env.local
# Fill in this to .env and .env.local files:
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
#CLERK_SECRET_KEY
#NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
#NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
#NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/onboarding
#NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
#NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
#NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
#NEXT_PUBLIC_DATABASE_URL
#NEXT_PUBLIC_PUBLIC_KEY
#NEXT_PUBLIC_URL_ENDPOINT
#PRIVATE_KEY

# 4. Run the development server
npm run dev
```



## 📁 Project Structure
![Project Structure](/PROJECT%20STRUCTURE.png)

## 📄 PowerPoint Presentation
[PPT File](https://github.com/Euphoric-Coder/AlgoArchitects---Live-Story-Life-in-a-Weeks-Timeline-Project-/blob/main/Live%20Story%20(SD-2%20Life%20in%20Weeks%20Timeline)%20Presentation.pptx)




## 🤝 Contributors

### 👤 [Sagnik Dey](https://github.com/sagnik-dey)
- **Role**: Full-Stack Developer
- **GitHub**: [@sagnik-dey](https://github.com/Euphoric-Coder)

---

### 👤 [Shushmitha S](https://www.linkedin.com/in/sushmitha-s-999b02317/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)
- **Role**: Backend Developer
- **GitHub**: (https://github.com/Sushmithas747)

---

### 👤 [Anurag Sharma](https://www.linkedin.com/in/anurag-sharma-42a080307/)
- **Role**: Backend Developer
- **GitHub**: (https://github.com/AnuragSharma-11)



