<template>
    <div class="row">
        <div>
            <a class="btn btn-info btn-submit" style="margin-top:-50px" @click="save">Save</a>
        </div>
        <div v-for="(verb_g, vex) in grouped_verbs" :key="verb_g" class="row" style="margin-top:30px">
        <h3 class="red">{{ capitlizeFirst(group[vex].name) }}:</h3>
        <div class="col-lg-6 col-md-12"  v-for="(veb, index) in verb_g.filter(item=>item.delete != true)" :key="veb">
            <div class="card">  
                <div class="card-body">
                    <div class="form-group">
                        <label class="yellow">Name:</label>
                        <input class="form-control yellow" v-model="veb.name" :id="id"/>
                    </div>
                    <multi-select 
                        :data="veb.verb_parameter" 
                        @data="veb.veb_parameters = $event.target.value"
                        label="Parameter"
                        color="magenta"
                        field="id_entity"
                        :list_data="entities"
                        :show_text="true"
                        :group="group"	
                        :name_source="entity"
                    >
                    </multi-select>
                    <multi-select 
                        :data="veb.verb_entity" 
                        @data="veb.verb_entity = $event.target.value"
                        label="Entity"
                        color="cyan"
                        field="id_entity"
                        :list_data="entities"
                        :group="group"	
                        :name_source="entity"
                    >
                    </multi-select>
                </div>
                <div class="card-footer">
                    <select 
                        class="form-select red" 
                        style="width:50%;display:inline"
                        :value="veb.id_group"
                        @change="changeGroup(veb, $event.target.value)"
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
                        @click="add(verb_g, vex)"
                        v-if="index == verb_g.filter(item=>item.delete != true).length-1"
                    >
                        <i class="fa fa-plus"/>
                    </button>
                    <button 
                        class="btn btn-danger" 
                        type="button"
                        @click="del(verb_g, veb)"
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
                @click="add(verb_g,vex)"
                style="margin-top:10px"
                v-if="verb_g.filter(item=>item.delete != true).length == 0"
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
import MultiSelect from '../components/multiselect.vue';
export default {
    name: 'VerbRegister',
    components: {
        MultiSelect,
    },
    methods:{
        save(){
            for(const i in this.grouped_verbs){
                for(const j in this.grouped_verbs[i])
                {
                    if(this.grouped_verbs[i][j].delete == true)
                    {
                        if(this.grouped_verbs[i][j].id != null)
                        {
                            this.axios('/verb/' + this.grouped_verbs[i][j].id,'delete')
                        }
                    }
                    else
                    {
                        this.axios('/verb','post',{data:this.grouped_verbs[i][j]})
                    }
                }
            }
            this.update()
        },
        del(verb, veb){
            veb.delete = true;
        },  
        add(verb, index){
            
            verb.push({
                name: '',
                verb_parameter: [],
                verb_entity: [],
                id_group: index
            })
        },
        changeGroup(veb, id_group){
            this.grouped_verbs[veb.id_group].splice(this.grouped_verbs[veb.id_group].findIndex(item => item.id = veb.id), 1);
            this.grouped_verbs[id_group].push(veb)
            veb.id_group = id_group;
        },
    },
    created(){
      this.update()
    },
    computed:{
        maxIndex(){
            let max_index = 0
            for(const cur in this.verb){
                if(this.verb[cur].id > max_index){
                    max_index = this.verb[cur].id
                }
            }
            return max_index
        },
        filteredVerbs(){
            return this.filterObject(this.verb, item=>item.delete != true)
        }
    }
}
</script>

<style scoped>

</style>