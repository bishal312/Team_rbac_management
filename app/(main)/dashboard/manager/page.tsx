import ManagerDashboard from "@/app/components/layout/dashboard/ManagerDashboard";
import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { transformTeams, transformUsers } from "@/app/lib/utils";
import { Role, User } from "@/app/types";
import { redirect } from "next/navigation";

const MangerPage = async () => {
  const user = await getCurrentUser();
  if (!user || !checkUserPermission(user, Role.MANAGER)) {
    redirect("/unauthorized")
  }

  //Featch data for managaer dashboard
  const prismaMyTeamMembers = user.teamId ?
    await prisma.user.findMany({
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
    await prisma.user.findMany({
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

  const myTeamMembers = transformUsers(prismaMyTeamMembers);
  const allTeamMembers = transformTeams(prismaAllTeamMembers);
  return (
    <ManagerDashboard
      myTeamMembers={myTeamMembers as User[]}
      allTeamMembers={allTeamMembers as unknown as User[]}
      currentUser={user}
    />
  )
}

export default MangerPage;