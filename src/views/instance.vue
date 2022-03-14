
<template>
<div>
    <div class="row">
        <div>
            <a class="btn btn-info btn-submit" style="margin-top:-50px" @click="save">Save</a>
        </div>
        <div v-for="(instance_g, enx) in grouped_process_entities" :key="instance_g" class="row" style="margin-top:30px">
            <h3 class="blue">{{ capitlizeFirst(process[enx].name) }}:</h3>
        <div class="col-lg-3 col-md-6" v-for="(group_d, index) in instance_g.filter(item => item.delete != true)" :key="group_d">
            <div class="card">
                <div class="card-body">
                    <label :class="color">Name:</label>
                        <div class="form-group">
                            <input type="text" :class="color" class="form-control" v-model="group_d.name">
                        </div>
                        <div style="margin-top:15px">
                            <group-select
                            color="cyan"
                            :value="group_d.generalization[0].id_parent"
                            @input="(value)=> {group_d.generalization[0].id_parent = value;group_d.id_group = entity[value].id_group}"
                            :data="entities"
                            field="id"
                            :name_source="entity"
                            :group="group"
                            >
                            </group-select>
                        </div>
                </div>
                <div class="card-footer">
                <button 
                    class="btn btn-success" 
                    type="button"
                    @click="add(instance_g, enx)"
                    v-if="index == instance_g.filter(item => item.delete != true).length-1"
                >
                    <i class="fa fa-plus"/>
                </button>
                <button 
                    class="btn btn-danger" 
                    type="button"
                    @click="del(index, group_d)"
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
                @click="add(instance_g, enx)"
                style="margin-top:10px"
                v-if="instance_g.filter(item => item.delete != true).length == 0"
            >
                <i class="fa fa-plus"/>
            </button>
        </div>
        </div>
        <div>
            <a class="btn btn-info btn-submit" @click="save">Save</a>
        </div>  
    </div>
</div>
    
</template>
<script>
import GroupSelect from '../components/group-select.vue'
export default {
    name: 'SimpleCrud',
    components:{
        GroupSelect
  },
    data(){
        return {
            color: 'green-blue',
            name: "instance",
            save_name: "entity",
        }
    },
    created(){
      this.update()
    },
    computed:{
      group_list(){
          return this[this.name+'s'].filter(item => item.delete != true);
      }
    },
    methods:{
        async save(){
            for(const i in this.grouped_process_entities)
            {
                for(const j in this.grouped_process_entities[i])
                {
                    if(this.grouped_process_entities[i][j].delete == true)
                    {
                        if(this.grouped_process_entities[i][j].id != null)
                        {
                            await new Promise(
                                resolve => this.axios(
                                    `/${this.save_name || this.name}/` + this.grouped_process_entities[i][j].id,
                                    'delete',
                                    {
                                        callback: () => resolve()
                                    }
                                )
                            )
                        }
                    }
                    else
                    {
                        console.log(this.grouped_process_entities[i][j])
                        await new Promise(
                            resolve => this.axios(
                                `/${this.save_name || this.name}`,
                                'post',
                                {
                                    data:this.grouped_process_entities[i][j],
                                    callback: () => resolve()
                                }
                            )
                        )
                    }
                }
            }
            this.update()
        },
        add(instance_g, enx){
            instance_g.push({
                name: '',
                generalization: [{
                    id_parent: null,
                }],
                id_process:enx,
                instance:1,
                verb_entity:[]
            });
        },
        del(index, group){
            group.delete = true
        }
    }
}
</script>
