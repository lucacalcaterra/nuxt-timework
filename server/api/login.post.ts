import { z } from 'zod'

interface DBUser {
  id: number
  email: string
  password: string
}

const invalidCredentialsError = createError({
  statusCode: 401,
  // This message is intentionally vague to prevent user enumeration attacks.
  message: 'Invalid credentials'
})

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(
    event,
    z.object({
      email: z.string().email(),
      password: z.string().min(8)
    }).parse
  )

  //   const user = await db.sql<{ rows: DBUser[] }>`SELECT * FROM users WHERE email = ${email}`.then(
  //     (result) => result.rows[0]
  //   )
  const user = await useDrizzle().select().from(tables.users).where(eq(tables.users.email, email))
  //const hashedPassword = await hashPassword('password')

  if (!user) {
    throw invalidCredentialsError
  }

  if (!(await verifyPassword(user[0].password, password))) {
    throw invalidCredentialsError
  }

  await setUserSession(event, {
    user: {
      email
    },
    loggedInAt: Date.now()
  })

  return setResponseStatus(event, 201)
})
