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
    <div className="w-64 border-r border-gray-200 h-screen p-4 overflow-y-auto bg-white">
      <h1 className="text-2xl font-bold mb-6">
        Health Copilot
      </h1>

      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelect(user.id)}
            className={`w-full text-left p-3 rounded-xl transition ${selectedUser === user.id
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            <div className="font-semibold">
              {user.name}
            </div>

            <div className="text-sm opacity-70">
              {user.condition}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
