<template>
    <div class="row">
        <div v-for="(verb_g, vex) in grouped_verbs" :key="verb_g" class="row">
        <h2>{{ capitlizeFirst(group[vex].name) }}:</h2>
        <div class="col-lg-6 col-md-12"  v-for="(veb, index) in verb_g.filter(item=>item.delete != true)" :key="veb">
            <div class="card">  
                <div class="card-body">
                    <div class="form-group">
                        <label class="yellow">Name:</label>
                        <input class="form-control" v-model="veb.name" :id="id"/>
                    </div>
                    <multi-select 
                        :data="veb.verb_parameters" 
                        @data="veb.veb_parameters = $event.target.value"
                        label="Parameter"
                        color="magenta"
                        field="id_entity"
                        :list_data="entity"
                        :show_text="true"
                    >
                    </multi-select>
                </div>
                <div class="card-footer">
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
                v-if="verb_g.filter(item=>item.delete != true).length == 0"
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
    name: 'VerbRegister',
    components: {
        MultiSelect,
    },
    methods:{
        save(){
            for(const i in this.grouped_verbs){
                for(const j in this.grouped_verbs[i])
                {
                    if(this.grouped_verbs[i][j].delete == true){
                        this.axios('/verb/' + this.grouped_verbs[i][j].id,'delete')
                    }else{
                        this.axios('/verb','post',{data:this.grouped_verbs[i][j]})
                    }
                }
            }
        },
        del(verb, veb){
            if(veb.id == undefined)
            {
                verb.splice(verb.findIndex(item=>item.id == veb.id), 1);
            }
            else
            {
                veb.delete = true;
            }
        },  
        add(verb, index){
            
            verb.push({
                name: '',
                verb_parameters: [],
                id_group: index
            })
        }
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