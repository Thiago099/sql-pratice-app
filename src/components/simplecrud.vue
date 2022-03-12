
<template>
<div>
    <div class="row">
        <div>
            <a class="btn btn-info btn-submit" style="margin-top:-50px" @click="save">Save</a>
        </div>
        <div class="col-lg-3 col-md-6" v-for="(group, index) in group_list" :key="group">
            <div class="card">
                <div class="card-body">
                    <label :class="color">Name:</label>
                    <input type="text" class="form-control" :class="color" v-model="group.name">
                </div>
                <div class="card-footer">
                <button 
                    class="btn btn-success" 
                    type="button"
                    @click="add()"
                    v-if="index == group_list.length-1"
                >
                    <i class="fa fa-plus"/>
                </button>
                <button 
                    class="btn btn-danger" 
                    type="button"
                    @click="del(index, group)"
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
                style="margin-top:10px"
                v-if="group_list.length == 0"
            >
                <i class="fa fa-plus"/>
            </button>
        </div>
        <div>
            <a class="btn btn-info btn-submit" @click="save">Save</a>
        </div>  
        {{this}}
    </div>
</div>
    
</template>
<script>
export default {
    name: 'SimpleCrud',
    props:{
        color:{
            type: String,
            default: 'red'
        },
        name:{
            type: String,
            default: 'group'
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
            for(const i in this[this.name+'s'])
            {
                if(this[this.name+'s'][i].delete == true)
                {
                    if(this[this.name+'s'][i].id != null)
                    {
                        await new Promise(
                            resolve => this.axios(
                                `/${this.name}/` + this[this.name+'s'][i].id,
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
                    await new Promise(
                        resolve => this.axios(
                            `/${this.name}`,
                            'post',
                            {
                                data:this[this.name+'s'][i],
                                callback: () => resolve()
                            }
                        )
                    )
                }
            }
            this.update()
        },
        add(){
            this[this.name+'s'].push({
                name: '',
            });
        },
        del(index, group){
            group.delete = true
        }
    }
}
</script>
