"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/src/lib/stores/authStore';
import { Roles } from '@/src/lib/utils/roles';

const Dashboard = () => {
  const router = useRouter();
  const { token, role } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      if (!token || role !== Roles.ADMIN) {
        useAuthStore.getState().clearAuth();
        router.replace('/403');
        setIsAuthorized(false);
      } else {
        setIsAuthorized(true);
      }
    };

    checkAuth();
  }, [token, role, router]);

  // Show nothing during initial auth check
  if (isAuthorized === null) {
    return null;
  }

  // Show nothing if not authorized (redirect will happen)
  if (!isAuthorized) {
    return null;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
};

export default Dashboard;