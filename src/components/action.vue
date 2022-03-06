<template>
    <div class="row">
      <div class="form-group col-3">
        <label for="entity">Entity:</label>
        <select name="" id="entity" class="form-select" v-model="form.entity" @change="form.verb=null;form.parameters={}">
          <option v-for="(e,id) in entity" :key="e" :value="id">
            {{ e.name }}
          </option>
        </select>
      </div>
      <div class="form-group col-3">
        <label for="verb">Verb:</label>
        <select name="" id="verb" class="form-select" v-model="form.verb">
          <option v-for="({id_verb}) in verb_entities.filter(item=>item.id_entity == form.entity)" :key="id_verb" :value="id_verb" @change="form.parameters={}">
            {{ verb[id_verb].name }}
          </option>
        </select>
      </div>
      <div class="form-group col-3" v-for="(parameter, name) in verb_parameters[form.verb]" :key="parameter">
        <label for="verb">{{ capitlizeFirst(name) }}:</label>
        <select name="" id="verb" class="form-select" v-model="form.parameters[name]">
          <option v-for="({id_entity}) in parameter" :key="id_entity" :value="id_entity">
            {{ entity[id_entity].name }}
          </option>
        </select>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ActionRegister',
  data(){
    return{
        form:{
          entity:null,
          verb:null,
          parameters:{}
        }
    }
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
