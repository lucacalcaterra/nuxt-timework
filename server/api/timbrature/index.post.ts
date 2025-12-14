import { tables, useDrizzle, Timbratura } from '~~/server/utils/drizzle'

export default defineEventHandler(async (event) => {
  //const { user } = await requireUserSession(event)
  // const timbrature = await useDrizzle().select().from(tables.timbrature).all()
  const rawBody = await readBody(event)

  const insertPayload: Timbratura = rawBody

  try {
    const result = await useDrizzle().insert(tables.timbrature).values(insertPayload).returning()
    return { message: 'ok' }
  } catch (error) {
    console.error('Error inserting timbratura:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to insert timbratura'
    })
  }
})
