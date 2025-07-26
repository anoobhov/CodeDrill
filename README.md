# <CodeDrill />

**Master Data Structures & Algorithms — From Typing Code to Topping Contests**

Welcome to **CodeDrill**, the ultimate military-themed DSA platform built to help you become an elite code commando. Whether you're a raw recruit or a battle-hardened programmer, CodeDrill is your mission control for mastering Data Structures, Algorithms, and competitive programming.

---

<img width="947" height="444" alt="image" src="https://github.com/user-attachments/assets/3d388a39-408a-4947-a205-6db093ec0c20" />
<!-- Replace with actual image path -->

---

## 🚀 Features

- 🔥 **Daily Drills**
  - Practice fresh, curated problems every day.
  - Problem timers to simulate real contest pressure.

- 🧠 **AI Hints System**
  - Get smart hints powered by AI to break through logic blocks.
  - Works in real-time with context from your current problem.

- 📊 **Submission Heatmap**
  - GitHub-style heatmap calendar to visualize your submission streak.
  - Helps you track consistency and identify weak zones.

- 🧮 **Problem Sets & Special Sheets**
  - Sheets for CP, Interviews, Codeforces ladders, etc.
  - Organized by topic and difficulty.

- 🎖️ **Military Theme**
  - Motivational design: Enlist as a code recruit and rise through the ranks.
  - Clean UI with rank-based progress visualization.

- 🕒 **Live Timer on Problems**
  - Adds urgency like a real coding contest.
  - Track how long you took for each submission.

- 💬 **AI Chatbot Assistant**
  - Integrated AI chat window for logic walkthroughs and conceptual help.

- 📱 **Responsive Design**
  - Works seamlessly on desktop and mobile.

---

## 🧩 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React.js, Tailwind CSS, ShadCN, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ORM) |
| Code Execution | Judge0 API |
| AI | Gemini API for hints & assistant |
| Authentication | JWT-based secure login |
| UI Elements | Lucide Icons, Custom Theming |

---

## 📈 Screenshots

|  Problem Page | UserDashboard |
|--------------|---------|
| <img width="910" height="933" alt="image" src="https://github.com/user-attachments/assets/e6352271-42d5-4cbf-a89a-2d0e26ffc633" />| <img width="918" height="922" alt="image" src="https://github.com/user-attachments/assets/78514a5e-9e4c-4094-a82f-e62869517331" />|

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/codedrill.git
cd codedrill

# 2. Install dependencies
npm install

# 3. Setup Environment Variables (.env)
Fill this with your own values...
PORT = 
DATABASE_STRING=
JWTKEY=''
REDIS_PORT=
REDIS_PASS=
REDIS_HOST=
JUDGE0_API=
GEMINI_API=
CLOUDINARY_CLOUDNAME=
CLOUDINARY_APIKEY=
CLOUDINARY_APISECRET=
CLOUDINARY_API_ENVIRONMENTVARIABLE=CLOUDINARY_URL=

# 4. Start the server and client
npm run dev
