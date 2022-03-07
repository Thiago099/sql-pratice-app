<template>
    <div class="row">
        <div class="col-md-3 col-sm-6"  v-for="ent in entity" :key="ent">
            <div class="card">  
                <div class="card-body">
                    <div class="form-group">
                        <label class="cyan">Name:</label>
                        <input class="form-control" v-model="ent.name" :id="id"/>
                    </div>
                    <multi-select 
                        :data="ent.generalization" 
                        @data="ent.generalization = $event.target.value"
                        label="Generalzation"
                        color="green"
                        field="id_parent"
                        :list_data="entity"
                    >
                    </multi-select>
                    <multi-select 
                        :data="ent.verb_entities" 
                        @data="ent.verb_entities = $event.target.value"
                        label="Verb"
                        color="yellow"
                        field="id_verb"
                        :list_data="verb"
                    >
                    </multi-select>
                </div>
            </div>
        </div>
        <div>
            <a class="btn btn-info" style="float:right;margin-bottom:10px" @click="save">Save</a>
        </div>
    </div>
</template>
<script>
import MultiSelect from '../components/multiselect.vue';
export default {
    name: 'EntityRegister',
    components: {
        MultiSelect,
    },
    created(){
        this.update()
    },
    methods:{
        save(){
            for(const cur in this.entity){
                this.axios('/entity','post',{data:this.entity[cur]})
            }
        }
    }
}
</script>

<style scoped>



</style>
