import {defineStore} from 'pinia';
// export const useCounterStore = defineStore('counter', {
//     state: () => ({ count: 0 }),
//     actions: {
//       increment() {
//         this.count++;
//       },
//     },
//   });
  
export const useCounterStore = defineStore({
    id: 'counter',
    state: ()=>({
        count: 0
    }),
    getters:{
        getCount:(state)=> state.count,
        doubleCount:(state)=> state.count * 2,
        divideBy:(state)=> (divisor) => state.count / divisor,
    },
    actions:{
        increment(){
            this.count++;
        },
        decrement(){
            this.count--;
        },
        incrementBy(amount){
            this.count += amount;
        },
    }

});
