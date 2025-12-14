// Questo file definisce le colonne per la UTable, incluso un campo calcolato
import type { Timbratura } from '~/types'

export const columns = [
  {
    key: 'ID_Timbratura',
    label: 'ID'
  },
  // aggiungi qui altre colonne reali se servono
  {
    key: 'descrizione',
    label: 'Descrizione calcolata'
  }
]
