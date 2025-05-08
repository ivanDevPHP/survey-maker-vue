<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.01]">
      <div class="text-center">
        <img class="mx-auto h-14 w-auto animate-pulse" src="/survey-icon.png" alt="Your Company" />
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">Welcome Back!</h2>
        <p class="mt-2 text-sm text-gray-600">Log in to access your account</p>
      </div>

      <form class="space-y-6" @submit.prevent="login">
        <Alert v-if="errorMsg" variant="destructive" class="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
          <div class="flex items-center justify-between">
            <span class="text-sm text-red-700">{{ errorMsg }}</span>
            <button
              @click="errorMsg = ''"
              class="p-1 rounded-full hover:bg-red-100 transition-colors"
              aria-label="Fechar alerta"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-red-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Alert>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              v-model="user.email"
              required
              class="block w-full rounded-lg border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm transition-all duration-200"
              placeholder="you@email.com"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <div class="mt-1 relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              name="password"
              id="password"
              autocomplete="current-password"
              v-model="user.password"
              required
              class="block w-full rounded-lg border-0 py-2.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            :disabled="loading"
            type="submit"
            class="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <svg v-if="loading" class="h-5 w-5 animate-spin mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 1 1-6.32 17.66" />
            </svg>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Not a member?
        <router-link :to="{name: 'Register'}" class="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">Register For Free</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import store from "../store/index.js";
import {useRouter} from "vue-router";
import {ref} from "vue";
import Alert from "../components/Alert.vue"

const router = useRouter();
const user = {
  email: '',
  password: ''
};

let loading = ref(false);
let errorMsg = ref('');
let showPassword = false;

function login(ev) {
  ev.preventDefault();

  loading.value = true;
  store
    .dispatch('login', user)
    .then((res) => {
      loading.value = false;
      router.push({
        name: 'Dashboard'
      })
    })
    .catch(err => {
      loading.value = false;
      errorMsg.value = err.response.data.error;
    })
}
</script>
