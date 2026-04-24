import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

const MangerPage = async () => {
  const user = await getCurrentUser();
  if (!user || !checkUserPermission(user, Role.MANAGER)) {
    redirect("/unauthorized")
  }

  //Featch data for managaer dashboard
  const prismaMyTeamMembers = user.teamId ?
    prisma.user.findMany({
      where: {
        teamId: user.teamId,
        role: { not: Role.ADMIN }
      },
      include: {
        team: true,
      },
      orderBy: { createdAt: "desc" }
    }) : [];

  //Fetch All team members (cross-team view - exclude sensitive fields)
  const prismaAllTeamMembers =
    prisma.user.findMany({
      where: {
        role: { not: Role.ADMIN }
      },
      include: {
        team: {
          select: {
            id: true,
            name: true,
            code: true,
            description: true,
          }
        },
      },
      orderBy: { teamId: "desc" }
    });

  return (
    <ManagerDashboard
      myTeamMembers={prismaMyTeamMembers}
      allTeam={prismaAllTeamMembers}
      currentUser={user}
    />
  )
}

export default MangerPage;