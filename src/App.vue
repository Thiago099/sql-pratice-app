<template>
    <div class="container">
        <div class="tabs" v-for="route in routes" :key="route.path">
            <router-link :to="route.path" class="nav-link">{{ route.name }}</router-link>
        </div>
  <router-view style="margin-bottom:50px" />
    </div>
</template>
<script>
import router from './router'
export default {
    name: 'App',
    data(){
        return{
            routes:router.options.routes
        }
    }
}
</script>

<style scoped>
.router-link-exact-active{
    color:red;
}
.tabs{
    display: inline-block;
    margin-top: 10px;
}
</style>