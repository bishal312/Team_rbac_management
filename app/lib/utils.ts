import { Team, User } from "../types";

// Simple transformation function that handles the actual Prisma response
export function transformUser(user: any): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    teamId: user.teamId || undefined,
    team: user.team || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt ?? user.updateAt,
  };
}

export function transformUsers(users: any[]): User[] {
  return users.map(transformUser);
}

export function transformTeam(team: any) {
  return {
    id: team.id,
    name: team.name,
    description: team.description || undefined,
    code: team.code,
    members: team.members || [],
    createdAt: team.createdAt,
    updatedAt: team.updatedAt ?? team.updateAt,
  };
}

export function transformTeams(teams: any[]): Team[] {
  return teams.map(transformTeam);
}
