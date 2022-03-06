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

.tabs{
    display: inline-block;
    margin-top: 10px;
}
.nav-link{
    border:1px solid #ddd;
    border-radius: 5px;
    margin-left: 5px;
}
.router-link-exact-active{
    color:red;
    border-bottom: 2px solid rgb(255, 0, 0);
}
</style>