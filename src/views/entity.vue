<template>
    <div class="row">
        <div class="col-md-3 col-sm-6"  v-for="(ent, index) in filterObject(entity, item=>item.delete != true)" :key="ent">
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
                    class="btn btn-danger" 
                    type="button"
                    @click="del(index)"
                >
                    <i class="fa fa-trash"/>
                </button>
                <button 
                    class="btn btn-success" 
                    type="button"
                    @click="add()"
                >
                    <i class="fa fa-plus"/>
                </button>
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
                if(this.entity[cur].delete == true){
                    this.axios('/entity/'+this.entity[cur].id,'delete')
                }else{
                    this.axios('/entity','post',{data:this.entity[cur]})
                }
            }
        },
        del(index){
            if(this.entity[index].id == undefined)
            {
                delete this.entity[index];
            }
            else
            {
                this.entity[index].delete = true;
            }
        },  
        add(){
            let max_index = 0
            for(const i in this.entity)
            {
                if(i > max_index)
                {
                    max_index = i
                }
            }
            this.entity[max_index+1] = {
                name: '',
                generalization: [],
                verb_entities: [],
            }
        },
    }
}
</script>

<style scoped>



</style>
