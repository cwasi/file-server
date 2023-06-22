# Lizz File Server Application

This application allow users to access and download document in the likes of wedding cards, admission forms etc.

**Customer Requirements**

Users should be able to :

1. Signup & log in with an email and password with account verification. There should be a
   reset password feature to recover lost passwords password.
2. See a feed page that contains a list of files that can be downloaded.
3. Search the file server.
4. Send a file to an email through the platform.

Admin :

1. Should be able to upload files with a title and description.
2. Should be able to see the number of downloads and number of emails sent for each file.

### Built with

- Pug
- SCSS / CSS
- Node
- Express
- PostgreSQL with Sequilize (ORM)

## Getting Started

### Installation

To install and run this application. Follow these steps:

1. Clone this repository on your local machine. `git clone https://github.com/cwasi/file-server`
2. Navigate to the project directory
3. Install all the dependencies by running `npm install` or `npm i`
4. Set up database:

   - Ensure PostgreSQL is installed and running on your local machine.
   - Create a new PostgreSQL database.
   - Create a `.env` file in the project `root` directory and configure the connection string. For example:

     ```
     SERVER_PORT=database-port
     USER_NAME=database-username
     DATABASE_PASSWORD=database-password
     DATABASE=database-name
     DATABASE_HOST= Database-port
     ```

5. Configure JWT (Json Web Tokens)

   - Generate a secret key for JWT.
   - Configure the JWT in the project configuration file `.env`. Example:

     ```
     JWT_SECRET=jwt-secret
     JWT_EXPIRES_IN=jwt-expires-in
     JWT_COOKIE_EXPIRES_IN=jwt-cookie-expires-in
     ```

6. Configure SMTP

   - Obtain the SMTP server details, including host, port, username, and password.
   - Configure the SMTP in the project configuration file `.env`. Example:

     ```
     EMAIL_FROM=email-from
     EMAIL_USERNAME=email-address
     EMAIL_PASSWORD=email-password
     EMAIL_HOST=email-host
     EMAIL_PORT=email-port
     ```

7. Run `npm run build` to build the project

## Usage

To start the project, follow these steps:

1. Set the NODE_ENV environment variable to development in `env` file :

   ```
   NODE_ENV=development
   ```

2. Start the application:

   ```
    npm run start:dev
   ```

3. Open your web browser and navigate to http://localhost:4040 to access the application.

## Configuration

This application can be configured by editing the `.env` file in the root directory. configuration options: 

- `PORT`: The server listens on port `default: 4040`

### File upload
uploaded files are saved in the project's `./pubilc/document` directory. 

## Author 👦
- GitHub - [@cwasi](https://github.com/cwasi)
