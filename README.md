# Keita Solution

Keita Solution is a web application specializing in sustainable energy solutions and electrical equipment in Senegal. This project includes features such as a catalog of products, a custom install banner for PWA, and push notifications.

## Features

- **Product Catalog**: Browse through various categories of electrical equipment.
- **Progressive Web App (PWA)**: Install the app on your device for a native-like experience.
- **Push Notifications**: Receive updates and notifications even when the app is not open.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To install the Keita Solution web app on your device:

1. Open the app in your browser.
2. You will see an install banner at the bottom of the screen.
3. Click on the "Installer" button to add the app to your home screen.

## Development

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/5s9horizons/5s9KeitaSolution.git
    ```
2. Navigate to the project directory:
    ```bash
    cd 5s9KeitaSolution
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

### Running the App

To run the app locally:

1. Start the development server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

### Service Worker and Push Notifications

The service worker is responsible for caching assets and handling push notifications. The push notifications are managed using the `notification-content.json` file.

#### Updating Push Notifications

To update the push notification content:

1. Open the `notification-content.json` file.
2. Update the `message` field with the new notification content.
3. Save the file. The service worker will automatically fetch the new content and send the notification to users when they come online.

### Project Structure

- `index.html`: The main HTML file for the app.
- `manifest.json`: The web app manifest file.
- `service-worker.js`: The service worker script for caching and push notifications.
- `notification-content.json`: The file containing the push notification content.
- `main.js`: The main JavaScript file for the app.

### Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contact

For any inquiries, please contact:

- Email: [mahfouzekeita579@gmail.com](mailto:mahfouzekeita579@gmail.com)
- Phone: [+221761505085](tel:+221761505085)

Designed by [5s9 Horizons](https://5s9horizons.github.io/).