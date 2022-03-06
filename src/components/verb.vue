<template>
    <div class="row">
        <div class="col-6"  v-for="veb in verb" :key="veb">
            <div class="card">  
                <div class="card-body">
                    <div class="form-group">
                        <label>Name:</label>
                        <input class="form-control" v-model="veb.name" :id="id"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VerbRegister',
}
</script>

<style scoped>
.card {
    margin-top: 10px;
}

</style>