<template>
    <div class="row">
        <div class="col-md-3 col-sm-6"  v-for="veb in verb" :key="veb">
            <div class="card">  
                <div class="card-body">
                    <div class="form-group">
                        <label>Name:</label>
                        <input class="form-control" v-model="veb.name" :id="id"/>
                        <div class="form-group" v-for="verb_parameters in veb.verb_parameters" :key="verb_parameters">
                            <label class="magenta">Parameter:</label>
                            <select class="form-select" v-model="verb_parameters.id_entity">
                            <option 
                                v-for="ent in entity" :key="ent.id" :value="ent.id"
                                >
                            {{ ent.name }}
                            </option>
                        </select>
                    </div>
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

</style>