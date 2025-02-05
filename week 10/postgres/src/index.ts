import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://kirat_owner:CFkcVLN9i7YW@ep-damp-tree-a585jatd.us-east-2.aws.neon.tech/kirat?sslmode=require",
});

const createUsersTable = async (
  username: string,
  email: string,
  password: string
) => {
  //   await client.connect();
  //   const result = await client.query(`
  //     CREATE TABLE users (
  //     id SERIAL PRIMARY KEY,
  //     username VARCHAR(50) UNIQUE NOT NULL,
  //     email VARCHAR(255) UNIQUE NOT NULL,
  //     password VARCHAR(255) NOT NULL,
  //     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  // );
  //         `);

  try {
    await client.connect();
    const insertQuery =
      "INSERT INTO users (username,email,password) VALUES ($1,$2,$3)";

    const res = await client.query(insertQuery, [username, email, password]);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

createUsersTable("hardik","h@gmail.com","1234");
