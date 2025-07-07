# 🔗 URL Shortener App

This is a simple React-based URL Shortener application that lets users shorten long URLs, track how many times each short link was clicked, and view statistics. The app stores data in the browser's `localStorage` and uses custom logging middleware to record all major actions.

---

## 🚀 Features

- ✅ Shorten long URLs with a unique short code
- ✅ Automatically set expiration (7 days) for each short link
- ✅ Track total clicks and log when a short link is used
- ✅ View statistics of all shortened URLs
- ✅ All user actions are logged using a custom logger (no `console.log`)

---

## 🧠 How It Works

- When a user enters a long URL, the app creates a short code and stores it along with the original link and an expiry date in `localStorage`.
- Each time someone opens the short link, it redirects to the original URL and logs the access.
- The statistics page shows all created short links, their click counts, and timestamps of each click.
- Logging is done using a custom middleware (`logAction`) which records each important user action in localStorage.

---

## 🛠️ Technologies Used

- **React** (via Vite)
- **Material UI** for UI components
- **React Router** for page navigation
- **localStorage** for saving links and logs
- **Custom logging middleware** for audit trails
