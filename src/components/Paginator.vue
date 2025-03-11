<script  setup>
defineProps({
  links: Array
});

const emit = defineEmits(['link-click']);

function handleClick(link) {
  if (link.url) {
    emit('link-click', link);
  }
}
</script>

<template>
  <div class="flex justify-center mt-8 pt-4 border-t border-gray-200 w-full overflow-x-auto">
    <nav
      class="relative z-0 inline-flex justify-center rounded-md shadow-sm max-w-full"
      aria-label="Pagination"
    >
      <a
        v-for="(link, i) in links"
        :key="i"
        :disabled="!link.url"
        href="#"
        @click.prevent="handleClick(link)"
        class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
        :class="[
        link.active
          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
        i === 0 ? 'rounded-l-md' : '',
        i === links.length - 1 ? 'rounded-r-md' : ''
      ]"
        v-html="link.label"
      />
    </nav>
  </div>

</template>

<style scoped>

</style>
