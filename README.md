# <h1 align="center">🐾 Pawstman</h1>

## 📝 Description

**Pawstman** is a lightweight and powerful REST API client built with modern web technologies. It provides a clean and intuitive interface for building, testing, and documenting REST APIs.

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-5.27.2-0170FE?logo=antdesign)](https://ant.design/)
[![Firebase](https://img.shields.io/badge/Firebase-12.2.1-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.8.2-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-3.2.4-6E9F18?logo=vitest)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.34.0-4B32C3?logo=eslint&logoColor=white)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-3.3.3-BD89C0?logo=prettier&logoColor=white)](https://prettier.io/)
[![Husky](https://img.shields.io/badge/Husky-9.1.7-000000?logo=github)](https://typicode.github.io/husky/)
[![next-intl](https://img.shields.io/badge/next--intl-4.3.6-000000?logo=next.js)](https://next-intl.dev/)

This application provides the following features:

- Test APIs with any HTTP method (GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS)
- Organize headers and body with structured editors
- Save request history for later reference
- User authentication via Firebase
- Generate code snippets for multiple languages
- Localized interface in English and Russian
- Environment variables management
- Request history and analytics

## 💻⚙️ Install and Run the Application

- Clone the repository from GitHub:

  ```bash
  git clone https://github.com/Mxmmsv/rest-client-app
  ```

- Go to the project directory:

  ```bash
  cd pawstman
  ```

- Install the dependencies:

  ```bash
  npm install
  ```

- Set up Firebase environment variables. Create a `.env.local` file in the root directory:

  ```bash
  FIREBASE_SERVICE_ACCOUNT_KEY='{
    "type": "foo",
    "project_id": "foo",
    "private_key_id": "foo",
    "private_key": "foo",
    "client_email": "foo",
    "client_id": "foo",
    "auth_uri": "foo",
    "token_uri": "foo",
    "auth_provider_x509_cert_url": "foo",
    "client_x509_cert_url": "foo",
    "universe_domain": "foo"
  }'
  ```

- Start the development server:

  ```bash
  npm run dev
  ```

The application will be available at `http://localhost:3000`.

You can also use `yarn` or `pnpm` instead of `npm`, depending on your package manager.

## 📜 Available Scripts

In the project directory, you can run:

- Start the development server:

  ```bash
  npm run dev
  ```

- Build the project for production:

  ```bash
  npm run build
  ```

- Start the production server:

  ```bash
  npm run start
  ```

- Run linting:

  ```bash
  npm run lint
  ```

- Fix linting issues:

  ```bash
  npm run lint:fix
  ```

- Format code with Prettier:

  ```bash
  npm run format:fix
  ```

- Run type checking:

  ```bash
  npm run typecheck
  ```

- Run tests:

  ```bash
  npm run test
  ```

- Run tests with coverage:

  ```bash
  npm run test:coverage
  ```

- Run tests with UI:

  ```bash
  npm run test:ui
  ```

## 👥 Authors

- [Maxim Moiseev](https://github.com/Mxmmsv) - [LinkedIn](https://www.linkedin.com/in/moiseevmaxim/)
- [Ekaterina Dmitrenko](https://github.com/ek-ole) - [LinkedIn](https://www.linkedin.com/in/ekaterina-dmitrenko-74531835a)
- [Alla Tsaiukova](https://github.com/AlyaEngineer) - [LinkedIn](https://www.linkedin.com/in/alla-tsaiukova-033ba92b8/)

## 🙏 Acknowledgments

Special thanks to:

- Our mentors for guidance and support
- The [RS School](https://rs.school/) for the knowledge and experience
- Firebase team for excellent documentation and services
- Ant Design team for the comprehensive UI library

## 🌐 Live Demo

Check out the live application: [Pawstman Demo](https://rest-client-app-git-develop-oikioikioikiabrams-4424s-projects.vercel.app/ru)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
