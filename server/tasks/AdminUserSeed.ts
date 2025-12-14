export default defineTask({
  meta: {
    name: 'db:AdminUserSeed',
    description: 'Run database User seed task'
  },
  async run() {
    console.log('Running DB seed task...')
    const users = [
      {
        email: 'example@example.com',
        password: await hashPassword('password')
      }
    ]
    try {
      await useDrizzle().insert(tables.users).values(users)
      return { result: 'success' }
    } catch (error) {
      return { result: 'Error seeding admin user:', error }
    }
  }
})
