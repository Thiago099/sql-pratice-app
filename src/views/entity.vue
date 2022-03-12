<template>
    <div class="row" >
        <div>
            <a class="btn btn-info btn-submit" style="margin-top:-50px" @click="save">Save</a>
        </div>
        <div v-for="(entity_g, enx) in grouped_entities" :key="entity_g" class="row" style="margin-top:30px">
            <h3 class="red">{{ capitlizeFirst(group[enx].name) }}:</h3>
            <div class="col-lg-3 col-md-6"  v-for="(ent, index) in entity_g.filter(item=>item.delete != true)" :key="ent">
                <div class="card">  
                    <div class="card-body">
                        <div class="form-group">
                            <label class="cyan">Name:</label>
                            <input class="form-control cyan" v-model="ent.name" :id="id"/>
                        </div>
                        <multi-select 
                            :data="ent.generalization" 
                            @data="ent.generalization = $event.target.value"
                            label="Generalzation"
                            color="green"
                            field="id_parent"
                            :list_data="entities"
                            :group="group"	
                            :name_source="entity"
                        >
                        </multi-select>

                        <multi-select 
                            :data="ent.verb_entity" 
                            @data="ent.verb_entity = $event.target.value"
                            label="Verb"
                            color="yellow"
                            field="id_verb"
                            :list_data="verbs"
                            :group="group"	
                            :name_source="verb"
                        >
                        </multi-select>
                    </div>
                    <div class="card-footer">
                        <select 
                            class="form-select red" 
                            style="width:50%;display:inline"
                            :value="ent.id_group"
                            @change="changeGroup(ent, $event.target.value)"
                        >
                            <option 
                            v-for="group in groups" 
                            :key="group" 
                            :value="group.id"
                            
                            >{{ group.name }}</option>
                        </select>
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
                style="margin-top:10px"
                @click="add(entity_g,enx)"
                v-if="entity_g.filter(item=>item.delete != true).length == 0"
            >
                <i class="fa fa-plus"/>
                    </button>
            </div>
        </div>
        <div>
            <a class="btn btn-info btn-submit" @click="save">Save</a>
        </div>
    </div>
</template>
<script>
import MultiSelect from '../components/multi-select.vue';
export default {
    name: 'EntityRegister',
    components: {
        MultiSelect,
    },
    created(){
        this.update()
    },
    methods:{
        async save(){
            for(const i in this.grouped_entities){
                for(const j in this.grouped_entities[i])
                {
                    if(this.grouped_entities[i][j].delete == true)
                    {
                        if(this.grouped_entities[i][j].id != null)
                        {
                            await new Promise
                            (
                                resolve => this.axios(
                                    '/entity/' + this.grouped_entities[i][j].id,
                                    'delete',
                                    {
                                        callback:() => resolve()
                                    }
                                )
                            )
                        }
                    }
                    else
                    {
                        await new Promise(resolve=>this.axios('/entity','post',{data:this.grouped_entities[i][j],callback:()=>(resolve())}))
                    }
                }
            }
            this.update()
        },
        del(entity, ent){
            ent.delete = true;
        },  
        add(entity,enx){
            
            entity.push({
                name: '',
                generalization: [],
                verb_entity: [],
                id_group: enx,
            })
        },
        changeGroup(ent, id_group){
            this.grouped_entities[ent.id_group].splice(this.grouped_entities[ent.id_group].findIndex(item => item == ent), 1);
            this.grouped_entities[id_group].push(ent)
            ent.id_group = id_group;
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
        },
        
    }
}
</script>

<style scoped>



</style>
