# Chat Application

## Description
This is a real-time chat application built with **Vite + React**, **Firebase Firestore**, and **Zustand** for state management. The application allows users to create channels, join conversations, and send messages.

## Features
- 🔥 **User Authentication**: Sign up and log in using Firebase Authentication.
- 💬 **Real-time Chat**: Messages update instantly using Firestore.
- 📌 **Channels**: Users can create, join, and leave chat channels.
- 🛠 **State Management**: Managed using Zustand.
- 🚀 **Hosted on Vercel**.

## Technologies Used
- **Frontend**: React (Vite)
- **Backend**: Firebase Firestore
- **Authentication**: Firebase Auth
- **State Management**: Zustand
- **Deployment**: Vercel

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your Firebase project:
   - Create a Firebase project.
   - Enable Firestore and Authentication (Email & Password).
   - Copy Firebase configuration into `.env`:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## Deployment
This project is deployed on **Vercel**. To deploy:
```sh
npm run build
vercel --prod
```
Make sure your `vercel.json` includes:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Contribution
Feel free to fork and submit pull requests. If you find any issues, open an issue in the repository.

## License
MIT License. Feel free to use and modify.

