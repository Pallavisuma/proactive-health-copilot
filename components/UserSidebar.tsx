"use client";

type Props = {
  users: any[];
  selectedUser: string;
  onSelect: (id: string) => void;
};

export default function UserSidebar({
  users,
  selectedUser,
  onSelect,
}: Props) {
  return (
    <div className="w-72 border-r border-slate-800 h-screen p-6 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-950 text-white flex flex-col shadow-2xl z-10 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <span className="font-bold text-lg">C</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Health Copilot
        </h1>
      </div>

      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Patient Roster</div>
      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelect(user.id)}
            className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border ${selectedUser === user.id
                ? "bg-slate-800/80 border-indigo-500/50 shadow-lg shadow-indigo-900/20"
                : "bg-slate-800/20 border-transparent hover:bg-slate-800/50 hover:border-slate-700"
              }`}
          >
            <div className={`font-semibold ${selectedUser === user.id ? "text-white" : "text-slate-300"}`}>
              {user.name}
            </div>

            <div className={`text-xs mt-1 line-clamp-1 ${selectedUser === user.id ? "text-indigo-300" : "text-slate-500"}`}>
              {user.condition}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
