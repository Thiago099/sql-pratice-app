<template>
  <div class="row">
    <div class="group"></div>
    <div>
        <a class="btn btn-info btn-submit" style="margin-top:-50px" @click="save">Save</a>
    </div>
    <div class="card" v-for="(act,idx) in action_list" :key="act">  
      <div class="card-body">
        <div class="row">
          <div class="form-group col-3">
            <label for="entity" class="cyan">Entity:</label>
            <group-select
              color="cyan"
              :value="act.id_entity"
              @input="(value)=> act.id_entity = value"
              :data="entities"
              field="id"
              :name_source="entity"
              :group="group"
            >
            </group-select>
          </div>
          <div class="form-group col-3">
            <label for="verb" class="yellow">Verb:</label>
            <group-select
              color="yellow"
              :value="act.id_verb"
              @input="(value)=> act.id_verb = value"
              :data="verb_entity.filter(item => item.id_entity == act.id_entity)"
              field="id_verb"
              :name_source="verb"
              @change="updateParamters(act)"
              :group="group"
            >
            </group-select>
          </div>
          <div 
            class="form-group col-3" v-for="(parameter, name) in verb_parameter[act.id_verb]" 
            :key="parameter"
          >
            <label for="verb" class="magenta">{{ capitlizeFirst(name) }}:</label>
            <group-select
              color="magenta"
              :value="(act.action_parameter.filter(item => item.id_verb_parameter == parameter[0].id)[0] || {id_entity:null}).id_entity"
              @input="(value)=>(act.action_parameter.filter(item => item.id_verb_parameter == parameter[0].id)[0] || {id_entity:null}).id_entity = value"
              :data="parameter"
              field="id_entity"
              :name_source="entity"
              :group="group"
            >
            </group-select>
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
import GroupSelect from '../components/groupselect.vue'
export default {
  components:{
    GroupSelect
  },
  name: 'ActionRegister',
  created(){
      this.update()
  },
  methods:{
    async save(){
      for(const i in this.action)
      {
          if(this.action[i].delete == true)
          {
              if(this.action[i].id != null)
              {
                await new Promise(
                  resolve => this.axios(
                    '/action/' + this.action[i].id,
                    'delete',
                    {
                      callback:()=>resolve()
                    }
                  )
                )
              }
          }
          else
          {
              await new Promise(
                resolve => 
                this.axios(
                  '/action/',
                  'post', 
                  {
                    data:this.action[i],
                    callback:()=>(resolve())
                  }
                )
              )
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
      for(const i in act.action_parameter)
      {
        act.action_parameter[i].delete = true;
      }
      for(const i in this.verb_parameter[act.id_verb])
      {
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
