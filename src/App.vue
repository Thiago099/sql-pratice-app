<template>
    <div class="container">
        <div class="tabs" v-for="route in routes" :key="route.path">
            <router-link :to="route.path" class="nav-link">{{ route.name }}</router-link>
        </div>
  <router-view style="margin-bottom:50px" />
    </div>
    
</template>
<script>
import router from './global/router'


export default {
    name: 'App',
    data(){
        return{
            routes:router.options.routes,
        }
    },
    computed:{
        current_color(){
            return this.routes.find(route => route.path == this.$route.path).color
        }
    },
    
}
</script>

<style scoped>
.tabs{
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
}
.nav-link{  
    border:1px solid rgb(85, 85, 85);
    border-radius: 5px;
    margin-left: 5px;
    color:white;
    background-color: rgb(36, 36, 36);
}
.router-link-exact-active{
    color:v-bind(current_color);
    border-bottom: 2px solid v-bind(current_color);
    }
</style>