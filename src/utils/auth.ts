import { UserRole } from "../models/User";

/**
 * Obtiene los datos del usuario desde localStorage
 */
export function getUserData(): any | null {
  const storedUser = localStorage.getItem('user');
  
  if (!storedUser) {
    return null;
  }
  
  try {
    const user = JSON.parse(storedUser);
    return user;
  } catch (error) {
    console.error('❌ Error parseando usuario:', error);
    localStorage.removeItem('user');
    return null;
  }
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  const user = getUserData();
  const isAuth = user !== null && !!user.id;
  console.log('🔐 isAuthenticated:', isAuth);
  return isAuth;
}

/**
 * Verifica si el usuario tiene uno de los roles especificados
 * Nota: Debes agregar el campo 'role' en tu UserResponseDto
 */
export function hasRole(requiredRoles: UserRole[]): boolean {
  const user = getUserData();
  
  if (!user?.role) {
    console.log('❌ Usuario no tiene rol definido');
    return false;
  }
  
  const hasRequiredRole = requiredRoles.includes(user.role);
  console.log(`🔑 Verificando rol. Usuario: ${user.role}, Requerido: ${requiredRoles.join(',')}, Acceso: ${hasRequiredRole}`);
  
  return hasRequiredRole;
}

/**
 * Verifica si el usuario es administrador
 */
export function isAdmin(): boolean {
  return hasRole([UserRole.ADMINISTRADOR]);
}

/**
 * Verifica si el usuario puede editar
 */
export function canEdit(): boolean {
  return hasRole([UserRole.ADMINISTRADOR, UserRole.EDITOR]);
}