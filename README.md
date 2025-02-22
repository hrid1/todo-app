# Task Management App

## Overview
A web app to manage tasks efficiently with a drag-and-drop interface. Users can add, edit, delete, and reorder tasks in three categories: **To-Do**, **In Progress**, and **Done**. Changes are saved instantly.

## Features
- **Google Sign-In** (Firebase Authentication)
- **Task Management**: Create, edit, delete, and move tasks
- **Drag & Drop**: Organize tasks easily
- **Real-Time Sync**: Data saved instantly in Firestore
- **Responsive UI**: Works on desktop & mobile

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase Firestore

## Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v14+)
- **npm** or **yarn**
- **Firebase account** with Firestore enabled

### Steps to Run Locally
1. **Clone the repo**:
   ```sh
   git clone https://github.com/hrid1/todo-app
   cd todo-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. **Set up Firebase**:
   - Create a new project in the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Google Authentication.
   - Add your Firebase configuration in the `.env` file (create it in the root directory if it doesn't exist):
     ```plaintext
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. **Start the development server**:
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```

5. **Open your browser** and go to `http://localhost:5173` to see the app in action.

## Usage
- **Sign In**: Click on the "Sign in with Google" button to authenticate with your Google account.
- **Manage Tasks**: 
  - To add a task, enter the task details and click the "Add Task" button.
  - To edit a task, click on the task and make changes in the input field.
  - To delete a task, click the delete button (trash icon) next to the task.
  - Drag and drop tasks between the **To-Do**, **In Progress**, and **Done** categories to reorder them.

## Contribution
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Here are some ways you can contribute:
- Improve the UI/UX
- Add more features
- Fix bugs

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the Firebase team for providing excellent tools for real-time applications.
- Inspiration from various task management applications available online.
