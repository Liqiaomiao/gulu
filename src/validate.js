export default  function validate(data,rules) {
    let errors={};
    rules.forEach(rule=>{
        let value = data[rule.key];
        let validators = Object.keys(rule).filter(item=>{
            return item!='key' && item!='required'
        });
        //遍历validators，并逐一调用对应的函数
        validators.forEach(validatekey=>{
           if(rule[validatekey]){
               if( validate[validatekey] ){
                   let error =  validate[validatekey](value,rule[validatekey]);
                   if(error){
                       ensureObj(errors,rule.key);
                       errors[rule.key][validatekey]=error;
                   }
               }else {
                   throw `不存在的校验器${validatekey}`
               }

           }
        });
        if(rule.required){
            let error =  validate.required(value);
            if(error){
                ensureObj(errors,rule.key);
                errors[rule.key].required =error;
                return
            }
        }
    });
    return errors
}
function ensureObj(obj,key) {
    if(typeof obj[key]!="object"){
        obj[key]={}
    }
}
validate.required=(value)=>{
    if(value!==0&&!value){
        return  '必填'
    }
};
validate.pattern = (value,pattern)=>{
    if(pattern==='email'){
       pattern=/^.+@.+$/
    }
    if(pattern.test(value)===false){
      return '格式不正确';
    }
};
validate.minLength=(value,minLength)=>{
    if(value.length<minLength){
      return '太短'
    }
}
validate.maxLength=(value,maxLength)=>{
    if(value.length>maxLength){
        return '太长'
    }
}