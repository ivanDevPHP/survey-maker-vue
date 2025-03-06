<script>
import {useRouter} from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="flex flex-col items-center text-center">
    <p>You don't have any surveys yet.</p>
    <router-link
      :to="{ name: 'SurveyCreate' }"
      class="text-blue-500 hover:underline mt-2">
      Click here to create your first one.
    </router-link>
  </div>
</template>

<style scoped>

</style>
