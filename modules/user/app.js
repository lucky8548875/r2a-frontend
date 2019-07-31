import 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js'

import data from './app/data.js'
import computed from './app/computed.js'
import methods from './app/methods.js'
import watch from './app/watch.js'

new Vue({
    el: '#app',
    data,
    computed,
    methods,
    watch,

    // Lifecycles
    mounted: function () {
        this.loadUsers()

        if (!localStorage.getItem('credentials')) {
            window.location = '/modules/login'
        }
        else if(!this.isAdmin){
            window.location = '/modules/switch'
        }
        
    }

})