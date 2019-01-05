import chai,{expect} from 'chai'
import {shallowMount,mount} from '@vue/test-utils'
import sinon from 'sinon';
import sinonChai from 'sinon-chai'
chai.use(sinonChai);
import validate from '../../src/validate'
describe('validate',()=>{
    it('存在',()=>{
        expect(validate).to.exist
    });
    it('required true 报错',()=>{
        let data={
            email:''
        };
        let rules=[
            {key:'email',required:true}
        ];
        let errors = validate(data,rules);
      expect(errors.email.required).to.eq('必填')

    })
    it('required true 通过',()=>{
        let data={
            email:0
        };
        let rules=[
            {key:'email',required:true}
        ];
        let errors = validate(data,rules);
        expect(errors.email).to.not.exist

    });
    it('pattern 报错',()=>{
        let data={
            email:'@frank.com'
        };
        let rules=[
            {key:'email',pattern:/^.+@.+$/}
        ];
        let errors = validate(data,rules);
        expect(errors.email.pattern).to.eq('格式不正确')
    });
    it('pattern  通过',()=>{
        let data={
            email:'1@frank.com'
        };
        let rules=[
            {key:'email',pattern:/^.+@.+$/}
        ];
        let errors = validate(data,rules);
        expect(errors.email).to.not.exist
    })
    it('pattern email 报错',()=>{
        let data={
            email:'@frank.com'
        };
        let rules=[
            {key:'email',pattern:'email'}
        ];
        let errors = validate(data,rules);
        expect(errors.email.pattern).to.eq('格式不正确')
    });
    it('pattern email 通过',()=>{
        let data={
            email:'1@frank.com'
        };
        let rules=[
            {key:'email',pattern:'email'}
        ];
        let errors = validate(data,rules);
        expect(errors.email).to.not.exist
    })
    it('require & pattern',()=>{
        let data={
            email:''
        };
        let rules=[
            {key:'email',pattern:'email',required:true}
        ];
        let errors = validate(data,rules);
        expect(errors.email.required).to.exist
    })
    it('require & minLength',()=>{
        let data = {
            email:''
        };
        let rules=[
            {key:'email',pattern:'email',minLength:6}
        ];
        let errors = validate(data,rules);
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
        let errors = validate(data,rules);
       expect(errors.email.maxLength).to.eq('太长')
    })
});