import {expect} from 'chai'
import {JSDOM} from 'jsdom'
import { GitHubStorageHandlerTs } from '../src'
import { beforeEach, describe } from 'node:test'

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

const {window} = new JSDOM('', {url:'http://localhost'})
global.document = window.document;
const foundWindow = global.document.defaultView
if(foundWindow){
    global.window = foundWindow 
    global.localStorage = window.localStorage
}
else{
    throw new Error('FoundWindow is null')
}

describe('GitHubStorageHandler', ()=> {
    let handler:GitHubStorageHandlerTs;
    const testPath:string = 'testPath'
    const storagePrefix:string = window.location.pathname

    beforeEach(()=>{
        handler = new GitHubStorageHandlerTs(testPath)
        localStorage.clear()
    })

    it('should initialize with the correct path', () => {
        expect(handler.path).to.equal(`${storagePrefix}/${testPath}`)
        expect(handler.basePath).to.equal(testPath)
    })

    it('should set and get a boolean item while true', ()=>{
        handler.setBoolean(true)
        expect(handler.getBoolean(false)).to.equal(true)
    })

    it('should set and get a boolean item while false', ()=>{
        handler.setBoolean(false)
        expect(handler.getBoolean(true)).to.equal(false)
    })

    it('should return expected boolean when none is set as true', ()=>{
        expect(handler.getBoolean(true)).to.equal(true)
    })

    it('should return expected boolean when none is set as false', ()=>{
        expect(handler.getBoolean(false)).to.equal(false)
    })

    it('should set and get a boolean item while true with setItem', ()=>{
        handler.setItem(true)
        expect(handler.getBoolean(false)).to.equal(true)
    })

    it('should set and get a boolean item while false with setItem', ()=>{
        handler.setItem(false)
        expect(handler.getBoolean(true)).to.equal(false)
    })

    it('should set and get a string item', ()=>{
        handler.setItem('testValue')
        expect(handler.getItem()).to.equal('testValue')
    })

    it('should return expected string when none is set', ()=>{
        expect(handler.getItem()).to.equal(null)
    })

    it('should set and get a number item', ()=>{
        handler.setNumber(42)
        expect(handler.getNumber(0)).to.equal(42)
    })

    it('should return expected number when none is set', ()=>{
        expect(handler.getNumber(42)).to.equal(42)
    })

    it('should set and get a number item when using setItem',()=>{
        handler.setItem(42)
        expect(handler.getNumber(0)).to.equal(42)
    })

    it('shout set and get an object item', ()=>{
        const obj = {key:'value'}
        handler.setObject(obj)
        expect(handler.getObject({})).to.equal(obj)
    })

    it('should return expected object when none is set', ()=>{
        const obj = {default:'value'}
        expect(handler.getObject(obj)).to.equal(obj)
    })

    it('should set and get an object item with setItem',()=>{
        const obj = {key:'value'}
        handler.setItem(obj)
        expect(handler.getObject({})).to.equal(obj)
    })

    it('should set and get a string item', ()=>{
        handler.setString('value')
        expect(handler.getString('')).to.equal('value')
    })

    it('should return expected string when none is set', ()=>{
        expect(handler.getString('value')).to.equal('value')
    })

    it('should set and get a string item with setItem',()=>{
        handler.setItem('value')
        expect(handler.getString('')).to.equal('value')
    })

    it('should set and get a BigInt item', ()=>{
        handler.setItem(18014398509481984n)
        expect(handler.getBigInt(1n)).to.equal(18014398509481984n)
    })

    it('should return expected BigInt when none is set', ()=>{
        expect(handler.getBigInt(1n)).to.equal(1n)
    })

    it('should set and get a Function item', ()=>{
        const func = (a:number, b:number)=>{return a+b}
        handler.setItem(func)

        const receivedFunc = handler.getFunction(()=>{})
        expect(receivedFunc).to.equal(func)
        expect(receivedFunc(5,2)).to.equal(func(2, 5))
    })

    it('should return expected Function item when none is set',()=>{
        const func = (a:number, b:number)=>{return a+b}

        const receivedFunc = handler.getFunction(func)
        expect(receivedFunc).to.equal(func)
        expect(receivedFunc(2,5)).to.equal(func(5,2))
    })

    it('should set and get a symbol item', ()=>{
        const key = 'value'
        const symbol = Symbol(key)
        handler.setItem(symbol)

        const receivedSymbol = handler.getSymbol(Symbol('wrongKey'))
        expect(receivedSymbol.toString()).to.equal(key)
        expect(receivedSymbol.toString()).to.equal(symbol.toString())

        //no 2 symbols should be the same
        expect(receivedSymbol).not.equal(symbol)
    })

    it('should return a symbol item when none is set',()=>{
        const key = 'value'
        const symbol = Symbol(key)

        const receivedSymbol = handler.getSymbol(Symbol(key))
        expect(receivedSymbol.toString()).to.equal(key)
        expect(receivedSymbol.toString()).to.equal(symbol.toString())

        //no 2 symbols should be the same
        expect(receivedSymbol).not.equal(symbol)
    })
})