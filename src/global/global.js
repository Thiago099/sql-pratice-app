export default{
    data() {
        return {
            entity:{},
            grouped_entities:{},
            grouped_verbs:{},
            verb:{},
            group:{},
            verb_parameters:[],
            verb_entities:[],
        }
        },
    methods:{
        async update(){
            this.entity={};
            this.verb={};
            this.verb_parameters=[];
            this.verb_entities=[];
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

            this.grouped_entities = this.groupBy(data.entity, item => item.id_group)
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
            await get_data('verb_parameters',data)
            data.verb_parameters = this.groupBy(data.verb_parameters, item => item.id_verb)
            for(const verb in data.verb_parameters){
                data.verb_parameters[verb] = this.groupBy(data.verb_parameters[verb], item => item.name)
            }
            this.verb_parameters = data.verb_parameters
            await get_data('verb_entities',this)
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