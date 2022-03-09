<template>
    <div class="row" >
        <div v-for="(entity_g, enx) in grouped_entities" :key="entity_g" class="row">
            <h2>{{ capitlizeFirst(group[enx].name) }}:</h2>
            <div class="col-lg-3 col-md-6"  v-for="(ent, index) in entity_g.filter(item=>item.delete != true)" :key="ent">
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
                    <div class="card-footer">
                    <button 
                        class="btn btn-success" 
                        type="button"
                        @click="add(entity_g, enx)"
                        v-if="index == entity_g.filter(item=>item.delete != true).length-1"
                    >
                        <i class="fa fa-plus"/>
                    </button>
                    <button 
                        class="btn btn-danger" 
                        type="button"
                        @click="del(entity_g, ent)"
                    >
                        <i class="fa fa-trash"/>
                    </button>
                    
                    </div>
                </div>
            </div>
            <div>
            <button 
                class="btn btn-success" 
                type="button"
                @click="add(entity_g,enx)"
                v-if="entity_g.filter(item=>item.delete != true).length == 0"
            >
                <i class="fa fa-plus"/>
                    </button>
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
            for(const i in this.grouped_entities){
                for(const j in this.grouped_entities[i])
                {
                    if(this.grouped_entities[i][j].delete == true){
                        this.axios('/entity/' + this.grouped_entities[i][j].id,'delete')
                    }else{
                        this.axios('/entity','post',{data:this.grouped_entities[i][j]})
                    }
                }
            }
        },
        del(entity, ent){
            if(ent.id == undefined)
            {
                entity.splice(entity.findIndex(item => item.id = ent.id), 1);
            }
            else
            {
                ent.delete = true;
            }
        },  
        add(entity,enx){
            
            entity.push({
                name: '',
                generalization: [],
                verb_entities: [],
                id_group: enx,
            })
        },
    },
    computed:{
        maxIndex(){
            let max_index = 0
            for(const i in this.entity)
            {
                if(this.entity[i].id > max_index)
                {
                    max_index = this.entity[i].id
                }
            }
            return max_index
        },
        filteredEntities()
        {
            return this.filterObject(this.entity, item=>item.delete != true)
        }
    }
}
</script>

<style scoped>



</style>
