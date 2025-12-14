<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'test1',
    to: '/test1'
    //active: route.path.startsWith('/test1')
  },
  {
    label: 'test2',
    to: '/test2'
    //active: route.path.startsWith('/test2')
  },
  {
    label: 'Timbrature',
    to: '/timbrature'
    //active: route.path.startsWith('/test2')
  }
])
</script>

<template>
  <UNavigationMenu
    :items="items"
    variant="link"
    :ui="{
      link: 'px-2 py-1',
      linkLeadingIcon: 'hidden'
    }"
  />
</template>
