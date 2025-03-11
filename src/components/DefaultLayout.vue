<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-gray-100">
    <body class="h-full">
    ```
  -->
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <img class="size-8" src="/survey-icon.png"
                   alt="Your Company"/>
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[
                    $route.name === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  ]"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button type="button"
                      class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span class="absolute -inset-1.5"/>
                <span class="sr-only">View notifications</span>
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div>
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="absolute -inset-1.5"/>
                    <span class="sr-only">Open user menu</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="size-6 text-white">
                      <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                    </svg>
                  </MenuButton>
                </div>
                <transition enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95"
                            enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <MenuItem v-slot="{ active }">
                      <a @click="logout" :class="['block px-4 py-2 text-sm text-gray-700 cursor-pointer']">Sign Out</a>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-0.5"/>
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true"/>
              <XMarkIcon v-else class="block size-6" aria-hidden="true"/>
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            :class="[
                $route.name === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
            ]"
          >
            {{ item.name }}
          </router-link>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
              </svg>
            </div>
            <div class="ml-3">
              <div class="text-base/5 font-medium text-white">{{ user.name }}</div>
              <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
            </div>
            <button type="button"
                    class="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="absolute -inset-1.5"/>
              <span class="sr-only">View notifications</span>
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton @click="logout"
                              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer">
              Sign Out
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>
    <Notification/>
  </div>
</template>

<script>
import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {Bars3Icon, XMarkIcon} from '@heroicons/vue/24/outline'
import {useStore} from "vuex";
import {computed} from "vue";
import {useRouter} from "vue-router";
import Notification from "./Notification.vue";

const navigation = [
  {name: 'Dashboard', to: {name: "Dashboard"}},
  {name: 'Surveys', to: {name: "Surveys"}},
  {name: 'Logs', to: {name: "Logs"}},
]
export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Bars3Icon,
    XMarkIcon,
    Notification
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.dispatch("logout")
        .then(() => {
          router.push({
            name: "Login",
          });
        });
    }

    return {
      user: computed(() => store.state.user.data),
      navigation,
      logout
    }
  }
}

</script>
