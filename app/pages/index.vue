<script setup lang="ts"></script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar
        title="Home"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <!-- <UDashboardSidebarCollapse /> -->
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- NOTE: The `-ms-1` class is used to align with the `DashboardSidebarCollapse` button here. -->
        </template>
      </UDashboardToolbar>
    </template>

    <template #body> </template>
  </UDashboardPanel>
</template>
