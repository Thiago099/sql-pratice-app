<template>
  <div class="row">
    <div>
        <a class="btn btn-info btn-submit" style="margin-top:-50px" @click="save">Save</a>
    </div>
    <div class="card" v-for="(act,idx) in action_list" :key="act">  
      <div class="card-body">
        <div class="row">
          <div class="form-group col-3">
            <label for="entity" class="cyan">Entity:</label>
            <select 
              name="" 
              id="entity" 
              class="form-select" 
              v-model="act.id_entity"
              @change="act.id_verb=null"
              >
              <option 
                v-for="(e,id) in entity" 
                :key="e" 
                :value="id"
              >
                {{ e.name }}
              </option>
            </select>
          </div>
          <div class="form-group col-3">
            <label for="verb" class="yellow">Verb:</label>
            <select 
              name="" 
              id="verb" 
              class="form-select" 
              v-model="act.id_verb"
              @change="updateParamters(act)"

              >
              <option 
                v-for="({id_verb}) in verb_entity.filter(item => item.id_entity == act.id_entity)" 
                :key="id_verb" 
                :value="id_verb"
              >
                {{ verb[id_verb].name }}
              </option>
            </select>
          </div>
          <div 
            class="form-group col-3" v-for="(parameter, name) in verb_parameter[act.id_verb]" 
            :key="parameter"
          >
            <label for="verb" class="magenta">{{ capitlizeFirst(name) }}:</label>
            <select 
              name="" 
              id="verb" 
              class="form-select" 
              v-model="(act.action_parameter.filter(item => item.id_verb_parameter == parameter[0].id)[0] || {id_entity:null}).id_entity"
            >
              <option 
                v-for="({id_entity}) in parameter" 
                :key="id_entity" 
                :value="id_entity"
              >
                {{ entity[id_entity].name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="card-footer row">
        <div>
          <button 
              class="btn btn-success" 
              type="button"
              @click="add()"
              v-if="idx == action_list.length-1"
          >
              <i class="fa fa-plus"/>
          </button>
          <button 
              class="btn btn-danger" 
              type="button"
              @click="del(act)"
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
          v-if="action_list.length == 0"
      >
          <i class="fa fa-plus"/>
      </button>
    </div>
    
    <div>
        <a class="btn btn-info btn-submit" @click="save">Save</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionRegister',
  created(){
      this.update()
  },
  methods:{
    save(){
      for(const i in this.action)
      {
          if(this.action[i].delete == true)
          {
              if(this.action[i].id != null)
              {
                this.axios('/action/' + this.action[i].id, 'delete')
              }
          }
          else
          {
              this.axios('/action/', 'post', {data:this.action[i]})
          }
      }
      this.update()
    },
    add(){
      this.action.push({
        id_entity: null,
        id_verb: null,
        action_parameter: [],
      })
    },
    del(action){
        action.delete = true
    },
    capitlizeFirst(string){
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    updateParamters(act)
    {
      act.action_parameter = []
      for(const i in this.verb_parameter[act.id_verb])
      {
        console.log( this.verb_parameter[act.id_verb][i][0].id)
        act.action_parameter.push({
          id_verb_parameter: this.verb_parameter[act.id_verb][i][0].id,
          id_entity: null,
        })
      }
    }
  },
  computed:{
    action_list(){
      return this.action.filter(item => item.delete != true)
    }
  }
}
</script>

<style>

label{
  margin-bottom: 10px;
}
</style>
