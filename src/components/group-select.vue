<template>
    <select 
        name="" 
        id="verb" 
        class="form-select" 
        :class="color"
        @change="handleBaisc"
        :value="content"
    >
        <option disabled style="font-size: 0.5em;"></option>
        <optgroup 
        :label="capitlizeFirst(group[index].name)"
        style="color:red"
        v-for="(data, index) in groupBy(data, item => item.id_group)" 
        :key="data"
        >
            <option disabled style="background: red; font-size: 0.1px;"></option>
            <option disabled style="font-size: 0.25em;"></option>
            <option 
            :class="(name_source[item[field]] || {instance : 0}).instance == 1 ? 'green-blue' : color"
            :key="item[field]" 
            :value="item[field]"
            v-for="(item) in data"
            >
            {{ (name_source[item[field]] || { name : "" }).name }}
            </option>
            <option disabled style="font-size: 0.5em;"></option>
        </optgroup>
    </select>
</template>
<script>
export default {
    name: 'groupSelect',
    props:{
        value:{},
        group:{},
        parameter:{},
        data:{},
        field:{},
        name_source:{},
        color:{
            default: 'white',
        },
    },
    data(){
        return {
            content: this.value
        }
    },
    methods:{
        handleBaisc(event)
        {
            this.content = event.target.value
            this.$emit('input', this.content)
        },
    }
}
</script>
