class Validator {
    static add(name,fn){
         console.log(name);
         Validator.prototype[name]=fn;
     }
    validate(data, rules) {
        let errors = {};
        rules.forEach(rule => {
            let value = data[rule.key];
            let validators = Object.keys(rule).filter(item => {
                return item != 'key' && item != 'required'
            });
            //遍历validators，并逐一调用对应的函数
            validators.forEach(validatekey => {
                if (rule[validatekey]) {
                    if (this[validatekey]) {
                        let error = this[validatekey](value, rule[validatekey]);
                        if (error) {
                            ensureObj(errors, rule.key);
                            errors[rule.key][validatekey] = error;
                        }
                    } else {
                        throw `不存在的校验器${validatekey}`
                    }

                }
            });
            if (rule.required) {
                let error = this.required(value);
                if (error) {
                    ensureObj(errors, rule.key);
                    errors[rule.key].required = error;
                    return
                }
            }
        });
        return errors
    }

    required(value) {
        if (value !== 0 && !value) {
            return '必填'
        }
    };

    pattern(value, pattern) {
        if (pattern === 'email') {
            pattern = /^.+@.+$/
        }
        if (pattern.test(value) === false) {
            return '格式不正确';
        }
    };

    minLength(value, minLength) {
        if (value.length < minLength) {
            return '太短'
        }
    }

    maxLength(value, maxLength) {
        if (value.length > maxLength) {
            return '太长'
        }
    }
}

export default Validator

function ensureObj(obj, key) {
    if (typeof obj[key] != "object") {
        obj[key] = {}
    }
}