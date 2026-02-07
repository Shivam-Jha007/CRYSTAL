# CRYSTAL — Habit Tracker & Daily Streak System

CRYSTAL is a web-based habit tracker designed to help users plan daily tasks, track progress, and maintain consistency through a streak-based system.

The core challenge of this project was implementing **reliable daily streak logic**, which required careful handling of dates, resets, and edge cases.

---

## ✨ Key Features

- User authentication (login & signup) using Supabase
- Create, update, and delete habits/tasks
- Support for both **daily habits** and **deadline-based tasks**
- Automatic daily reset of habit status at midnight
- **Streak calculation for daily habits**
- Secure backend storage using Supabase
- Responsive multi-page UI (auth pages + dashboard)

---

## 🧠 Engineering Challenges & Learnings

- Implementing streak logic without off-by-one errors
- Handling date comparisons between today and yesterday
- Managing async data fetching and state updates
- Choosing a **simple, reliable approach** over over-engineering
- Debugging issues that only appeared after real usage

This project reinforced the importance of **shipping a working solution** rather than chasing theoretical perfection.

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend & Auth:** Supabase
- **Architecture:** Multi-page app with separated logic for auth and dashboard

---

## 🚀 How to Run

1. Open `login.html` or `signup.html`
2. Authenticate via Supabase
3. Use the dashboard to manage habits and track streaks

---

## 📌 Project Status

This project is complete as **v1** and intentionally frozen to focus on new builds and higher-impact learning.


---The project is live at  https://shivam-jha007.github.io/CRYSTAL/