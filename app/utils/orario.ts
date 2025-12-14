import moment from 'moment'

// Calcola l'ora a partire da un valore raw
export function calcolaOra(oraRaw: number): string {
  const minutiTotali = oraRaw / 2
  const durata = moment.duration(minutiTotali, 'minutes')
  return moment.utc(durata.asMilliseconds()).format('HH:mm')
}

// Calcola la data a partire da un valore raw
export function calcolaData(dataRaw: number): Date {
  const anno = 1986 + (Math.floor(dataRaw / 512) % 64)
  const mese = Math.floor(dataRaw / 32) % 16 // 1-based in JS
  const giorno = dataRaw % 32

  // In JavaScript i mesi partono da 0, quindi bisogna sottrarre 1
  return new Date(anno, mese - 1, giorno)
}
