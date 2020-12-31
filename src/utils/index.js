import store from '@/store'

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));

export const getToken = () => store.state.token
