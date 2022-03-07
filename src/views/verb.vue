<template>
    <div class="row">
        <div class="col-md-6 col-sm-12"  v-for="veb in verb" :key="veb">
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
                    class="btn btn-danger" 
                    type="button"
                >
                    <i class="fa fa-trash"/>
                </button>
                <button 
                    class="btn btn-success" 
                    type="button"
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
    name: 'VerbRegister',
    components: {
        MultiSelect,
    },
    methods:{
        save(){
            for(const cur in this.verb){
                this.axios('/verb','post',{data:this.verb[cur]})
            }
        }
    },
    created(){
      this.update()
    },
}
</script>

<style scoped>

</style>