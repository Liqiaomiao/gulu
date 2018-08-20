<template>
    <div class="tabs-item" @click="xxx" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "GuluTabsItem",
        props:{
            disabled:{
                type:Boolean,
                default:false
            },
            name:{
                type:String|Number,
                require:true
            }
        },
        inject:['eventBus'],
       data(){
            return {
                active:false
            }
       },
        computed:{
            classes(){
                return {
                    active:this.active
                }
            }
        },
        methods:{
            xxx(){
                this.eventBus.$emit('update:selected',this.name,this)
            }
        },
        created(){
            this.eventBus.$on('update:selected',(name)=>{
                this.active=name===this.name
            })
        }
    }
</script>

<style scoped lang="scss">
    $blue:blue;
    .tabs-item {
        flex-shrink: 0;
        padding: 0 1em;
        height: 100%;
        display: flex;
        align-items: center;
    &.active {
        color:$blue;
        font-weight: bold;
     }
    }
</style>