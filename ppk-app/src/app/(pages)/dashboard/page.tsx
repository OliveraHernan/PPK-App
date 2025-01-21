"use client";

import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  // Función para manejar la redirección
  const handleJoinSession = () => {
    // ID de prueba - esto normalmente vendría de tus datos reales
    const testSessionId = "123";
    router.push(`/sessions/${testSessionId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <Button
        onClick={handleJoinSession}
        className="bg-primary hover:bg-primary/90"
      >
        Ir a Sesión de Prueba
      </Button>
    </div>
  );
}
