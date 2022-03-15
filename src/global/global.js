export default{
    data() {
        return {
            entity:{},
            grouped_entities:{},
            grouped_verbs:{},
            grouped_actions:{},
            grouped_process_entities:{},
            verb:{},
            group:{},
            process:{},
            verb_parameter:[],
            verb_entity:[],
            groups:[],
            processs:[],
            action:[],
            entities:[],
            verbs:[],
            instances:[],
            all_entities:[],
        }
        },
    methods:{
        async update(){
            this.entity={};
            this.verb={};
            this.verb_parameter=[];
            this.verb_entity=[];
            const data = {}
            const  get_data = async (name, target) => {
                target[name] = await new Promise((resolve)=>{
                this.axios(name,'get',{
                callback: (response) => {
                    resolve(response)
                }
                })})
            }
            await get_data('verb',data)
            await get_data('entity',data)
            await get_data('group',data)
            await get_data('process',data)




            this.grouped_entities = this.groupBy(data.entity.filter(item => item.instance == 0), item => item.id_group)
            this.grouped_verbs = this.groupBy(data.verb, item => item.id_group)
            

            for(const key in data){
                for(const item in data[key])
                {
                    this[key][data[key][item].id] = data[key][item]
                }
            }

            for(const i in this.group)
            {
                if(this.grouped_entities[i] == undefined)
                {
                    this.grouped_entities[i] = []
                }
            }
            for(const i in this.group)
            {
                if(this.grouped_verbs[i] == undefined)
                {
                    this.grouped_verbs[i] = []
                }
            }
            
           
            this.groups = data.group
            this.processs = data.process


            await get_data('verb_parameter',data)
            data.verb_parameter = this.groupBy(data.verb_parameter, item => item.id_verb)
            for(const verb in data.verb_parameter){
                data.verb_parameter[verb] = this.groupBy(data.verb_parameter[verb], item => item.name)
            }
            this.verb_parameter = data.verb_parameter
            await get_data('verb_entity',this)
            await get_data('action',this)
            this.instances = data.instance

            this.grouped_actions = this.groupBy(this.action, item => item.id_process)


            this.grouped_process_entities = this.groupBy(JSON.parse(JSON.stringify(data.entity)), item => item.id_process)
            delete  this.grouped_process_entities[null]
            for(const i in this.process)
            {
                if(this.grouped_process_entities[i] == undefined)
                {
                    this.grouped_process_entities[i] = []
                }
            }

            for(const i in this.process)
            {
                if(this.grouped_actions[i] == undefined)
                {
                    this.grouped_actions[i] = []
                }
            }

            this.entities = data.entity.filter(item => item.instance == 0)
            this.all_entities = data.entity
            this.instances = data.entity.filter(item => item.instance == 1)
            this.verbs = data.verb
            this.instances.map(item => 
                {
                    if(item.instance == 1) 
                    {
                        item.name = `${this.entity[item.generalization[0].id_parent].name} ${item.name}`
                    }
                }
            )
        },
        groupBy (x, f) {
            return x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {})
        },
        capitlizeFirst(str) {
            if (!str) return;
            return str.match("^[a-z]") ? str.charAt(0).toUpperCase() + str.substring(1) : str;
        },
        filterObject(obj, callback) {
        return Object.fromEntries(Object.entries(obj).
            filter(([key, val]) => callback(val, key)));
        }
    }
}