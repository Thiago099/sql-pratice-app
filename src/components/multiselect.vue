<template>
    <div v-if="data != undefined">
        <div class="form-group" v-for="(veb_parameters, index) in data.filter(item=>item.delete != true)" :key="veb_parameters">
            <label :class="color">{{ label }}:</label>
            <div class="input-group">
                <input type="text" class="form-control" v-if="show_text" v-model="veb_parameters.name">
                <select class="form-select" v-model="veb_parameters[field]">
                    <option 
                        v-for="ent in list_data" :key="ent.id" :value="ent.id"
                        >
                    {{ ent.name }}
                    </option>
                </select>
                    <button 
                    class="btn btn-danger" 
                    type="button"
                    @click="removeParameter(veb_parameters, index)"
                >
                    <i class="fa fa-trash"/>
                </button>
                <button 
                    class="btn btn-success" 
                    type="button"
                    @click="addParameter(veb_parameters, index)"
                >
                    <i class="fa fa-plus"/>
                </button>
            </div>
        </div>
        
        <div v-if="data.filter(item=>item.delete != 1).length == 0" style="width:100%">
            <label style="float:right;margin-left:10px; width:100%" :class="color">{{ label }}:</label>
            <button 
            style=""
                class="btn btn-success" 
                type="button"
                @click="addParameter(veb, 0)"
            >
                <i class="fa fa-plus"/>
            </button>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'MultiSelect',
    props: {
        data: {
            type: Array,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        color:{
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        list_data:{
            type: Array,
            required: true,
        },
        show_text: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
    data(){
        return{
            form_data: this.data
        }
    },
    methods:{
        addParameter(data, index){
            const object = {
            }
            object[this.field] = null
            if(this.form_data == undefined)
            {
                this.form_data.push(object)
            }
            else
            {
                this.form_data.splice(index+1, 0,object)
            }
            this.$emit('data', this.form_data)
        },
        removeParameter(data, index){
            if(data.id != 0 && data.id != null)
            {
                data.delete = true
            }
            else
            {
                this.form_data.splice(index, 1)
            }
            this.$emit('data', this.form_data)
        },
    }
}
</script>
