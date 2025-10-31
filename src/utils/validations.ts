import { TransportStatus, type Hour } from "../types/types";

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export function convertirHora24(itemHour: Hour): number {

  return itemHour.hour * 60 + itemHour.minute; // Total minutos desde medianoche
}

export function getMinutesFormat(time: Hour): string {
  return time.minute < 10 ? '0' + time.minute : time.minute + ''
}

export function validateShowItinerary(hour: Hour): boolean {
  const hora = new Date();
  const currentTime = convertirHora24({ hour: hora.getHours(), minute: hora.getMinutes() });
  const itineraryHour = convertirHora24(hour);
  return itineraryHour > currentTime
}

export const formatTimeInSonoraCustom = (date: Date): string => {
  const formatter = new Intl.DateTimeFormat('es-MX', {
    timeZone: 'America/Hermosillo',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit'
  });

  return formatter.format(new Date(date));
};

export const formatDuration = (milliseconds: number): string => {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  return `${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}m`;
};

export const formatLastSeen = (date: Date | null): string => {
  return date ? new Date(date).toLocaleString() : 'Sin información';
};

export const getStatusLabel = (status: string): string => {
  return status === TransportStatus.ACTIVE ? 'Activo' : 'Inactivo';
};

// Función para validar la contraseña y mostrar mensaje de error si no coinciden
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) return '';
    if (password !== confirmPassword) return 'Las contraseñas no coinciden.';
    return '';
}