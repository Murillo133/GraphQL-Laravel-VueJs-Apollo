

require('./bootstrap');

window.Vue = require('vue');


Vue.component('vehicle-component', require('./components/vehicles/VehicleComponet.vue').default);

import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
    uri: 'http://localhost:8000/graphql',

})

const apolloProvider = new VueApollo({
    defaultClient : apolloClient,
})

const app = new Vue({
    el: '#app',
    apolloProvider,
});
