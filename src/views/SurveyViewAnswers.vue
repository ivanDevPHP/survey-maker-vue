<script setup>
import store from "../store/index.js";
import {ref, watch, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import PageComponent from "../components/PageComponent.vue";
import BarChart from '../components/Charts/BarChart.vue'
import PieChart from '../components/Charts/PieChart.vue'


const route = useRoute();

const answers = computed(() => store.state.answers);
store.dispatch('getSurveyAnswers', route.params.id);
const generateColors = (count) => {
  const colors = []
  for (let i = 0; i < count; i++) {
    const hue = (i * 360 / count) % 360
    colors.push(`hsl(${hue}, 70%, 60%)`)
  }
  return colors
}
const getChartData = (answers, type) => {
  const grouped = {}

  answers.forEach((answer) => {
    let processed = answer

    // Parse checkbox JSON strings
    if (type === 'checkbox') {
      try {
        processed = JSON.parse(answer)
      } catch (e) {
        processed = []
      }
    }

    if (Array.isArray(processed)) {
      processed.forEach((a) => {
        grouped[a] = (grouped[a] || 0) + 1
      })
    } else {
      grouped[processed] = (grouped[processed] || 0) + 1
    }
  })

  const labels = Object.keys(grouped)
  const values = Object.values(grouped)
  const backgroundColors = generateColors(labels.length)

  return {
    labels,
    datasets: [{
      label: 'Answers',
      data: values,
      backgroundColor: backgroundColors
    }]
  }
}
</script>

<template>
  <PageComponent title="Result">
    <div v-if="!answers.loading" class="space-y-8">
      <div v-for="(item, questionId) in answers.data" :key="questionId" class="p-4 rounded-lg shadow bg-white">
        <h2 class="text-xl font-semibold mb-4">{{ item.question }}</h2>

        <template v-if="item.type === 'radio' || item.type === 'select'">
          <PieChart :chart-data="getChartData(item.answers, item.type)" />
        </template>

        <template v-else-if="item.type === 'checkbox'">
          <BarChart :chart-data="getChartData(item.answers, item.type)" />
        </template>

        <!-- Textual answers -->
        <template v-else-if="['text', 'textarea'].includes(item.type)">
          <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li v-for="(answer, index) in item.answers.filter(a => a)" :key="index">{{ answer }}</li>
          </ul>
        </template>

        <!-- Fallback -->
        <template v-else>
          <p class="text-gray-500 italic">Unsupported question type: {{ item.type }}</p>
        </template>
      </div>
    </div>
  </PageComponent>
</template>

<style scoped>

</style>
