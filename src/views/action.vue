<template>
    <div class="card">  
      <div class="card-body">
        <div class="row">
          <div class="form-group col-3">
            <label for="entity" class="cyan">Entity:</label>
            <select name="" id="entity" class="form-select" v-model="form.entity" @change="form.verb=null;form.parameters={}">
              <option v-for="(e,id) in entity" :key="e" :value="id">
                {{ e.name }}
              </option>
            </select>
          </div>
          <div class="form-group col-3">
            <label for="verb" class="yellow">Verb:</label>
            <select name="" id="verb" class="form-select" v-model="form.verb">
              <option v-for="({id_verb}) in verb_entities.filter(item=>item.id_entity == form.entity)" :key="id_verb" :value="id_verb" @change="form.parameters={}">
                {{ verb[id_verb].name }}
              </option>
            </select>
          </div>
          <div class="form-group col-3" v-for="(parameter, name) in verb_parameters[form.verb]" :key="parameter">
            <label for="verb" class="magenta">{{ capitlizeFirst(name) }}:</label>
            <select name="" id="verb" class="form-select" v-model="form.parameters[name]">
              <option v-for="({id_entity}) in parameter" :key="id_entity" :value="id_entity">
                {{ entity[id_entity].name }}
              </option>
            </select>
          </div>
        </div>
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
  },
  created(){
      this.update()
  },
}
</script>

<style>

label{
  margin-bottom: 10px;
}
</style>
