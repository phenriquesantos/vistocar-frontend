import Vue from 'vue';
import axios from 'axios';

const instace = axios.create({
    baseURL: process.env.VUE_APP_API_URI,
    headers: {
        'Content-Type': 'application/json'
    }
});

Vue.axios = instace;

export default instace;