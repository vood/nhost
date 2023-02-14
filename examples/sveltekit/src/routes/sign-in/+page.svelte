<script lang="ts">
  import { client } from '$utils/client'

  let email = ''
  let password = ''

  async function handleSubmit() {
    const response = await client.auth.signIn({ email, password })

    console.log(response)
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="grid grid-flow-row gap-4 max-w-md w-full">
  <input placeholder="Email" type="email" bind:value={email} />
  <input placeholder="Password" type="password" bind:value={password} />
  <button type="submit">Sign In</button>
</form>
