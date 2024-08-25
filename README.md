# RallyNow App

RallyNow is a mobile application that provides users with real-time information about upcoming protests, incidents, and emergency services. The app also offers features such as emergency aid, medical ID, and community donations.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Screens and Components](#screens-and-components)
  - [LandingPage](#landingpage)
  - [ProtestList](#protestlist)
  - [IncidentList](#incidentlist)
  - [EmergencyContactsScreen](#emergencycontactsscreen)
  - [FirstAidPage](#firstaidpage)
  - [MedicalIDPage](#medicalidpage)
  - [CommunityPage](#communitypage)
- [Navigation](#navigation)
- [Backend Integration](#backend-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Protests and Incidents:** View the next upcoming protest and the latest incident, both fetched in real-time from a Firestore backend.
- **Emergency Features:** Quickly access emergency services, medical ID, and emergency aid information.
- **Community Donations:** View and donate to various organizations through the Community page.
- **SOS Button:** Quickly contact emergency services through an SOS button.
- **Low-Network Usability:** The app is designed to maintain essential functionality even in low-network conditions, ensuring users can access critical information when needed.

## Getting Started

### Prerequisites

To run this app, you'll need to have the following installed:

- Node.js
- npm or Yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase Project Setup

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/rallynow.git
   cd rallynow
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Configure Firebase:**

   Create a Firebase project and add the Firebase configuration to your project. This should be done in the `firebaseConfig.js` file located in the `src` folder.

### Running the App

To start the development server and run the app:

```bash
expo start
```

Scan the QR code generated by Expo with your phone to run the app on a physical device, or press the options for running in an Android/iOS simulator.

## Project Structure

```plaintext
rallynow/
├── assets/               # Asset files like images
├── src/                  # Source files
│   ├── components/       # Reusable components
│   ├── pages/            # Screen components
│   ├── navigation/       # Navigation setup
│   ├── firebaseConfig.js # Firebase configuration
│   └── App.tsx           # Main app entry point
├── .gitignore            # Files and folders to be ignored by Git
├── package.json          # npm package configuration
├── README.md             # This README file
└── app.json              # Expo configuration
```

## Screens and Components

### LandingPage

The landing page displays the following:

- **Upcoming Protest:** Shows details of the next upcoming protest.
- **Latest Incident:** Displays information about the most recent incident.
- **SOS Button:** Allows users to quickly contact emergency services.
- **Button Grid:** Provides access to emergency services, emergency aid, medical ID, and community donations.
- **Logout Button:** Allows users to log out of the app.

### ProtestList

The `ProtestList` page shows a list of protests, sorted by the number of votes. Users can upvote protests and add new protests through a form.

### IncidentList

The `IncidentList` page lists incidents without any voting options. Users can add new incidents through a form.

### EmergencyContactsScreen

The `EmergencyContactsScreen` provides a list of emergency contacts (e.g., Hospital, Police, Fire Department). Tapping on a contact shows an alert with the message "Making call".

### FirstAidPage

The `FirstAidPage` provides information and resources related to first aid. Users can access this page via the "Emergency Aid" button on the landing page.

### MedicalIDPage

The `MedicalIDPage` contains the user's medical information, which can be accessed in emergencies.

### CommunityPage

The `CommunityPage` lists organizations to which users can donate. Each organization has a "Donate" button (currently non-functional).

## Navigation

The app uses React Navigation to handle screen transitions. Each screen is defined in `App.tsx` within a navigation stack:

```javascript
<Stack.Screen name="LandingPage" component={LandingPage} />
<Stack.Screen name="ProtestList" component={ProtestList} />
<Stack.Screen name="IncidentList" component={IncidentList} />
<Stack.Screen name="EmergencyContactsScreen" component={EmergencyContactsScreen} />
<Stack.Screen name="FirstAidPage" component={FirstAidPage} />
<Stack.Screen name="MedicalIDPage" component={MedicalIDPage} />
<Stack.Screen name="CommunityPage" component={CommunityPage} />
```

## Backend Integration

This app integrates with Firebase Firestore to fetch real-time data:

- **Protests:** Data is fetched from the `protests` collection, ordered by date to display the next upcoming protest.
- **Incidents:** Data is fetched from the `incidents` collection, ordered by date to display the latest incident.

Ensure your Firebase project is properly set up with Firestore collections for `protests` and `incidents`.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

This README provides an overview of the RallyNow app, its features, and instructions for setting up and running the project.
