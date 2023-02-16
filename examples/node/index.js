import { NhostClient } from '@nhost/nhost-js'

async function callMe() {
  const nhost = new NhostClient({ subdomain: 'localhost' })

  try {
    const response = await nhost.auth.signIn({
      email: 'user@example.com',
      password: 'UserPassword123'
    })

    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

callMe()
