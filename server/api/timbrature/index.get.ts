import { asc } from 'drizzle-orm'
import { db } from 'hub:db'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  //const timbrature = await useDrizzle().select().from(tables.timbrature).all()

  const timbrature = await db
    .select({
      ID: tables.timbrature.ID_Timbratura,

      Ora: sql<string>`printf('%02d:%02d',CAST((${tables.timbrature.Ora} / 2) / 60 AS INT),CAST( (${tables.timbrature.Ora} / 2) % 60 AS INT))`,
      Data: sql<string>`
        date(
            -- Calcola e formatta l'Anno (1986 + INT((dataRaw / 512) % 64))
            CAST(1986 + (CAST(${tables.timbrature.Data} / 512 AS INT) % 64) AS TEXT) || '-' ||
            
            -- Calcola e formatta il Mese (INT((dataRaw / 32) % 16))
            printf('%02d', CAST((CAST(${tables.timbrature.Data} / 32 AS INT) % 16) AS INT)) || '-' ||
            
            -- Calcola e formatta il Giorno (dataRaw % 32)
            printf('%02d', CAST(${tables.timbrature.Data} % 32 AS INT))
        )`
    })
    .from(tables.timbrature)
    .orderBy(asc(tables.timbrature.Data), asc(tables.timbrature.Ora))
    .all()

  // select completa
  // select
  // 	printf('%02d:%02d',CAST((Ora / 2) / 60 AS INT),CAST( (Ora / 2) % 60 AS INT)) as Ora ,
  // 	date(CAST(1986 + (CAST(Data / 512 AS INT) % 64) AS TEXT) || '-' ||  printf('%02d', CAST((CAST(Data / 32 AS INT) % 16) AS INT)) || '-' || printf('%02d', CAST(Data % 32 AS INT))) as Data
  // from timbrature

  return timbrature
})
