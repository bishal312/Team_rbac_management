import UserDashboard from "@/app/components/layout/dashboard/UserDashboard";
import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { User } from "@/app/types";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login")
  }

  //Featch user-specific data
  const teamMemebers = user.teamId ?
    await prisma.user.findMany({
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
      teamMembers={teamMemebers as User[]}
      currentUser={user}
    />
  )
}

export default UserPage;