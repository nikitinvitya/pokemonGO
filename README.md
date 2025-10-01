# Pokémon GO - Pokedex Application

![React](https://img-shields-io.translate.goog/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![Redux](https://img-shields-io.translate.goog/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)![Go](https://img-shields-io.translate.goog/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)![SCSS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

This is a full-featured Pokedex web application built with a modern tech stack. It allows users to browse, search, and explore Pokémon through a user-friendly and responsive interface. The backend, written in Go, acts as a proxy to the [PokeAPI](https://pokeapi.co/), ensuring fast and reliable data delivery.

![Pokémon GO App Demo](https://github.com/user-attachments/assets/da6e0cf9-f429-4e01-bd0e-19f35219d20d)


## 🌟 Key Features

*   **📄 Pagination:** Browse Pokémon in a paginated list with easy-to-use controls.
*   **🔍 Search:** Quickly search for Pokémon by name.
*   **📊 Detailed View:** A comprehensive page for each Pokémon, including:
    *   Images (front & back).
    *   Physical attributes (height, weight).
    *   Types.
    *   Stats (HP, Attack, Defense, etc.) visualized with animated gauges.
*   **interactive️ Interactive Abilities Slider:** Conveniently view all Pokémon abilities one by one with their descriptions.
*   **📱 Responsive Design:** A clean and adaptive layout that works on all devices, from mobile phones to desktops.
*   **🖼️ Image Fallback:** If a Pokémon's image fails to load, a theme-aware placeholder is displayed.
*   **🚦 Loading and Error States:** Intuitive loading indicators and error screens for a better user experience.
*   **↔️ Seamless Navigation:** Quickly navigate to the next or previous Pokémon directly from the detail page.
*   🎨 **Theme Switching:** Switch between light and dark themes for comfortable viewing.

## 🛠️ Tech Stack

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** Strictly typed language for enhanced reliability and scalability.
*   **Redux Toolkit (RTK Query):** For state management and efficient API interaction (caching, invalidation).
*   **Webpack:** A powerful module bundler for JavaScript applications.
*   **React Router DOM:** For client-side routing and navigation.
*   **SCSS (Modules):** For writing modular and encapsulated styles with a preprocessor.
*   **classnames:** A utility for conditionally joining class names.

### Backend

*   **Go (Golang):** A compiled language for building fast and efficient backend services.
*   **Net/http:** Go's standard library for building HTTP servers.
*   **PokeAPI:** As the external data source for Pokémon information.

### Architecture
Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

The project is structured using the **Feature-Sliced Design (FSD)** methodology, which provides:
*   **High Modularity:** A clear separation of concerns based on business logic.
*   **Scalability:** The ability to easily add new features.
*   **Maintainability:** A predictable and understandable project structure.

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

*   Node.js (v18.x or higher)
*   npm / yarn
*   Go (v1.20 or higher)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nikitinvitya/pokemonGO.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd pokemonGO
    ```

3.  **Run the Go backend server:**
    *   Navigate to the server directory.
    ```bash
    cd server/cmd/
    ```
    *   Run the server:
    ```bash
    go run main.go
    ```
    The server will start on the :8080 port.

4.  **Run the frontend application:**
    *   In a new terminal window, navigate to the client directory (e.g., `client`).
    ```bash
    cd client 
    ```
    *   Install the dependencies:
    ```bash
    npm install
    ```
    *   Start the development server:
    ```bash
    npm start
    ```

5.  **Open the application in your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## 📜 Available Scripts

In the frontend application directory, you can run the following scripts:

*   `npm start` — Runs the app in development mode with Webpack Dev Server.
*   `npm run build:prod` — Builds the app for production (minimized).
*   `npm run build:dev` — Builds the app in development mode (non-minimized).
*   `npm run lint` — Runs the linter to check for code quality and style issues.
*   `npm run preview` — Serves the production build locally for preview.

## 📁 Project Structure (FSD)

The frontend application structure is based on the Feature-Sliced Design methodology:

*   **/app:** Application initialization (providers, routing, global styles).
*   **/pages:** Application pages (e.g., `MainPage`, `PokemonPage`).
*   **/widgets:** Large, standalone page sections (e.g., `Navbar`).
*   **/features:** Interactive elements with business logic (e.g., `AbilitiesViewer`, `Pagination`).
*   **/entities:** Business entities of the application (e.g., `PokemonCard`).
*   **/shared:** Reusable code independent of business logic (UI kit, utils, API).
