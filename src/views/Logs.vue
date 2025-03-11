<script setup>
import store from "../store/index.js";
import {computed} from "vue";
import PageComponent from "../components/PageComponent.vue";
import NoSurvey from "../components/NoSurvey.vue";
import Paginator from "../components/Paginator.vue";

const logs = computed(() => store.state.logs);

store.dispatch('getLogs');



function getForPage(link) {
  store.dispatch("getLogs", { url: link.url });
}

</script>

<template>
  <PageComponent title="Logs">
    <!-- Loading Overlay -->
    <div
      v-if="logs.loading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
    >
      <svg
        class="w-12 h-12 text-blue-500 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="4"
        aria-label="Loading"
        role="status"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 1 1-6.32 17.66"/>
      </svg>
    </div>

    <!-- Logs Section -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white shadow-xl rounded-2xl p-6 animate-fade-in-down">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800">Survey Logs</h2>
        </div>

        <div v-if="logs.data.length > 0">
          <div class="divide-y divide-gray-200">
            <div
              v-for="answer in logs.data"
              :key="answer.id"
              class="py-4 hover:bg-gray-50 px-2 rounded-md transition-colors duration-150"
            >
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div class="mb-1 sm:mb-0">
                  <div class="text-lg font-semibold text-gray-700">
                    {{ answer.title }}
                  </div>
                  <div class="text-sm text-gray-500">
                    Answer made at: <span class="font-medium">{{ answer.end_date }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Paginator :links="logs.links" @link-click="getForPage" />
        </div>

        <div v-else class="text-center text-gray-500 py-10">
          No answers found.
        </div>
      </div>
    </section>
  </PageComponent>
</template>
