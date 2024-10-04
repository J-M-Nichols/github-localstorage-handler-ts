import { GitHubStorageHandlerTs, GitHubStorageHandlersTs } from "../src"
import {JSDOM} from 'jsdom'

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

describe('GitHubStorageHandlersTs', ()=>{
    const testPath1:string = 'testPath1'
    const testPath2:string = 'testPath2'
    const testPath3:string = 'testPath3'

    const beforeEach = ():GitHubStorageHandlersTs => {
        localStorage.clear()
        return new GitHubStorageHandlersTs(testPath1, testPath2)
    }

    //#region clear
    test('should clear the value at the path', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setBigInt(testPath1, 1n)

        //make sure they have values before clear
        expect(handlers.getBigInt(testPath1, 42n)).toBe(1n)

        handlers.clearPath(testPath1)

        //ensure all paths are now null
        expect(handlers.getItem(testPath1)).toBeNull()
    })
    
    test('should clear the value at all paths', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setBigInt(testPath1, 1n)
        handlers.setBoolean(testPath2, true)
        handlers.setNumber(testPath3, 42)

        //make sure they have values before clear
        expect(handlers.getBigInt(testPath1, 42n)).toBe(1n)
        expect(handlers.getBoolean(testPath2, false)).toBe(true)
        expect(handlers.getNumber(testPath3, 0)).toBe(42)

        handlers.clearAllPaths()

        //ensure all paths are now null
        expect(handlers.getItem(testPath1)).toBeNull()
        expect(handlers.getItem(testPath2)).toBeNull()
        expect(handlers.getItem(testPath3)).toBeNull()
    })
    //#endregion

    //#region item
    test('should set and get a string item with setItem and getItem', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setItem(testPath3, 'value')
        expect(handlers.getItem(testPath3)).toBe('value')
    })

    test('should return null when no value set', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        expect(handlers.getItem(testPath3)).toBeNull()
    })
    //#endregion
    
    //#region boolean
    test('should set and get a boolean item as true', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setBoolean(testPath3, true)
        expect(handlers.getBoolean(testPath3, false)).toBe(true)
    })
    
    test('should set and get a boolean item as false', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setBoolean(testPath3, false)
        expect(handlers.getBoolean(testPath3, true)).toBe(false)
    })

    test('should get a boolean item when none expected as true', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        expect(handlers.getBoolean(testPath3, true)).toBe(true)
    })

    test('should get a boolean item when none expected as false', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        expect(handlers.getBoolean(testPath3, false)).toBe(false)
    })

    test('should get a boolean item when using setItem as true', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setItem(testPath3, true)
        expect(handlers.getBoolean(testPath3, false)).toBe(true)
    })

    test('should get a boolean item when using setItem as false', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setItem(testPath3, false)
        expect(handlers.getBoolean(testPath3, true)).toBe(false)
    })

    test('should set and get a boolean item when using setItem and getItem as true', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setItem(testPath3, true)
        expect(handlers.getItem(testPath3)==='true').toBe(true)
    })

    test('should set and get a boolean item when using setItem and getItem as false', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setItem(testPath3, false)
        expect(handlers.getItem(testPath3)==='true').toBe(false)
    })
    //#endregion

    //#region number
    test('should set and get a number item', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setNumber(testPath3, 42)
        expect(handlers.getNumber(testPath3, 0)).toBe(42)
        expect(Number(handlers.getItem(testPath3))).toBe(42)
    })

    test('should get a number item when none is set', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        expect(handlers.getNumber(testPath3, 42)).toBe(42)
    })

    test('should set a number with setItem and get from getNumber', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setItem(testPath3, 42)
        expect(handlers.getNumber(testPath3, 0)).toBe(42)
        expect(Number(handlers.getItem(testPath3))).toBe(42)
    })
    //#endregion

    //#region object
    test('should set and get a object item', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const obj = {key:'test'}
        handlers.setObject(testPath3, obj)

        expect(handlers.getObject(testPath3, {})).toEqual(obj)

        const foundItem:string|null = handlers.getItem(testPath3)
        expect(foundItem).not.toBeNull()
        if(foundItem) expect(JSON.parse(foundItem)).toEqual(obj)
    })

    test('should get an object item when none is set', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const obj = {key:'test'}
        expect(handlers.getObject(testPath3, obj)).toEqual(obj)
    })

    test('should set and get an object item with setItem and getItem', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const obj = {key:'test'}
        handlers.setItem(testPath3, obj)

        expect(handlers.getObject(testPath3, {})).toEqual(obj)

        const foundItem:string|null = handlers.getItem(testPath3)
        expect(foundItem).not.toBeNull()
        if(foundItem) expect(JSON.parse(foundItem)).toEqual(obj)
    })
    //#endregion

    //#region string
    test('should set and get a string item', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setString(testPath3, 'value')
        expect(handlers.getString(testPath3, '')).toBe('value')
        expect(handlers.getItem(testPath3)).toBe('value')
    })

    test('should get a string item when none is set', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        expect(handlers.getString(testPath3, 'value')).toBe('value')
    })

    test('should set and get a string item with setItem and getItem',()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        handlers.setItem(testPath3, 'value')
        expect(handlers.getString(testPath3, '')).toBe('value')
        expect(handlers.getItem(testPath3)).toBe('value')
    })
    //#endregion

    //#region bigint
    test('should set and get a bigint item', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const bigIntValue:BigInt = 18014398509481984n

        handlers.setBigInt(testPath3, bigIntValue)
        expect(handlers.getBigInt(testPath3, 0n)).toBe(bigIntValue)

        const foundItem:string|null = handlers.getItem(testPath3)

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(BigInt(foundItem)).toBe(bigIntValue)
    })

    test('should get a bigint item when none is set', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const bigIntValue:BigInt = 18014398509481984n

        expect(handlers.getBigInt(testPath3, bigIntValue)).toBe(bigIntValue)
    })

    test('should set and get a bigint item with setItem and getItem',()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const bigIntValue:BigInt = 18014398509481984n

        handlers.setItem(testPath3, bigIntValue)
        expect(handlers.getBigInt(testPath3, 0n)).toBe(bigIntValue)

        const foundItem:string|null = handlers.getItem(testPath3)

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(BigInt(foundItem)).toBe(bigIntValue)
    })
    //#endregion

    //#region symbol
    test('should set and get a symbol item', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const key = 'testKey'
        const symbol = Symbol(key)

        handlers.setSymbol(testPath3, symbol)

        const receivedSymbol:Symbol = handlers.getSymbol(testPath3, Symbol('not symbol'))
        const description:string|undefined = receivedSymbol.description

        expect(description).toBe(key)
        expect(description).toBe(symbol.description)

        expect(receivedSymbol).not.toBe(symbol)

        const foundItem:string|null = handlers.getItem(testPath3)

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(foundItem).toBe(key)
    })

    test('should get a symbol item when none is set', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const key = 'testKey'
        const symbol = Symbol(key)

        const foundSymbol = handlers.getSymbol(testPath3, symbol)
        
        expect(symbol.description).toBe(foundSymbol.description)
    })

    test('should get a symbol item with setItem and getItem', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const key = 'testKey'
        const symbol = Symbol(key)

        handlers.setItem(testPath3, symbol)

        const receivedSymbol:Symbol = handlers.getSymbol(testPath3, Symbol('not symbol'))
        const description:string|undefined = receivedSymbol.description

        expect(description).toBe(key)
        expect(description).toBe(symbol.description)

        expect(receivedSymbol).not.toBe(symbol)

        const foundItem:string|null = handlers.getItem(testPath3)

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(foundItem).toBe(key)
    })
    //#endregion

    //#region function
    test('should set and get a function item', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const func:Function = (a:number, b:number) => {
            return a * b
        } 

        handlers.setFunction(testPath3, func)

        const receivedFunc = handlers.getFunction(testPath3, ()=>{})
        expect(receivedFunc(15,3)).toBe(func(3, 15))

        const foundItem:string|null = handlers.getItem(testPath3)

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(eval(foundItem)(8, 7)).toBe(func(7, 8))
    })

    test('should get a function item when none is set', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const func:Function = (a:number, b:number) => {
            return a+b
        }

        const foundItem = handlers.getFunction(testPath3, func)
        expect(foundItem(5, 6)).toBe(func(6, 5))
    })

    test('should get a function item with setItem and getItem', ()=>{
        const handlers:GitHubStorageHandlersTs = beforeEach()
        const func:Function = (a:number, b:number) => {
            return a-b
        }

        handlers.setItem(testPath3, func)

        const receivedFunc = handlers.getFunction(testPath3, ()=>{})
        expect(receivedFunc(15, 3)).toBe(func(15, 3))

        const foundItem:string|null = handlers.getItem(testPath3)

        expect(foundItem).not.toBeNull()
        if(foundItem) expect(eval(foundItem)(8, 7)).toBe(func(8, 7))
    })
    //#endregion
})