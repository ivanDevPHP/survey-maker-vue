<script setup>
import {ref, computed} from "vue";
import { v4 as uuidv4 } from "uuid";
import store from "../../store";


const props = defineProps({
  question: Object,
  index: Number,
})

const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

//Clone date to avoid unintentional reference change
const model = ref(JSON.parse(JSON.stringify(props.question)));

// Get question types from vuex
const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function shouldHaveOptions(){
  return ["select", "radio", "checkbox"].includes(model.value.type);
}

function getOptions(){
  return model.value.data.options;
}

function setOptions(options){
  model.value.data.options = options;
}

function addOption(){
  setOptions([
    ...getOptions(),
    { uuid: uuidv4(), text: "" },
  ]);
  dataChange();
}

function removeOption(op){
  setOptions(getOptions().filter((opt) => opt !== op));
  dataChange();
}

function typeChange(){
  if(shouldHaveOptions()){
    setOptions(getOptions() || []);
  }
  dataChange();
}

function dataChange(){
  const data = JSON.parse(JSON.stringify(model.value));
  if(!shouldHaveOptions()){
    delete data.data.options;
  }

  emit("change", data);
}

function addQuestion(){
  emit("addQuestion", props.index + 1);
}

function deleteQuestion(){
  emit("deleteQuestion", props.question);
}


</script>

<template>
  <!-- Question Index -->
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold">
      {{ index + 1 }}. {{ model.question }}
    </h3>

    <div class="flex items-center">
      <!--  Add new question    -->
      <button
        type="button"
        @click="addQuestion()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          mr-2
          rounded-sm
          text-white
          bg-gray-600
          hover:bg-gray-700
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
        </svg>
      </button>
      <!-- END Add new question    -->

      <!--  Delete question    -->
      <button
        type="button"
        @click="deleteQuestion()"
        class="
          flex
          items-center
          text-xs
          py-1
          px-3
          rounded
          border border-transparent
          text-red-500
          hover:border-red-600
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
        </svg>

        Delete
      </button>
      <!-- END Delete question    -->
    </div>
  </div>
  <!-- END Question Index -->

  <div class="grid grid-cols-12 gap-3 items-center">
    <!-- Question -->
    <div class="col-span-9">
      <label :for="'question_text_' + model.id" class="block text-sm font-medium text-gray-700">
        Question Text
      </label>
      <input
        type="text"
        :name="'question_text_' + model.id"
        v-model="model.question"
        @change="dataChange"
        :id="'question_text_' + model.id"
        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
      />
    </div>

    <!-- Question Type -->
    <div class="col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-700">
        Select Question Type
      </label>
      <select
        id="question_type"
        name="question_type"
        v-model="model.type"
        @change="typeChange"
        class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
      >
        <option v-for="type in questionTypes" :key="type" :value="type">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
  </div>


  <!--  Question Description    -->
  <div class="mt-3 col-span-9">
    <label
      :for="'question_description_' + model.id"
      class="block text-sm font-medium text-gray-700">Description
    </label>
    <textarea
      :name="'question_description_' + model.id"
      v-model="model.description"
      @change="dataChange"
      :id="'question_description_' + model.id"
      class="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
    />
  </div>
  <!-- END Question Description    -->

  <!-- Data -->
    <div>
      <div v-if="shouldHaveOptions()" class="mt-2">
        <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
          Options
          <!-- Add new option -->
          <button
            type="button"
            @click="addOption()"
            class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Option
          </button>
          <!--/ Add new option -->
        </h4>

        <div
          v-if="!model.data.options.length"
          class="text-xs text-gray-600 text-center py-3"
        >
          You don't have any options defined
        </div>
        <!-- Option List -->
        <div
          v-for="(option, index) in model.data.options"
          :key="option.uuid"
          class="flex items-center mb-1"
        >
          <span class="w-6 text-sm"> {{ index + 1 }}. </span>
          <input
            type="text"
            v-model="option.text"
            @change="dataChange"
            class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          />
          <!--  Delete question    -->
          <button
            type="button"
            @click="removeOption(option)"
            class="
              h-6
              w-6
              rounded-full
              flex
              items-center
              justify-center
              border border-transparent
              text-red-500
              hover:border-red-600
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                 class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
            </svg>
          </button>
          <!-- END Delete question    -->
        </div>
        <!--/ Option List -->
      </div>
    </div>
  <!-- END Data -->

  <hr class="my-4" />
</template>

<style scoped>

</style>
