import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const user = await getCurrentUser();
  if (!user || !checkUserPermission(user, Role.ADMIN)) {
    redirect("/unauthorized")
  }

  //Featch data for admin dashboard
  const [prismaUsers, prismaTeams] = await Promise.all([
    prisma.user.findMany({
      include: {
        team: true,
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.team.findMany({
      include: {
        members: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          }
        }
      }
    })
  ]);

  return (
    <AdminDashboard
      users={prismaUsers}
      teams={prismaTeams}
      currentUser={user}
    />
  )
}

export default AdminPage;