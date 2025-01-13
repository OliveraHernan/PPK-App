export const Roles = {
  ADMIN: 'admin',
};

export const Permissions = {
  DASHBOARD_ACCESS: 'dashboard',
};

export const RolePermissions = {
  [Roles.ADMIN]: [Permissions.DASHBOARD_ACCESS],
};