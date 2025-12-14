import { fetchAndFormatTimbrature } from '~~/server/utils/timbratureRepository'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  //const timbrature = await useDrizzle().select().from(tables.timbrature).all()

  const timbratureByDay = await fetchAndFormatTimbrature()

  return timbratureByDay
})
