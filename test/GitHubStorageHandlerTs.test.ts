import {JSDOM} from 'jsdom'
import { GitHubStorageHandlerTs } from '../src'
import { describe } from 'node:test'

const {window} = new JSDOM('', {url:'http://localhost'});
global.document = window.document;
const foundWindow = global.document.defaultView;
if(foundWindow){
    global.window = foundWindow ;
    global.localStorage = window.localStorage;
}
else{
    throw new Error('FoundWindow is null');
}

describe('GitHubStorageHandlerTs', ()=> {
    const testPath:string = 'testPath';

    const beforeEach = ():GitHubStorageHandlerTs => {
        localStorage.clear()
        return new GitHubStorageHandlerTs(testPath)
    }

    test('should set and get a boolean item while true', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setBoolean(true)
        expect(handler.getBoolean(false)).toBe(true)
        expect(handler.getItem()).toBe('true')
    })

    test('should set and get a boolean item while false', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setBoolean(false)
        expect(handler.getBoolean(true)).toBe(false)
        expect(handler.getItem()).toBe('false')
    })

    test('should return expected boolean when none is set as true', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        expect(handler.getBoolean(true)).toBe(true)
    })

    test('should return expected boolean when none is set as false', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        expect(handler.getBoolean(false)).toBe(false)
    })

    test('should set and get a boolean item while true with setItem', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setItem(true)
        expect(handler.getBoolean(false)).toBe(true)
        expect(handler.getItem()).toBe('true')
    })

    test('should set and get a boolean item while false with setItem', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setItem(false)
        expect(handler.getBoolean(true)).toBe(false)
        expect(handler.getItem()).toBe('false')
    })

    test('should set and get a string item', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setItem('testValue')
        expect(handler.getItem()).toBe('testValue')
    })

    test('should return expected string when none is set', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        expect(handler.getItem()).toBeNull()
    })

    test('should set and get a number item', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setNumber(42)
        expect(handler.getNumber(0)).toBe(42)
        expect(Number(handler.getItem())).toBe(42)
    })

    test('should return expected number when none is set', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        expect(handler.getNumber(42)).toBe(42)
    })

    test('should set and get a number item when using setItem',()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setItem(42)
        expect(handler.getNumber(0)).toBe(42)
        expect(Number(handler.getItem())).toBe(42)
    })

    test('shout set and get an object item', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const obj = {key:'value'}
        handler.setObject(obj)
        expect(handler.getObject({})).toEqual(obj)

        const foundItem:string|null = handler.getItem()

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(JSON.parse(foundItem)).toEqual(obj)
    })

    test('should return expected object when none is set', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const obj = {default:'value'}
        expect(handler.getObject(obj)).toEqual(obj)
    })

    test('should set and get an object item with setItem',()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const obj = {key:'value'}
        handler.setItem(obj)
        expect(handler.getObject({})).toEqual(obj)

        const foundItem:string|null = handler.getItem()

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(JSON.parse(foundItem)).toEqual(obj)
    })

    test('should set and get a string item', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setString('value')
        expect(handler.getString('')).toBe('value')
        expect(handler.getItem()).toBe('value')
    })

    test('should return expected string when none is set', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        expect(handler.getString('value')).toBe('value')
    })

    test('should set and get a string item with setItem',()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        handler.setItem('value')
        expect(handler.getString('')).toBe('value')
        expect(handler.getItem()).toBe('value')
    })

    test('should set and get a BigInt item', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const bigIntValue:BigInt=18014398509481984n
        handler.setBigInt(bigIntValue)
        expect(handler.getBigInt(1n)).toBe(bigIntValue)

        const found:string|null = handler.getItem()

        expect(found).not.toBeNull()
        if(found) expect(BigInt(found)).toBe(bigIntValue)
    })

    test('should return expected BigInt when none is set', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        expect(handler.getBigInt(1n)).toBe(1n)
    })

    test('should set and get a Function item', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const func = (a:number, b:number)=>{return a+b}
        handler.setFunction(func)

        const receivedFunc = handler.getFunction(()=>{})
        expect(receivedFunc(5,2)).toBe(func(2, 5))

        const found:string|null = handler.getItem()

        expect(found).not.toBeNull()
        if(found) expect(eval(found)(8, 7)).toBe(func(7, 8))
    })

    test('should return expected Function item when none is set',()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const func = (a:number, b:number)=>{return a+b}

        const receivedFunc = handler.getFunction(func)
        expect(receivedFunc(2,5)).toBe(func(5,2))
    })

    test('should set and get a symbol item', ()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const key = 'value'
        const symbol = Symbol(key)
        handler.setSymbol(symbol)

        const receivedSymbol:Symbol = handler.getSymbol(Symbol('wrongKey'))
        const description:string|undefined = receivedSymbol.description
        
        expect(description).toBe(key)
        expect(description).toBe(symbol.description)

        //no 2 symbols should be the same
        expect(receivedSymbol).not.toBe(symbol)

        const foundItem:string|null = handler.getItem()

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(foundItem).toBe(key)
    })

    test('should return a symbol item when none is set',()=>{
        const handler:GitHubStorageHandlerTs = beforeEach()
        const key = 'value'
        const symbol = Symbol(key)

        const receivedSymbol = handler.getSymbol(Symbol(key))
        expect(receivedSymbol.description).toBe(key)
        expect(receivedSymbol.toString()).toBe(symbol.toString())

        //no 2 symbols should be the same
        expect(receivedSymbol).not.toBe(symbol)
    })
})