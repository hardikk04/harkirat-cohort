import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const insertUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const response = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password,
    },
  });
  console.log(response);
};

// insertUser("Hardik", "Sisodiya", "hardik@gmail.com", "h@1234");

interface UpdateParams {
  firstName: string;
  lastName: string;
}

const updateUser = async (
  email: string,
  { firstName, lastName }: UpdateParams
) => {
  const response = await prisma.user.update({
    where: { email },
    data: {
      firstName,
      lastName,
    },
  });
  console.log(response);
};

// updateUser("hardik@gmail.com", { firstName: "Khushi", lastName: "Chandak" });

const getUser = async (email: string) => {
  const response = await prisma.user.findUnique({
    where: { email },
  });
  console.log(response);
};

const deleteUser = async (email: string) => {
  const response = await prisma.user.delete({
    where: { email },
  });
  console.log(response);
};
