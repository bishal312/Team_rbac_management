import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login")
  }

  //Featch user-specific data
  const teamMemebers = user.teamId ?
    prisma.user.findMany({
      where: {
        teamId: user.teamId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    }) : [];

  return (
    <UserDashboard
      teamMembers={teamMemebers}
      currentUser={user}
    />
  )
}

export default UserPage;