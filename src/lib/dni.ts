// Validación DNI/NIE español — Algoritmo oficial Ministerio del Interior
const DNI_LETRAS = "TRWAGMYFPDXBNJZSQVHLCKE";

// Convierte letra inicial NIE (X,Y,Z) al número correspondiente
function nieLetraInicial(letra: string): string {
  const map: Record<string, string> = { X: "0", Y: "1", Z: "2" };
  return map[letra.toUpperCase()] ?? letra;
}

export function validarDNI(valor: string): { valido: boolean; mensaje: string } {
  const v = valor.trim().toUpperCase().replace(/[-\s]/g, "");

  if (!v) return { valido: false, mensaje: "" };

  // NIE: empieza por X, Y o Z
  const esNIE = /^[XYZ]/.test(v);
  const esDNI = /^\d{8}[A-Z]$/.test(v);
  const formatoNIE = /^[XYZ]\d{7}[A-Z]$/.test(v);

  if (!esDNI && !formatoNIE) {
    return {
      valido: false,
      mensaje: esNIE
        ? "NIE inválido. Formato: X/Y/Z + 7 dígitos + letra"
        : "DNI inválido. Formato: 8 dígitos + letra",
    };
  }

  let numero: string;
  let letraFinal: string;

  if (esNIE) {
    numero = nieLetraInicial(v[0]) + v.slice(1, 8);
    letraFinal = v[8];
  } else {
    numero = v.slice(0, 8);
    letraFinal = v[8];
  }

  const resto = parseInt(numero, 10) % 23;
  const letraCorrecta = DNI_LETRAS[resto];

  if (letraFinal !== letraCorrecta) {
    return {
      valido: false,
      mensaje: `La letra no es correcta. Debería ser «${letraCorrecta}»`,
    };
  }

  return { valido: true, mensaje: "DNI/NIE válido ✓" };
}
