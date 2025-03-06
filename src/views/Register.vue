<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="/survey-icon.png"
         alt="Your Company"/>
    <h2 class="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Register for free</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit="register">
      <Alert v-if="Object.keys(errors).length" class="flex-col items-stretch text-sm">
        <div v-for="(field, id) of Object.keys(errors)" :key="i">
          <div v-for="(error, ind) of errors[field] || []" :key="ind">
            * {{ error }}
          </div>
        </div>
      </Alert>
      <div>
        <label for="fullname" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
        <div class="mt-2">
          <input type="text" name="name" id="fullname" autocomplete="name" required="" v-model="user.name"
                 class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
        <div class="mt-2">
          <input type="email" name="email" id="email" autocomplete="email" required="" v-model="user.email"
                 class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" required=""
                 v-model="user.password"
                 class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password_confirmation" class="block text-sm/6 font-medium text-gray-900">Password
            Confirmation</label>
        </div>
        <div class="mt-2">
          <input type="password" name="password_confirmation" id="password_confirmation"
                 autocomplete="current-password_confirmation" v-model="user.password_confirmation" required=""
                 class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button
          :disabled="loading"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white
          shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
          focus-visible:outline-indigo-600"
          :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}">
          <svg v-if="loading" class="size-5 text -blue-500 animate-spin mr-2" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 1 1-6.32 17.66"/>
          </svg>
          Sign Up
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Not a member?
      {{ ' ' }}
      <router-link :to="{name: 'Login'}" class="font-semibold text-indigo-600 hover:text-indigo-500">Login to your
        Account
      </router-link>
    </p>
  </div>
</template>
<script setup>
import store from "../store/index.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import Alert from "../components/Alert.vue"

const router = useRouter();
const user = {
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
};

let loading = ref(false);
const errors = ref({});

function register(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch('register', user)
    .then((res) => {
      loading.value = false;
      router.push({
        name: 'Dashboard'
      })
    })
    .catch(err => {
      loading.value = false;
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      }
    })
}
</script>
