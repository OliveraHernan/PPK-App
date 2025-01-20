"use client";
import { useState , useEffect, ChangeEvent} from "react";
import { Trash2, Download, Plus, UserPlus, MoreVertical, Link, LogIn} from "lucide-react";
import { DataSession } from "@/src/lib/interfaces/SessionInterface";
import { Button } from "../ui/button";

const DashboardPage = () => {
  const [sessions, setSessions] = useState<DataSession[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch("/api/sessions");
        const data:{ sessions: DataSession[] } = await response.json();
        setSessions(data.sessions);
      } catch (error) {
        console.log("Error al obtener las sesiones:", error);
      }
    };

    fetchSessions();
  }, []);

   const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
     if (e.target.checked) {
       setSelectedSessions(sessions.map((s) => s._id));
     } else {
       setSelectedSessions([]);
     }
   };

   const handleSelectSession = (id: string) => {
     if (selectedSessions.includes(id)) {
       setSelectedSessions(selectedSessions.filter((s) => s !== id));
     } else {
       setSelectedSessions([...selectedSessions, id]);
     }
   };

   const changeVisibility = () =>{

   }

   const downloadDocument = () =>{

   }

  return (
    <>
      {/* Action Bar */}
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        <h2 className="text-white text-lg">Listado de sesiones</h2>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
          onClick={changeVisibility}>
            <Trash2 className="w-4 h-4" />
            Borrar
          </Button>
          <Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm"
          onClick={downloadDocument}>
            <Download className="w-4 h-4" />
            Exportar
          </Button>
          <Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm">
            <Plus className="w-4 h-4" />
            Crear nueva sala
          </Button>
          <Button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm">
            <UserPlus className="w-4 h-4" />
            Unirse a sala
          </Button>
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
                   checked={selectedSessions.length === sessions.length}
                  className="rounded border-white/30"
                />
              </th>
              <th className="pb-4">Nombre</th>
              <th className="pb-4">Duración total</th>
              <th className="pb-4">Número total de historias</th>
              <th className="pb-4">Última modificación</th>
              <th className="pb-4">Estado</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session._id} className="border-b border-white/10">
                <td className="py-4">
                  <input
                    type="checkbox"
                     checked={selectedSessions.includes(session._id)}
                     onChange={() => handleSelectSession(session._id)}
                    className="rounded border-white/30"
                  />
                </td>
                <td className="py-4 text-center">{session.name}</td>
                <td className="py-4 text-center">{session.duration}</td>
                <td className="py-4 text-center">{session.userStories.length}</td>
                <td className="py-4 text-center">{session.updatedAt}</td>
                <td className="py-4 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      session.status === "active"
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
                        openActionMenu === session._id ? null : session._id
                      )
                    }
                    className="p-1 hover:bg-white/10 rounded"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {openActionMenu === session._id && (
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
