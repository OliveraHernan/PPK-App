import React from 'react';
import { Trash2, Download, Plus, UserPlus } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-primary p-6">
      {/* Header */}
      <div className="flex justify-between items-rigth mb-8">
        <div className="flex items-rigth gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-lg backdrop-blur-sm" />
        </div>
        <div className="flex items-rigth gap-4">
          <span className="text-white">Alberto Vera</span>
          <div className="w-10 h-10 rounded-full bg-white" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full rounded-2xl overflow-hidden backdrop-blur-md bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
        {/* Action Bar */}
        <div className="p-4 flex items-center justify-between backdrop-blur-sm border-b border-white/10">
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

        {/* Content Area */}
        <div className="p-6">
          {/* Add your session list content here */}
          <div className="text-white/60 text-center py-12">
            No hay sesiones disponibles
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;