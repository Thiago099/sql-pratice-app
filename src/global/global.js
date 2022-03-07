export default{
    data() {
        return {
            entity:{},
            verb:{},
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
            const groupBy = (x, f) => x.reduce((a, b) => ((a[f(b)] ||= []).push(b), a), {});

            await get_data('verb',data)
            await get_data('entity',data)

            for(const key in data){
                for(const item in data[key])
                {
                this[key][data[key][item].id] = data[key][item]
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
        capitlizeFirst(str) {
            if (!str) return;
            return str.match("^[a-z]") ? str.charAt(0).toUpperCase() + str.substring(1) : str;
        },
    }
}