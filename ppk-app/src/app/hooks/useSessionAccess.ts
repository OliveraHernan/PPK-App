import { useState } from 'react';

export const useSessionAccess = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateCode = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/sessions/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      const data = await response.json();
      return data.valid;
    } catch (err: any) {
      setError('Error al validar el código');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { validateCode, loading, error };
};
