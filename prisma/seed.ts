import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { Role, Status } from "../generated/prisma/enums";

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@rentnest.com",
    },
  });

  if (adminExists) {
    console.log("⚡ Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@rentnest.com",
      password: hashedPassword,
      role: Role.ADMIN,
      status: Status.ACTIVE,
    },
  });

  console.log("✅ Admin created successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });