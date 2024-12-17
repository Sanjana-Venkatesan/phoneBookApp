# Phonebook Application - React

This is a simple phonebook application built using React. It allows users to store and manage contacts, including names and phone numbers. The app also provides features like filtering contacts, adding new contacts, and deleting contacts. Additionally, it includes a dark/light theme toggle and notifications for actions like adding or deleting contacts.

## Features

- **Add Contact**: Allows users to add a new name and phone number to the phonebook.
- **Delete Contact**: Users can delete existing contacts from the phonebook.
- **Search/Filter**: Filter contacts by name using a search bar.
- **Dark/Light Theme**: Toggle between dark and light themes for the UI.
- **Notifications**: Notifications for actions such as adding and deleting contacts.
- **Responsive UI**: A user-friendly interface that adapts to different screen sizes.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **CSS**: Styling the app with custom styles for dark/light themes.
- **Axios**: Used to handle HTTP requests for interacting with the backend.
- **JSON Server** (for local development): A simple tool to simulate a REST API for data management (Optional, if used in the development environment).

## How to Use

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/phonebook-app.git
   cd phonebook-app
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the application:

   ```bash
   npm start
   ```

4. The app will run on `http://localhost:3000`.

## Features in Detail

### 1. Add Contact

- You can add a contact by clicking the "Add" button, which opens a form for entering a name and phone number.
- The app prevents adding duplicate names, ensuring each contact is unique.

### 2. Delete Contact

- Each contact displayed in the phonebook has a "Delete" button.
- When clicked, a confirmation dialog appears to confirm deletion of the contact.

### 3. Search/Filter Contacts

- The search bar allows users to filter contacts by name, making it easy to find a specific contact.

### 4. Dark/Light Theme Toggle

- Users can switch between dark and light themes using the toggle button.

### 5. Notifications

- The app displays notifications at the top of the screen when a contact is added or deleted.

## Folder Structure

- **src/**
  - **components/**: Contains individual components like `Filter`, `Notification`, `PopupForm`, and `Persons`.
  - **services/**: Contains the logic for interacting with the backend (e.g., `persons.js` for CRUD operations).
  - **App.js**: The main React component that contains the state and logic for the phonebook.
  - **App.css**: Styling for the app, including styles for the light/dark themes.

## Example

Here's a simple usage example of the phonebook application:

- **Search for a contact**: Type the name of the contact in the search bar, and the list will filter in real time.
- **Add a contact**: Click the "Add" button, fill in the name and phone number, and click "Add" to save the contact.
- **Delete a contact**: Click the "Delete" button next to a contact to remove it.

## Backend Setup (Optional)

If you want to use your own backend, replace the `noteService` with your own API service. You can use a service like [JSON Server](https://github.com/typicode/json-server) for local development:

1. Install JSON Server:

   ```bash
   npm install -g json-server
   ```

2. Start a mock API with the following command:

   ```bash
   json-server --watch db.json --port 5000
   ```

3. Update the `noteService` to point to the appropriate endpoints.

## License

This project is licensed under the MIT License.
