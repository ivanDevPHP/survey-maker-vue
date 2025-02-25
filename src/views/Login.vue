<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
         alt="Your Company"/>
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit="login">
      <Alert v-if="errorMsg">
        {{ errorMsg }}
        <span @click="errorMsg = ''"
              class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </span>
      </Alert>

      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900">Email Address</label>
        <div class="mt-2">
          <input type="email" name="email" id="email" autocomplete="email" v-model="user.email" required=""
                 class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input type="password" name="password" id="password" autocomplete="current-password" v-model="user.password"
                 required=""
                 class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
        </div>
      </div>

      <div>
        <button
          :disabled="loading"
          type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}"
        >
          <svg v-if="loading" class="size-5 text -blue-500 animate-spin mr-2" xmlns="http://www.w3.org/2000/svg"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 2a10 10 0 1 1-6.32 17.66"/>
          </svg>
          Sign in
        </button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm/6 text-gray-500">
      Not a member?
      {{ ' ' }}
      <router-link :to="{name: 'Register'}" class="font-semibold text-indigo-600 hover:text-indigo-500">Register For
        Free
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
  email: '',
  password: ''
};

let loading = ref(false);
let errorMsg = ref('');

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
