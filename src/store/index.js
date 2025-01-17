import {createStore} from "vuex";
import axiosClient from "../axios.js";

const tmpSurveys =[
  {
    id: 100,
    title: "The Title Content",
    slug: "the-title-content",
    status: "draft",
    image: "https://pbs.twimg.com/profile_images/1118059535003017221/9ZwEYqj2_400x400.png",
    description: "Test TEST Test",
    updated_at: "2025-01-10 12:00:00",
    created_at: "2025-01-10 10:00:00",
    expire_date: "2025-01-18 10:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        question: "From which country are you?",
        description: null,
        data: {
          options:[
            {uuid : "9973b372-e8ab-4da6-b500-22ad86daf3b1", text: "USA"}
          ]
        }
      }
    ]
  }
];

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    surveys: [...tmpSurveys],
  },
  getters: {},
  actions: {
    register({ commit }, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data);
          return data;
        })
    },
    logout({ commit }) {
      return axiosClient.post('/logout')
        .then((response) => {
          commit('logout');
          return response;
        })
    }
  },
  mutations: {
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem('TOKEN', userData.token);
    }
  },
  modules: {}
})

export default store
