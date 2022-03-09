<template>
    <div class="row">
        <div class="col-md-6 col-sm-12"  v-for="(veb, index) in filteredVerbs" :key="veb">
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
                    @click="add()"
                    v-if="index == maxIndex"
                >
                    <i class="fa fa-plus"/>
                </button>
                <button 
                    class="btn btn-danger" 
                    type="button"
                    @click="del(index)"
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
                @click="add()"
                v-if="Object.keys(filteredVerbs).length == 0"
            >
                <i class="fa fa-plus"/>
            </button>
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
            for(const cur in this.verb){
                if(this.verb[cur].delete == true){
                    this.axios('/verb/'+this.verb[cur].id,'delete')
                }else{
                    this.axios('/verb','post',{data:this.verb[cur]})
                }
            }
        },
        del(index){
            if(this.verb[index].id == undefined)
            {
                delete this.verb[index];
            }
            else
            {
                this.verb[index].delete = true;
            }
        },  
        add(){
            
            this.verb[this.maxIndex+1] = {
                name: '',
                verb_parameters: [],
            }
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