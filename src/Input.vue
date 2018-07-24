<style>

</style>
<template>
    <div >
        <input type="text"
               :value="value"
               :disabled="disabled"
               :readonly="readonly"

        />
        <Icon v-if="error"  name="error"></Icon>
        <i  v-if="error" class='errorMessage'>{{error}}</i>
    </div>
</template>

<script>
    import Icon from  'icon'
    export default{
        data(){
            return {}
        },
        components:{
            Icon
        },
        props: {
            value: {},
            disabled: {
                type: Boolean,
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            },
            error:{

            },

        }
    }
</script>


