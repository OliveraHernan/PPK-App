"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../ui/label";
import { useToast } from "../../hooks/use-toast";

const createRoomSchema = z.object({
  name: z.string().min(1, "El nombre de la sala es requerido"),
  estimationType: z.enum(["fibonacci", "tshirt"], {
    required_error: "Debes seleccionar una escala de estimación",
  }),
});

type CreateRoomForm = z.infer<typeof createRoomSchema>;

export default function CreateRoomForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoomForm>({
    resolver: zodResolver(createRoomSchema),
  });

  const onSubmit = async (data: CreateRoomForm) => {
    try {
      // TODO: Implement room creation logic
      console.log("Form data:", data);
      toast({
        title: "Sala creada exitosamente",
        description: `Se ha creado la sala "${data.name}"`,
      });
    } catch (error) {
      toast({
        title: "Error al crear la sala",
        description: "Ha ocurrido un error al crear la sala",
        className: "bg-destructive text-destructive-foreground",
      });
    }
  };

  return (
    <div className="w-full max-w-md p-6   rounded-lg      ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white text-sm font-medium">
            Nombre de la sala
          </Label>
          <input
            {...register("name")}
            type="text"
            id="name"
            placeholder="Nombre de la sala"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
          {errors.name && (
            <p className="text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="estimationType"
            className="text-white text-sm font-medium"
          >
            Escala de estimación
          </Label>
          <select
            {...register("estimationType")}
            id="estimationType"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
          >
            <option value="" className="bg-gray-800">
              Escala de estimación
            </option>
            <option value="fibonacci" className="bg-gray-800">
              Fibonacci (1, 2, 3, 5, 8, 13, 21)
            </option>
            <option value="tshirt" className="bg-gray-800">
              Tallas (XS, S, M, L, XL)
            </option>
          </select>
          {errors.estimationType && (
            <p className="text-sm text-red-400">
              {errors.estimationType.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          Crear sala
        </button>
      </form>
    </div>
  );
}
