<template>
  <div class="container">
    <div class="row">
      <div class="form-group col-3">
        <label for="entity">Entity:</label>
        <select name="" id="entity" class="form-select" v-model="form.entity" @change="form.verb=null;form.parameters={}">
          <option v-for="(e,id) in entity" :key="e" :value="id">
            {{ e }}
          </option>
        </select>
      </div>
      <div class="form-group col-3">
        <label for="verb">Verb:</label>
        <select name="" id="verb" class="form-select" v-model="form.verb">
          <option v-for="({id_verb}) in verb_entities.filter(item=>item.id_entity == form.entity)" :key="id_verb" :value="id_verb" @change="form.parameters={}">
            {{ verb[id_verb] }}
          </option>
        </select>
      </div>
      <div class="form-group col-3" v-for="(parameter, name) in verb_parameters[form.verb]" :key="parameter">
        <label for="verb">{{ capitlizeFirst(name) }}:</label>
        <select name="" id="verb" class="form-select" v-model="form.parameters[name]">
          <option v-for="({id_entity}) in parameter" :key="id_entity" :value="id_entity">
            {{ entity[id_entity] }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      entity:{},
      verb:{},
      verb_parameters:[],
      verb_entities:[],
      form:{
        entity:null,
        verb:null,
        parameters:{}
      }
    }
  },
  async mounted() {
    const data = {}
    const  get_data = async (name, target) => {
      target[name] = await new Promise((resolve)=>{
        this.axios(name,'get',{
        callback: (response) => {
           resolve(response)
        }
      })})
    }
    const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});

    await get_data('verb',data)
    await get_data('entity',data)

    for(const key in data){
      for(const item in data[key])
      {
        this[key][data[key][item].id] = data[key][item].name
      }
    }
    await get_data('verb_parameters',data)
    data.verb_parameters = groupBy(data.verb_parameters, item => item.id_verb)
    for(const verb in data.verb_parameters){
      data.verb_parameters[verb] = groupBy(data.verb_parameters[verb], item => item.name)
    }
    this.verb_parameters = data.verb_parameters
    await get_data('verb_entities',this)
  },
  methods:{
    capitlizeFirst(str) {
      if (!str) return;
      return str.match("^[a-z]") ? str.charAt(0).toUpperCase() + str.substring(1) : str;
    },
  }
}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}	
.form-group {
  margin-top: 10px;
}
label{
  margin-bottom: 10px;
}
</style>
