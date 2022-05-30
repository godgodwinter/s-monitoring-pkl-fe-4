import {defineStore} from 'pinia';




export const useStoreAdminBar = defineStore({
    id: 'storeAdminBar',
        state: () => ({ 
            isSidebarActive:false,
            pagesActive:'' ,
            pagesSubSideBarActive:'' ,
            kataBijak:[]
        }),
    // state: ()=>({
    //     isSidebarActive: false,
    // }),
    getters:{
        getIsSidebarActive:(state)=> state.isSidebarActive,
        getPagesActive:(state)=> state.pagesActive,
        getPagesSubSideBarActive:(state)=> state.pagesSubSideBarActive,
        getKataBijak:(state)=> state.kataBijak,
    },
    actions:{
        toggleSideBar(){
            this.isSidebarActive = !this.isSidebarActive;
        },
        setPagesActive(pages){
            this.pagesActive = pages;
        },
        setPagesSubSideBarActive(pages){
            this.pagesSubSideBarActive = pages;
        },
        setKataBijak(kataBijak){
            this.kataBijak = kataBijak;
        }   
    }
});
