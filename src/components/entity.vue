<template>
    <div class="row">
        <div class="col-md-3 col-sm-6"  v-for="ent in entity" :key="ent">
            <div class="card">  
                <div class="card-body">
                    <div class="form-group">
                        <label>Name:</label>
                        <input class="form-control" v-model="ent.name" :id="id"/>
                    </div>
                    
                    <div class="form-group" v-for="generalization in ent.generalization" :key="generalization">
                            <label class="green">Generalization:</label>
                            <select class="form-select" v-model="generalization.id_parent">
                            <option 
                                v-for="ent in entity" :key="ent.id" :value="ent.id"
                                >
                            {{ ent.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group" v-for="verb_entities in ent.verb_entities" :key="verb_entities">
                            <label class="yellow">Verb:</label>
                            <select class="form-select" v-model="verb_entities.id_verb">
                            <option 
                                v-for="veb in verb" :key="veb.id" :value="veb.id"
                                >
                            {{ veb.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EntityRegister',
}
</script>

<style scoped>



</style>
