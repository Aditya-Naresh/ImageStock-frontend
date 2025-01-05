# Image Stock Application

This is an Image Stock application built with React, Redux, and Vite. It allows users to register, login, upload images, edit image details, and manage their image gallery. The application uses Tailwind CSS for styling and Radix UI for accessible components.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## Features

- User Authentication (Register, Login, Logout)
- Password Reset and Email Verification
- Image Upload and Gallery Management
- Drag and Drop Image Sorting
- Edit and Delete Images
- Responsive Design

## Tech Stack

- React
- Redux Toolkit
- React Hook Form
- Tailwind CSS
- Radix UI
- Axios
- Vite

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

### Installation

1.  Clone the repository:

        ```sh
        git clone https://github.com/Aditya-Naresh/ImageStock-frontend.git
        cd ImageStock-frontend
        ```

2.  Install the dependencies:

        ```sh
        npm install
        # or
        yarn install
        ```

### Running the Application

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the application running.

## Deployment

To build the application for production, run:

```sh
npm run build
# or
yarn build
```

The production-ready files will be in the `dist` folder. You can then deploy these files to your preferred hosting service.

## Folder Structure

```plaintext
├── public
│   ├── index.html
│   └── ...
├── src
│   ├── assets
│   ├── components
│   ├── features
│   ├── hooks
│   ├── pages
│   ├── services
│   ├── store
│   ├── styles
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.
