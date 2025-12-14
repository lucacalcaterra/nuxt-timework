<script lang="ts" setup>
const isOpen = ref(false)

const { fetch, user, loggedIn, clear, openInPopup } = useUserSession()
const toast = useToast()

async function login(event: Event) {
  const target = event.target as HTMLFormElement

  await $fetch('/api/login', {
    method: 'POST',
    body: {
      email: target.email.value,
      password: target.password.value
    }
  })
    .then(() => {
      fetch()
      isOpen.value = false

      toast.add({
        color: 'success',
        title: 'User logged in successfully'
      })
    })
    .catch((err) => {
      console.log(err)

      toast.add({
        color: 'error',
        title: err.data?.message || err.message
      })
    })
}
// chiude finestra modale se autenticato
watch(
  () => loggedIn.value,
  (newVal) => {
    if (newVal) {
      isOpen.value = false
    }
  }
)
</script>

<template>
  <UButton
    v-if="!loggedIn"
    @click="isOpen = true"
  >
    Login
  </UButton>
  <template v-else>
    <UBadge
      color="neutral"
      variant="outline"
      >{{ user?.email }}</UBadge
    >
    <USeparator orientation="vertical" />
    <UButton
      size="xs"
      @click="clear"
    >
      Logout</UButton
    >
  </template>

  <UModal
    v-model:open="isOpen"
    title="Login"
    description="Enter your email and password"
    :ui="{ body: 'mx-auto' }"
  >
    <template #body>
      <UCard class="text-center">
        <p class="mb-4">Login using GitHub</p>

        <UButton @click="openInPopup('/api/auth/github')"> Login with GitHub </UButton>
      </UCard>
      <USeparator class="my-4" />
      <UCard class="mb-4">
        <p class="mb-4">Or use your email and password:</p>

        <form
          @submit.prevent="login($event)"
          no-validate="true"
        >
          <UFormField label="Email">
            <UInput
              name="email"
              type="email"
              class="w-full"
            />
          </UFormField>
          <UFormField
            label="Password"
            class="mt-4"
          >
            <UInput
              name="password"
              type="password"
              class="w-full"
            />
          </UFormField>
          <UButton
            type="submit"
            color="neutral"
            class="mt-4 mr-2"
          >
            Login
          </UButton>
          <UButton
            type="button"
            color="neutral"
            @click="isOpen = false"
          >
            Cancel
          </UButton>
        </form>
      </UCard>
    </template>
  </UModal>
</template>
