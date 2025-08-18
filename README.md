# Live Story (Life-In-Weeks Timeline) (SD-2)

**Life-In-Weeks** is a powerful visual storytelling app that transforms every week of your life into a rich, interactive timeline — blending personal milestones with significant global events.

Whether you're reflecting on your journey, planning ahead, or simply curious about how time has flown, this app provides a clear and customizable view of your life in weeks.

---

## Table of Contents

- [Project Purpose](#project-purpose)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Timeline Export (PDF Generation of Event Timeline)](#timeline-export-pdf-generation-of-timeline)
- [Contributors](#contributors)
- [PowerPoint Presentation](#contributors)


---

## Project Purpose

Time passes faster than we realize. Most people live over **4,000 weeks**, but rarely get to visualize them. This app solves that by:

- Helping users **visualize their entire life**, week-by-week
- Encouraging **reflection on key personal milestones**
- Allowing discovery of **contextual world events** during important phases
- Providing a **structured record** of a life lived, goals set, and memories made

---

## Features

### Core Functionalities

| Feature                | Description |
|------------------------|-------------|
| **Authentication**  | User sign-up and login |
| **Birthdate Logic** | Auto-calculates total weeks lived since user's birth and also some additional data Gender, Bio, Relevant Links and also the User can update the Profile Picture|
| **Timeline Engine** | Scrollable & zoomable interface to visualize each week and Interactive Interface|
| **Event Management** | Add, edit, delete personal events with title, date, category, etc. |
| **Image Attachments** | Upload and attach media (photos, documents) via ImageKit.io |
| **Category Tagging** | Filter, color-code events by type (e.g., Personal, Academic, Travel) |
| **Reminders** | Show a Panel of Upcoming Anniversary |
| **Export Timeline** | Convert entire visual timeline into a downloadable PDF using jsPDF |

### Optional Features Added
- Dark mode & accessibility enhancements
- Uploading Cover Image for the events
- Users can add Additinal Notes and Relevant Links

---

## Tech Stack

| Layer           | Technology                     |
|----------------|---------------------------------|
| Framework       | **Next.js** |
| Styling         | **Tailwind CSS**, responsive utility-first design, **ShadCN UI** |
| Auth & Profile  | **clerk.com** for modern identity management |
| ORM             | **Drizzle ORM** for type-safe, schema-driven PostgreSQL |
| Database        | **PostgreSQL** hosted on **NeonDB** |
| File Handling   | **ImageKit.io** for image uploads, transformations |
| PDF Generation  | **jsPDF** to convert timeline data into downloadable format |
| Hosting         | Hosted the App on Vercel

---

## Installation & Setup

### Prerequisites

- Node.js (for running the app in the localhost)
- PostgreSQL account (NeonDB)
- Clerk.com account (get the keys for it)
- ImageKit.io account (also need to get the public keys and private keys and the URL Endpoint)

### Steps

```bash
# 1. Clone the repository & Change Your Current Directory to the CodeBase
git clone https://github.com/Euphoric-Coder/AlgoArchitects---Live-Story-Life-in-a-Weeks-Timeline-Project-

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



## Project Structure
![Project Structure](/PROJECT%20STRUCTURE.png)

## Timeline Export (PDF Generation of Timeline)

The **Timeline Export** feature enables users to generate a visually rich, printable PDF of their life timeline, complete with milestones, events, and optional statistics. This is powered by the `jsPDF` library and a custom-built class: `TimelinePDFExporter`.

---

### How It Works

When the user clicks the **Export Timeline** button, a modal opens where they can customize the export settings. Once confirmed, the selected events and options are passed to `exportTimelineToPDF()`, which internally uses the `TimelinePDFExporter` class to generate and download a PDF file.

---

### Export Options (via ExportModal)

| Option                  | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| Include Statistics    | Adds a summary of total events, milestones, etc.                            |
| Include Event Details | Adds full descriptions for each event in the PDF                           |
| Color Scheme          | Choose between full-color and grayscale styling                            |
| Page Size             | Select either A4 or US Letter formatting                                   |
| Orientation           | Choose between portrait or landscape layout                                |

These are passed as the `exportOptions` object to the exporter.

---

### Files Involved

| File                     | Purpose                                           |
|--------------------------|---------------------------------------------------|
| `ExportModal.jsx`        | Renders the export UI, collects user preferences |
| `lib/pdfExports.js`      | Contains `TimelinePDFExporter` class logic       |
| `jsPDF` dependency       | Core library for PDF creation and formatting     |

---

### PDF Export Structure

#### 1. Cover Page

- **Title**: Life Timeline
- **Subtitle**: A Visual Journey Through Time
- **Date**: Current date of export
- Styled using `addTitle()`, `addSubtitle()`, and `addText()`

---

#### 2. Timeline Visualization

Uses `addTimelineVisualization()`:
- Horizontal chart across years
- Events represented as colored or grayscale bars
- Count of events in each year
- Visualizes distribution of categories (milestone, personal, etc.)

---

#### 3. Timeline Statistics *(Optional)*

Uses `addStatistics()`:
- 2-column grid of statistic boxes
- Stats included:
  - Total Events
  - Years Covered
  - Milestones
  - Career Events
  - Personal Events
  - Travel Adventures

Each box has:
- Label
- Value
- Category-specific color bar

---

#### 4. Year-wise Event Pages

For each year (descending order):

- Starts a new page
- Uses `addTitle()` + `addSubtitle()` to show the year and event count
- Iterates through all events in that year and calls `addEventCard(event, options)`:
  - Title, date, type, and description
  - Colored left bar (or grayscale)
  - Text wraps automatically
  - Page breaks are handled via `checkPageBreak()`

---

#### 📄 5. Footer on All Pages

- Applies via `this.pdf.setPage()`
- Shows `"Life Timeline - Page X of Y"`
- Appears on the bottom right of each page

---

### 🧠 Internal Methods (TimelinePDFExporter)

| Method                  | Purpose                                                  |
|-------------------------|----------------------------------------------------------|
| `addTitle()`            | Adds large headings to pages                             |
| `addSubtitle()`         | Adds supporting subtitles                                |
| `addText()`             | Adds general text with auto-wrapping                     |
| `addEventCard()`        | Renders individual event blocks                          |
| `addTimelineVisualization()` | Renders horizontal bar timeline view across years   |
| `addStatistics()`       | Displays timeline summary data in styled boxes           |
| `addNewPage()`          | Adds a new page and resets Y position                    |
| `checkPageBreak()`      | Ensures content doesn’t overflow past the page boundary  |
| `getCategoryColor()`    | Returns RGB color values based on event type             |

---

## PowerPoint Presentation
[PPT File](https://github.com/Euphoric-Coder/AlgoArchitects---Live-Story-Life-in-a-Weeks-Timeline-Project-/blob/main/Live%20Story%20(SD-2%20Life%20in%20Weeks%20Timeline)%20Presentation.pptx)

## Contributors

### 👤 [Sagnik Dey](https://github.com/sagnik-dey)
- **Role**: Full-Stack Developer
- **GitHub**: [@sagnik-dey](https://github.com/Euphoric-Coder)

---

### 👤 [Sushmitha S](https://www.linkedin.com/in/sushmitha-s-999b02317/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app)
- **GitHub**: (https://github.com/Sushmithas747)

---

### 👤 [Anurag Sharma](https://www.linkedin.com/in/anurag-sharma-42a080307/)
- **Role**: UI/UX and Frontend Developer
- **GitHub**: (https://github.com/AnuragSharma-11)



