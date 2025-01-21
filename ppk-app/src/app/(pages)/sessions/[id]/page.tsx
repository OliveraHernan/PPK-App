"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Button } from "@/src/components/ui/button";

interface PageProps {
  params: {
    id: string;
  };
}

interface SessionStatus {
  isActive: boolean;
  message: string;
}

export default function SessionPage({ params }: PageProps) {
  const router = useRouter();
  const [status, setStatus] = useState<SessionStatus>({
    isActive: true,
    message: "Cargando...",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        // Aquí irá tu lógica real para verificar el estado de la sesión
        const response = await fetch(`/api/sessions/${params.id}`);

        if (!response.ok) {
          throw new Error("Sesión no encontrada");
        }

        const data = await response.json();
        setStatus({
          isActive: data.isActive,
          message: data.isActive
            ? "Sesión activa"
            : "Esta sesión ya no está activa",
        });
      } catch (error) {
        setStatus({
          isActive: false,
          message: "No se pudo encontrar la sesión especificada",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSessionStatus();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>
            Cargando información de la sesión...
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sesión {params.id}</h1>
        <Button onClick={() => router.push("/dashboard")} variant="outline">
          Volver al Dashboard
        </Button>
      </div>

      <Alert variant={status.isActive ? "default" : "destructive"}>
        <AlertDescription>{status.message}</AlertDescription>
      </Alert>

      {status.isActive && (
        <div className="mt-6">
          {/* Aquí irá el contenido de la sesión activa */}
        </div>
      )}
    </div>
  );
}
