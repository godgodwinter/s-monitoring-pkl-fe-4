import {defineStore} from 'pinia';
export const useStoreSettings = defineStore({
    id: 'settings',
    state: ()=>({
        dataSettings: false,
    }),
    getters:{
        getDataSettings:(state)=> state.dataSettings,
    },
});
