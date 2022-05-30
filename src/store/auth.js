import {defineStore} from 'pinia';
export const useStoreAuth = defineStore({
    id: 'storeAuth',
    state: ()=>({
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false,
    }),
    getters:{
        getToken:(state)=> state.token,
        getIsLogin:(state)=> state.isLogin,
    },
    actions:{
        setToken(token){
            this.token = token;
        },
        setIsLogin(isLogin){
            this.isLogin = isLogin;
        }
        
    }

});
