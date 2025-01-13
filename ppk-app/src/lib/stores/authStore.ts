import { create } from 'zustand';

interface AuthState {
  token: string | null;
  role: string | null;
  setAuth: (token: string, role: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  setAuth: (token, role) => set({ token, role }),
  clearAuth: () => set({ token: null, role: null }),
}));

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const { token } = useAuthStore.getState();
  return token !== null;
};

// Función para verificar el rol del usuario
export const userHasRole = (requiredRole: string) => {
  const { role } = useAuthStore.getState();
  return role === requiredRole;
};