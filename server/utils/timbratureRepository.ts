import { db } from 'hub:db'
import { sql } from 'drizzle-orm'

interface TimbratureEntry {
  Ora: string
  Verso: number
}

interface TimbratureDay {
  Data: string
  timbrature: TimbratureEntry[]
}

export async function fetchAndFormatTimbrature() {
  // Definiamo un tipo per il risultato grezzo dalla query, dove 'timbrature' può essere una stringa.
  interface RawTimbratureRow {
    Data: string
    timbrature: string // Il driver DB restituisce il JSON come stringa
  }
  const result: RawTimbratureRow[] = await db.all(sql`
    SELECT 
      date(
        CAST(1986 + (CAST(Data / 512 AS INT) % 64) AS TEXT) || '-' ||
        printf('%02d', CAST((CAST(Data / 32 AS INT) % 16) AS INT)) || '-' ||
        printf('%02d', CAST(Data % 32 AS INT))
      ) as Data,
      json_group_array(
        json_object(
          'Ora', printf('%02d:%02d', CAST((Ora / 2) / 60 AS INT), CAST((Ora / 2) % 60 AS INT)),
          'Verso', CAST((Ora & 1) AS INT)
        )
        ORDER BY Ora
      ) as timbrature
    FROM timbrature
    GROUP BY date(
      CAST(1986 + (CAST(Data / 512 AS INT) % 64) AS TEXT) || '-' ||
      printf('%02d', CAST((CAST(Data / 32 AS INT) % 16) AS INT)) || '-' ||
      printf('%02d', CAST(Data % 32 AS INT))
    )
    ORDER BY Data
  `)

  // Mappiamo i risultati grezzi, analizzando manualmente la stringa JSON 'timbrature'.
  // Questo assicura che 'timbrature' sia sempre un array, risolvendo l'errore.
  const formattedResult: TimbratureDay[] = result.map((row) => ({
    ...row,
    timbrature: JSON.parse(row.timbrature) as TimbratureEntry[]
  }))
  return formattedResult
}
