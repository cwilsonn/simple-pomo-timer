<template>
  <div class="min-h-[100dvh] grid layout-container">
    <header id="app-header"></header>
    <main id="main-content">
      <slot />
    </main>
    <footer id="app-footer"
      class="mt-auto flex justify-center p-2">
      <AttributionBanner />
    </footer>
  </div>
</template>