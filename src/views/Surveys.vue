<script setup>
import store from "../store/index.js";
import {computed} from "vue";
import PageComponent from "../components/PageComponent.vue";

const surveys = computed(() => store.state.surveys);
</script>

<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3x1 font-bold text-gray-900">Surveys 22</h1>
        <router-link
          :to="{ name: 'SurveyCreate'}"
          class="
          py-2
          px-3
          text-white
          bg-emerald-500
          rounded-md
          hover:bg-emerald-600
        "
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add New Survey
        </router-link>
      </div>
    </template>
    <div>
      <pre>{{surveys}}</pre>
    </div>
  </PageComponent>
</template>

<style scoped>

</style>
