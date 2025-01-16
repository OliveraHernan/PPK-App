"use client";
import React from "react";
import {
  Trash2,
  Download,
  Plus,
  UserPlus,
  MoreVertical,
  Link,
  LogIn,
} from "lucide-react";

interface Session {
  id: number;
  name: string;
  duration: string;
  storiesCount: number;
  lastModified: string;
  status: "Activo" | "Inactivo";
}

const mockSessions: Session[] = [
  {
    id: 1,
    name: "Sesión 1",
    duration: "20 minutos",
    storiesCount: 4,
    lastModified: "Ayer",
    status: "Activo",
  },
  {
    id: 2,
    name: "Sesión 2",
    duration: "1 hora",
    storiesCount: 1,
    lastModified: "1 semana",
    status: "Activo",
  },
  {
    id: 3,
    name: "Sesión 3",
    duration: "6 minutos",
    storiesCount: 5,
    lastModified: "1 semana",
    status: "Inactivo",
  },
  {
    id: 4,
    name: "Sesión 4",
    duration: "47 minutos",
    storiesCount: 6,
    lastModified: "2 meses",
    status: "Activo",
  },
  {
    id: 5,
    name: "Sesión 5",
    duration: "1:30 minutos",
    storiesCount: 7,
    lastModified: "5 meses",
    status: "Inactivo",
  },
  {
    id: 6,
    name: "Sesión 6",
    duration: "3 minutos",
    storiesCount: 9,
    lastModified: "3 años",
    status: "Activo",
  },
];

const DashboardPage = () => {
  const [selectedSessions, setSelectedSessions] = React.useState<number[]>([]);
  const [openActionMenu, setOpenActionMenu] = React.useState<number | null>(
    null
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSessions(mockSessions.map((s) => s.id));
    } else {
      setSelectedSessions([]);
    }
  };

  const handleSelectSession = (id: number) => {
    if (selectedSessions.includes(id)) {
      setSelectedSessions(selectedSessions.filter((s) => s !== id));
    } else {
      setSelectedSessions([...selectedSessions, id]);
    }
  };

  return (
    <>
      {/* Action Bar */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <h2 className="text-white text-lg">Listado de sesiones</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">
            <Trash2 className="w-4 h-4" />
            Borrar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm">
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm">
            <Plus className="w-4 h-4" />
            Crear nueva sala
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm">
            <UserPlus className="w-4 h-4" />
            Unirse a sala
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-6">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedSessions.length === mockSessions.length}
                  className="rounded border-white/30"
                />
              </th>
              <th className="pb-4 text-left">Nombre</th>
              <th className="pb-4 text-left">Duración total</th>
              <th className="pb-4 text-left">Número total de historias</th>
              <th className="pb-4 text-left">Última modificación</th>
              <th className="pb-4 text-left">Estado</th>
              <th className="pb-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {mockSessions.map((session) => (
              <tr key={session.id} className="border-b border-white/10">
                <td className="py-4">
                  <input
                    type="checkbox"
                    checked={selectedSessions.includes(session.id)}
                    onChange={() => handleSelectSession(session.id)}
                    className="rounded border-white/30"
                  />
                </td>
                <td className="py-4">{session.name}</td>
                <td className="py-4">{session.duration}</td>
                <td className="py-4">{session.storiesCount}</td>
                <td className="py-4">{session.lastModified}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      session.status === "Activo"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
                <td className="py-4 relative">
                  <button
                    onClick={() =>
                      setOpenActionMenu(
                        openActionMenu === session.id ? null : session.id
                      )
                    }
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openActionMenu === session.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <div className="py-1">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                          <Link className="w-4 h-4" />
                          Copiar vínculo
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full">
                          <LogIn className="w-4 h-4" />
                          Unirse
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full">
                          <Trash2 className="w-4 h-4" />
                          Borrar
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardPage;
