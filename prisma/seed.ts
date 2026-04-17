import { Role } from "@/app/generated/prisma/enums";
import { hashPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";

async function main() {
  console.log("Starting database seed...");
  //Create Teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Engineering",
        description: "Software development team",
        code: "ENG-2026",
      },
    }),
    prisma.team.create({
      data: {
        name: "Marketing",
        description: "Marketing and sales team",
        code: "MKT-2026",
      },
    }),
    prisma.team.create({
      data: {
        name: "Operations",
        description: "Business operations team",
        code: "OPS-2026",
      },
    }),
  ]);

  //Crate sample users
  const sampleUsers = [
    {
      name: "John Developer",
      email: "John@comapny.com",
      team: teams[0],
      role: Role.MANAGER,
    },
    {
      name: "Jane Designer",
      email: "jane@comapany.com",
      team: teams[0],
      role: Role.USER,
    },
    {
      name: "Bob Marketer",
      email: "bob@comapny.com",
      team: teams[1],
      role: Role.MANAGER,
    },
    {
      name: "Alice Sales",
      email: "alice@company.com",
      team: teams[1],
      role: Role.USER,
    },
  ];

  for (const userData of sampleUsers) {
    await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: await hashPassword("123456"),
        role: userData.role,
        teamId: userData.team.id,
      },
    });
  }
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
