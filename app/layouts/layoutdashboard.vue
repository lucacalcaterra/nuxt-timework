<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
const { fetch, user, loggedIn, clear } = useUserSession()

const open = ref(false)

const links: NavigationMenuItem[][] = [
  [
    {
      label: 'Home',
      icon: 'i-lucide-house',
      to: '/'
      //active: true
    },
    {
      label: 'Login',
      icon: 'i-lucide-inbox',
      to: '/login'

      // badge: '4'
    },
    {
      label: 'Timbrature',
      icon: 'i-lucide-inbox',
      to: '/timbrature'

      // badge: '4'
    }
  ]
]

const navigationItems: ComputedRef<NavigationMenuItem[][]> = computed(() => {
  // Elementi sempre visibili (es. Home)
  const baseItems: NavigationMenuItem[] = [{ label: 'Home', to: '/', icon: 'i-lucide-home' }]

  let conditionalItems: NavigationMenuItem[] = []

  if (loggedIn.value) {
    // Elementi visibili SOLO se l'utente è loggato
    conditionalItems = [
      {
        label: 'Timbrature',
        to: '/timbrature',
        icon: 'i-lucide-user',
        description: 'Timbrature'
      }
      // {
      //   label: 'Esci',
      //   icon: 'i-lucide-log-out',
      //   // Utilizza il campo `click` per eseguire la funzione di logout
      //   onSelect: () => {
      //     clear()
      //   }
      // }
    ]
  } else {
    // Elementi visibili SOLO se l'utente NON è loggato
    conditionalItems = [
      //{ label: 'Timbrature', to: '/timbrature', icon: 'i-lucide-log-in' }
      //{ label: 'Registrati', to: '/registrati', icon: 'i-lucide-user-plus' }
    ]
  }

  // Combina gli elementi base e quelli condizionali
  return [[...baseItems, ...conditionalItems]]
})
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <!-- <TeamsMenu :collapsed="collapsed" /> -->
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :items="navigationItems"
          :collapsed="collapsed"
          orientation="vertical"
        />
      </template>

      <template #footer="{ collapsed }">
        <!-- <UserMenu :collapsed="collapsed" /> -->
        <div class="mx-auto"><AuthLogin /></div>
      </template>
    </UDashboardSidebar>

    <slot />

    <!-- <NotificationsSlideover /> -->
  </UDashboardGroup>
</template>


