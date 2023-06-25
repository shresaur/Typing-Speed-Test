# Typetanic - Test Your Typing Speed

Typetanic is a web application that allows you to test and improve your typing speed. It provides a user-friendly interface where you can practice typing quotes and receive feedback on your accuracy and speed. This repository contains the source code and necessary files for running the Typetanic application.

![typetanic](https://github.com/shresaur/Typing-Speed-Test/assets/96402139/55a5c07c-b42c-4b08-b340-636999d7b0d3)

## Features

- Random quote generation: Each time you start a typing test, a random quote is fetched from the [Quotable API](https://api.quotable.io/random) and displayed for you to type.
- Typing accuracy feedback: As you type, the application visually highlights correct and incorrect characters to provide real-time feedback on your accuracy.
- Timer and speed calculation: The application includes a timer that counts down from 60 seconds. Once the time is up, your typing speed is calculated in words per minute (WPM) based on the total characters typed.
- User registration and login: Typetanic supports user registration and login functionality using a SQLite database to store user information securely.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/typetanic.git# Typing-Speed-Test

2. Navigate to the project directory:

   ```bash
   cd typetanic

3. Install the dependencies:

   ```bash
   
   npm install

4. Start the application:

   ```bash
   
   npm start

## Configuration

- The application uses a configuration file (config.js) to store sensitive information such as the JWT secret key and database details. Make sure to update the configuration file with your own values before running the application.

## Technologies Used

- Front-end: HTML, CSS, JavaScript
- Back-end: Node.js, Express.js
- Database: SQLite
- Authentication: bcrypt, JWT (JSON Web Tokens)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Acknowledgements

- The Typetanic application was developed as a coding exercise to practice web development skills.
- The random quotes used in the typing tests are fetched from the Quotable API.
- More features will be coming soon!

## Contact

For any inquiries or feedback, feel free to message me.

Thank you for using typetanic! Happy typing!
