import chai,{expect} from 'chai'
import {shallowMount,mount} from '@vue/test-utils'
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
chai.use(sinonChai);
import Validator from '../../src/validate'
describe('Validator',()=>{
    it('存在',()=>{
        expect(Validator).to.exist
    });
    it('required true 报错',()=>{
        let data={
            email:''
        };
        let rules=[
            {key:'email',required:true}
        ];
        let errors = new  Validator().validate(data,rules);
      expect(errors.email.required).to.eq('必填')

    })
    it('required true 通过',()=>{
        let data={
            email:0
        };
        let rules=[
            {key:'email',required:true}
        ];
        let errors = new  Validator().validate(data,rules);;
        expect(errors.email).to.not.exist

    });
    it('pattern 报错',()=>{
        let data={
            email:'@frank.com'
        };
        let rules=[
            {key:'email',pattern:/^.+@.+$/}
        ];
        let errors = new  Validator().validate(data,rules);;
        expect(errors.email.pattern).to.eq('格式不正确')
    });
    it('pattern  通过',()=>{
        let data={
            email:'1@frank.com'
        };
        let rules=[
            {key:'email',pattern:/^.+@.+$/}
        ];
        let errors = new  Validator().validate(data,rules);;
        expect(errors.email).to.not.exist
    })
    it('pattern email 报错',()=>{
        let data={
            email:'@frank.com'
        };
        let rules=[
            {key:'email',pattern:'email'}
        ];
        let errors = new  Validator().validate(data,rules);;
        expect(errors.email.pattern).to.eq('格式不正确')
    });
    it('pattern email 通过',()=>{
        let data={
            email:'1@frank.com'
        };
        let rules=[
            {key:'email',pattern:'email'}
        ];
        let errors = new  Validator().validate(data,rules);;
        expect(errors.email).to.not.exist
    })
    it('require & pattern',()=>{
        let data={
            email:''
        };
        let rules=[
            {key:'email',pattern:'email',required:true}
        ];
        let errors = new  Validator().validate(data,rules);;
        expect(errors.email.required).to.exist
    })
    it('require & minLength',()=>{
        let data = {
            email:''
        };
        let rules=[
            {key:'email',pattern:'email',minLength:6}
        ];
        let errors = new  Validator().validate(data,rules);;
       expect(errors.email.pattern).to.eq('格式不正确');
       expect(errors.email.minLength).to.eq('太短')
    });
    it('maxLength',()=>{
        let data = {
            email:'111@qq.com'
        };
        let rules=[
            {key:'email',pattern:'email',maxLength:6}
        ];
        let errors = new  Validator().validate(data,rules);
       expect(errors.email.maxLength).to.eq('太长')
    })
    it('many keys',()=>{
        let data={email:''};
        let rules=[
            {key:'email',pattern:'email',minLength: 6,maxLength: 8,hasNumber:true}
        ]
        let fn=()=>{
            new  Validator().validate(data,rules);
        }
        expect(fn).to.throw('不存在的校验器hasNumber')
    })
    it('own fn',()=>{
        let data={email:''};
        let rules=[
            {key:'email',pattern:'email',minLength: 6,maxLength: 8,hasNumber:true}
        ];
        let validator =  new  Validator();
        validator.hasNumber=(value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字'
            }
        };
        let errors = validator.validate(data,rules);
        let fn=()=>{
            errors = validator.validate(data,rules);
        };

        expect(fn).to.not.throw();
        expect(errors.email.hasNumber).to.eq('必须含有数字')
    })
    it('两个validator 互不影响',()=>{
        let data={email:''};
        let rules=[
            {key:'email',pattern:'email',minLength: 6,maxLength: 8,hasNumber:true}
        ];
        let validator1 =  new  Validator();
        let validator2 =  new  Validator();
        validator1.hasNumber=(value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字'
            }
        };
        expect(()=>{
            validator1.validate(data,rules);
        }).to.not.throw();
        expect(()=>{
            validator2.validate(data,rules);
        }).to.throw();
    })
    it('可以全局添加新规则',()=>{
        let data={email:''};
        let rules=[
            {key:'email',pattern:'email',minLength: 6,maxLength: 8,hasNumber:true}
        ];
        let validator1 =  new  Validator();
        let validator2 =  new  Validator();
        Validator.add('hasNumber',(value)=>{
            if(!/\d/.test(value)){
                return '必须含有数字'
            }
        });
        expect(()=>{
            validator1.validate(data,rules);
        }).to.not.throw();
        expect(()=>{
            validator2.validate(data,rules);
        }).to.not.throw();
    })
});