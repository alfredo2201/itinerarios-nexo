export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
    // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}   

export function convertirHora24(hora12: string): number {
  // Ej: "7:00 A.M" → [hora: 7, minutos: 0, periodo: "A.M"]
  const [horaMin, periodo] = hora12.split(" ");
  // eslint-disable-next-line prefer-const
  let [hora, minutos] = horaMin.split(":").map(Number);

  if (periodo.toUpperCase() === "P.M" && hora !== 12) {
    hora += 12;
  }
  if (periodo.toUpperCase() === "A.M" && hora === 12) {
    hora = 0;
  }

  return hora * 60 + minutos; // Total minutos desde medianoche
}


