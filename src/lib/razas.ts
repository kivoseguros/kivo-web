export type Tamano = "P" | "M" | "G";

export interface Raza {
  nombre: string;
  tamano: Tamano;
  ppp?: boolean;    // Potencialmente Peligrosa (RD 287/2002)
  caza?: boolean;   // Raza de caza/trabajo (se pregunta por uso, no se bloquea por raza)
}

// PPP según RD 287/2002
export const PPP_RAZAS = [
  "Pit Bull Terrier",
  "Staffordshire Bull Terrier",
  "American Staffordshire Terrier",
  "Rottweiler",
  "Dogo Argentino",
  "Fila Brasileño",
  "Tosa Inu",
  "Akita Inu",
  "Akita",
];

export const RAZAS: Raza[] = [
  // PEQUEÑO (hasta ~10 kg) - ref. Jack Russell Terrier
  { nombre: "Jack Russell Terrier", tamano: "P" },
  { nombre: "Chihuahua", tamano: "P" },
  { nombre: "Yorkshire Terrier", tamano: "P" },
  { nombre: "Maltés", tamano: "P" },
  { nombre: "Pomerania", tamano: "P" },
  { nombre: "Bichón Frisé", tamano: "P" },
  { nombre: "Caniche Toy", tamano: "P" },
  { nombre: "Caniche Miniatura", tamano: "P" },
  { nombre: "West Highland White Terrier", tamano: "P" },
  { nombre: "Shih Tzu", tamano: "P" },
  { nombre: "Schnauzer Miniatura", tamano: "P" },
  { nombre: "Teckel / Dachshund", tamano: "P" },
  { nombre: "Pug / Carlino", tamano: "P" },
  { nombre: "Bulldog Francés", tamano: "P" },
  { nombre: "Boston Terrier", tamano: "P" },
  { nombre: "Cavalier King Charles Spaniel", tamano: "P" },
  { nombre: "Papillón", tamano: "P" },
  { nombre: "Pinscher Miniatura", tamano: "P" },
  { nombre: "Spitz Alemán Enano / Pomerania", tamano: "P" },
  { nombre: "Fox Terrier de pelo liso", tamano: "P" },
  { nombre: "Fox Terrier de pelo duro", tamano: "P" },
  { nombre: "Cairn Terrier", tamano: "P" },
  { nombre: "Norfolk Terrier", tamano: "P" },
  { nombre: "Scottish Terrier", tamano: "P" },
  { nombre: "Lhasa Apso", tamano: "P" },
  { nombre: "Affenpinscher", tamano: "P" },
  { nombre: "Bolonés", tamano: "P" },
  { nombre: "Habanero", tamano: "P" },
  { nombre: "Coton de Tuléar", tamano: "P" },
  { nombre: "Basenji", tamano: "P" },
  { nombre: "Galgo Italiano", tamano: "P" },
  { nombre: "Spitz Japonés", tamano: "P" },
  { nombre: "Pequinés", tamano: "P" },

  // MEDIANO (10–25 kg) - ref. Beagle
  { nombre: "Beagle", tamano: "M" },
  { nombre: "Cocker Spaniel Inglés", tamano: "M" },
  { nombre: "Cocker Spaniel Americano", tamano: "M" },
  { nombre: "Border Collie", tamano: "M" },
  { nombre: "Springer Spaniel Inglés", tamano: "M", caza: true },
  { nombre: "Springer Spaniel Galés", tamano: "M", caza: true },
  { nombre: "Bulldog Inglés", tamano: "M" },
  { nombre: "Schnauzer Mediano", tamano: "M" },
  { nombre: "Caniche Mediano / Grande", tamano: "M" },
  { nombre: "Shar Pei", tamano: "M" },
  { nombre: "Shiba Inu", tamano: "M" },
  { nombre: "Husky Siberiano", tamano: "M" },
  { nombre: "Whippet", tamano: "M" },
  { nombre: "Spitz Mediano", tamano: "M" },
  { nombre: "Épagneul Bretón", tamano: "M", caza: true },
  { nombre: "Setter Irlandés", tamano: "M", caza: true },
  { nombre: "Setter Inglés", tamano: "M", caza: true },
  { nombre: "Pointer", tamano: "M", caza: true },
  { nombre: "Vizsla / Braco Húngaro", tamano: "M", caza: true },
  { nombre: "Braco Alemán de pelo corto", tamano: "M", caza: true },
  { nombre: "Braco Alemán de pelo duro", tamano: "M", caza: true },
  { nombre: "Sabueso Español", tamano: "M", caza: true },
  { nombre: "Galgo Español", tamano: "M", caza: true },
  { nombre: "Samoyedo", tamano: "M" },
  { nombre: "Chow Chow", tamano: "M" },
  { nombre: "Dálmata", tamano: "M" },
  { nombre: "Basset Hound", tamano: "M", caza: true },
  { nombre: "Australian Shepherd", tamano: "M" },
  { nombre: "Boyero de Berna", tamano: "M" },
  { nombre: "Boyero Australiano", tamano: "M" },
  { nombre: "Welsh Corgi Pembroke", tamano: "M" },
  { nombre: "Keeshond / Spitz Lobo", tamano: "M" },
  { nombre: "Malinois / Pastor Belga", tamano: "M" },

  // GRANDE (más de 25 kg) - ref. Labrador Retriever
  { nombre: "Labrador Retriever", tamano: "G" },
  { nombre: "Golden Retriever", tamano: "G" },
  { nombre: "Pastor Alemán", tamano: "G" },
  { nombre: "Boxer", tamano: "G" },
  { nombre: "Dobermann", tamano: "G" },
  { nombre: "Gran Danés", tamano: "G" },
  { nombre: "San Bernardo", tamano: "G" },
  { nombre: "Mastín Español", tamano: "G" },
  { nombre: "Mastín Napolitano", tamano: "G" },
  { nombre: "Weimaraner", tamano: "G", caza: true },
  { nombre: "Schnauzer Gigante", tamano: "G" },
  { nombre: "Dogo de Burdeos", tamano: "G" },
  { nombre: "Terranova", tamano: "G" },
  { nombre: "Boyero de Montaña Bernés", tamano: "G" },
  { nombre: "Alaskan Malamute", tamano: "G" },
  { nombre: "Montaña del Pirineo", tamano: "G" },
  { nombre: "Irish Wolfhound", tamano: "G" },
  { nombre: "Greyhound / Galgo Inglés", tamano: "G", caza: true },
  { nombre: "Cane Corso", tamano: "G" },
  { nombre: "Leonberger", tamano: "G" },
  { nombre: "Perdiguero de Burgos", tamano: "G", caza: true },
  { nombre: "Braco Italiano", tamano: "G", caza: true },

  // PPP - NO ASEGURABLES
  { nombre: "Pit Bull Terrier", tamano: "G", ppp: true },
  { nombre: "Staffordshire Bull Terrier", tamano: "M", ppp: true },
  { nombre: "American Staffordshire Terrier", tamano: "G", ppp: true },
  { nombre: "Rottweiler", tamano: "G", ppp: true },
  { nombre: "Dogo Argentino", tamano: "G", ppp: true },
  { nombre: "Fila Brasileño", tamano: "G", ppp: true },
  { nombre: "Tosa Inu", tamano: "G", ppp: true },
  { nombre: "Akita Inu", tamano: "G", ppp: true },
  { nombre: "Akita", tamano: "G", ppp: true },
];

export function buscarRaza(query: string): Raza[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return RAZAS.filter(r => r.nombre.toLowerCase().includes(q)).slice(0, 10);
}

export function esPPP(nombreRaza: string): boolean {
  return PPP_RAZAS.some(p => p.toLowerCase() === nombreRaza.toLowerCase()) ||
    RAZAS.find(r => r.nombre.toLowerCase() === nombreRaza.toLowerCase())?.ppp === true;
}
