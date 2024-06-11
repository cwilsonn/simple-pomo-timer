<template>
  <article class="container grid p-2 mx-auto text-center place-items-center">
    <h1 class="mb-6 font-mono text-4xl font-bold">Credits</h1>
    <p>This app incorporates materials that are licensed under
      <Icon name="tabler:creative-commons"
        size="1.5rem" class="me-1" /><a href="https://creativecommons.org/"
        class="link"
        target="_blank"
        rel="noopener noreferrer">Creative Commons</a>
    </p>
    <hr class="divider" />
    <p>Thanks to the following:</p>
    <ul class="mt-2 list-none list">
      <li v-for="credit in credits"
        :key="credit.name">
        <a :href="credit.url"
          class="font-bold link"
          target="_blank"
          rel="noopener noreferrer">
          {{ credit.name }}
        </a>
        |
        <a :href="credit.url"
          class="link"
          target="_blank"
          rel="noopener noreferrer">
          {{ credit.assetName }}
        </a>
        |
        <span>
          <Icon :name="credit.licenseIcon"
            size="1.5rem"
            class="me-1" />
          <a :href="credit.license"
            class="link"
            target="_blank"
            rel="noopener noreferrer">
            {{ credit.licenseName }}
          </a>
        </span>
      </li>
    </ul>
  </article>
</template>

<script setup
  lang="ts">
  const credits = ref<Record<string, any>>([
    {
      name: 'jobro',
      assetName: '5 beep b.wav',
      url: 'https://freesound.org/people/jobro/sounds/33788/',
      license: 'http://creativecommons.org/licenses/by/3.0/',
      licenseName: 'Attribution 3.0',
      licenseIcon: 'tabler:creative-commons-by',
    },
    {
      name: 'pan14',
      assetName: 'tone beep.wav',
      url: 'https://freesound.org/people/pan14/sounds/263133/',
      license: 'http://creativecommons.org/publicdomain/zero/1.0/',
      licenseName: 'CC0',
      licenseIcon: 'tabler:creative-commons-zero',
    }
  ])
</script>
