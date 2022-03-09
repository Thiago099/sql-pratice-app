
<template>
<div class="row">
    <div class="row">
        <div class="col-lg-3 col-md-6" v-for="(group, index) in group_list" :key="group">
            <div class="card">
                <div class="card-body">
                    <label>Name:</label>
                    <input type="text" class="form-control" v-model="group.name">
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
            <a class="btn btn-info" style="float:right;margin-bottom:10px" @click="save">Save</a>
        </div>  
    </div>
</div>
    
</template>
<script>
export default {
    name: 'GroupRegister',
    created(){
      this.update()
    },
    computed:{
      group_list(){
          return this.groups.filter(item => item.delete != true);
      }
    },
    methods:{
        save(){
            for(const i in this.groups)
            {
                if(this.groups[i].delete == true){
                    this.axios('/group/' + this.groups[i].id,'delete')
                }else{
                    this.axios('/group','post',{data:this.groups[i]})
                }
            }
        },
        add(){
            this.groups.push({
                name: '',
            });
        },
        del(index, group){
            if(this.groups.id != undefined){
                this.groups.splice(index, 1);
            }else{
                group.delete = true
            }
        }
    }
}
</script>
