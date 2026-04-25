"use client"

import { apiClient } from "@/app/lib/apiClient";
import { Role, Team, User } from "@/app/types"
import { useTransition } from "react";

interface AdminDashboardProps {
  users: User[];
  teams: Team[];
  currentUser: User;
}

const AdminDashboard = ({
  users,
  teams,
  currentUser,
}: AdminDashboardProps) => {
  const [ispending, startTransition] = useTransition();

  const handleTeamAssignment = async (userId: string, teamId: string | null) => {
    startTransition(async () => {
      try {
        await apiClient.assignUserToTeam(userId, teamId);
        window.location.reload();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Error updating team assignment");
      }
    });
  }

  const handleRoleAssignment = async (userId: string, newRole: Role) => {
    if (userId === currentUser.id) {
      alert("You cannot change your own role!");
      return
    }
    startTransition(async () => {
      try {
        await apiClient.updateUserRole(userId, newRole);
        window.location.reload();
      } catch (error) {
        alert(error instanceof Error ? error.message : "Error updating user role");
      }
    });
  }


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2 text-white">Admin Dashboard</h1>
        <p className="text-slate-300">User and team management</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Users table with role and team assignment */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="p-4 border-b border-slate-700">
            <h3>Users ({users.length})</h3>
            <p className="text-slate-400 text-sm">Manage roles and team assignment</p>
          </div>
          <div className="p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-300">Name</th>
                  <th className="text-left py-2 text-slate-300">Role</th>
                  <th className="text-left py-2 text-slate-300">Team</th>
                  <th className="text-left py-2 text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-700">
                    <td className="py-2 text-slate-300">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-slate-500 text-xs">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-2">
                      <select value={user.role} onChange={(e) => handleRoleAssignment(user.id, e.target.value as Role)} disabled={ispending || user.id === currentUser.id} className="bg-slate-900 border border-slate-700 rounded px-2 py-1">
                        <option value={Role.USER}>USER</option>
                        <option value={Role.ADMIN}>ADMIN</option>
                        <option value={Role.MANAGER}>MANAGER</option>
                      </select>
                    </td>
                    <td className="py-2">
                      <select value={user.teamId || ""} onChange={(e) => handleTeamAssignment(user.id, e.target.value || null)} disabled={ispending || user.id === currentUser.id} className="bg-slate-900 border border-slate-700 rounded px-2 py-1">
                        <option value="">No Team</option>
                        {teams.map((team) => (
                          <option key={team.id} value={team.id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                      {user.team && (
                        <span className="text-xs text-slate-500">
                          {user.team.code}
                        </span>
                      )}
                    </td>
                    <td className="py-2">
                      {user.teamId && (
                        <button onClick={() => handleTeamAssignment(user.id, null)} disabled={ispending} className="text-red-400 hover:text-red-300 text-xs disabled:opacity-50">
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Teams table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="p-4 border-b border-slate-700">
            <h3>Teams ({teams.length})</h3>
            <p className="text-slate-400 text-sm">Team overview</p>
          </div>
          <div className="p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 text-slate-300">Name</th>
                  <th className="text-left py-2 text-slate-300">Code</th>
                  <th className="text-left py-2 text-slate-300">Members</th>
                  <th className="text-left py-2 text-slate-300">Managers</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => {
                  const teamMembers = users.filter((user) => user.id === team.id);
                  const teamManagers = users.filter((user) => user.role === Role.MANAGER);
                  return (
                    <tr key={team.id} className="border-b border-slate-700">
                      <td>

                      </td>
                    </tr>
                  )
                });
                };

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
