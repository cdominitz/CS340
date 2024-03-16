# Outfit Manager

## Overview
Our website is a personal outfit manager where users can create an account that holds a digital collection of their closet. Users can add their tops, bottoms, shoes, jackets, and accessories as individual items and create outfits using these items. Outfits may also be linked to specific occasions.

### Database Connection

To connect to your PostgreSQL database, you need to set the `DATABASE_URL` environment variable. This variable should contain your PostgreSQL connection string, which includes information such as the host, username, password, and database name.

#### Setting up Database Connection

1. Set the `DATABASE_URL` environment variable in your hosting environment (e.g., Heroku). The connection string should be of the format:
  ```bash
  postgres://username:password@host:port/database
  ```
  Replace `username`, `password`, `host`, `port`, and `database` with your PostgreSQL credentials and database information.

2. If you're running the application locally, you can set the `DATABASE_URL` environment variable in a `.env` file in the root directory of your project. For example:
  ```bash
  DATABASE_URL=postgres://username:password@localhost:5432/database
  ```
  Replace `username`, `password`, and `database` with your local PostgreSQL credentials and database name.


## Installation

### Clone the repository:
```bash
git clone https://github.com/your_username/your_repository.git
```

### Navigate to the project directory:
```bash
cd your_repository
```

### Install dependencies:
```bash
npm install
```

### Install and run the DDL (Data Definition Language) SQL file to create the database schema:
```bash
psql -U your_username -d your_database_name -a -f database/DDL.sql
```

### Start the server:
```bash
  npm start
```

## Database Outline
<img width="468" alt="image" src="https://github.com/cdominitz/CS340/assets/107890151/ddce3dd0-8232-4dcf-b115-ef3a65d1b49a">

## Entity-Relationship Diagrams
<img width="500" alt="image" src="https://github.com/cdominitz/CS340/assets/107890151/f94cbc34-fd8a-43d2-ac04-04b1f6e4ed28">

## Working Website
You can visit the deployed version of this project at [Outfit Database Manager](https://outfit-db-cafeb92a5b5e.herokuapp.com/).


## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries or feedback, please contact [Calista Dominitz](cdominitz@gmail.com).
