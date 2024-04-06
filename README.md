# Simple Shop

- This project about creating a demo project for Simple Shop System:

## Project Requirements

- That helps in List All Products, and Categories.
- Create, Update, and Delete Products and Categories.
- Provide an Endpoint for the UI to utilize.
- Using Prisma for database operations such as migration and easy modeling

## Installation instructions

- Clone project : `git clone https://github.com/seiftahawy54/simple-shop.git
- Create `.env` file for environment variables : `touch .env`
- Add important variables before running the app:
    - `NODE_ENV` : to change the project environment depending on where the project will run
    - `PORT` : to publish the project to certain port.
    - `DATABASE_URL` : to allow accessing the database
        - Make sure that the database is [MySQL](https://www.mysql.com/downloads/) client.
        - Make sure that you have run `yarn migrate` to run the database migration instructions.
    - `STATIC_URL` : to make sure that all images are uploaded and served correctly
- Install dependencies : `yarn install`
    - The app will be accessible at ``http://localhost:{{PORT}}``
- Run the project in dev mode : `yarn dev`
    - Worth note that I've been using [Bun](https://bun.sh) as a runtime.

## Additional Resources
- Postman Collection available at `API_COLLECTION`