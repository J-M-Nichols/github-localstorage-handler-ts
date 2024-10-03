import GitHubStorageHandlerTs from "./GitHubStorageHandlerTs"

/**
 * A typical PathObject contains a GitHubStorageHandlerTs and the path used by the handler
 */
type PathObject = {
    handler:GitHubStorageHandlerTs,
    path:string
} 

/**
 * A typical GitHubStorageHandlersTs attempts to solve the issue of using localStorage within multiple GitHub websites by handling multiple instances of GitHubStorageHandlerTs.
 * 
 * Works great with React Context/Provider.
 */
export default class GitHubStorageHandlersTs{
    readonly pathObjects:PathObject[] = []

    /**
     * Creates a new GitHubStorageHandlers with the GitHub pathname as a prefix to each path
     * @param paths string[]
     */
    constructor(...paths:string[]){
        paths.forEach((path:string)=>{
            const handler = new GitHubStorageHandlerTs(path)
            this.pathObjects.push({
                handler,
                path
            })
        })
    }

    /**
     * Gets a current or creates a new GitHubStorageHandler located at the path. 
     * @param path 
     * @returns GitHubStorageHandlerTs
     */
    private getHandler = (path:string):GitHubStorageHandlerTs => {
        let handler:GitHubStorageHandlerTs|undefined = this.pathObjects.find(pathObject => path === pathObject.path)?.handler;

        if(handler) return handler

        handler = new GitHubStorageHandlerTs(path)

        this.pathObjects.push({
            handler,
            path
        })

        return handler
    }

    //#region Setters
    /**
     * Sets the item of localStorage at the given path to value
     * @param path string
     * @param value T
     */
    public setItem = <T>(path:string, value: T):void => {
        this.getHandler(path).setItem(value)
    }

    /**
     * Sets the item of localStorage at the given path to value
     * @param path string
     * @param value boolean
     */
    public setBoolean = (path:string, value:boolean):void => {
        this.getHandler(path).setBoolean(value)
    }

    /**
     * Sets the item of localStorage at the given path to value
     * @param path string
     * @param value number
     */
    public setNumber = (path:string, value:number):void => {
        this.getHandler(path).setNumber(value)
    }

    /**
     * Sets the item of localStorage at the given path to value
     * @param path string
     * @param value object
     */
    public setObject = (path:string, value:object):void => {
        this.getHandler(path).setObject(value)
    }

    /**
     * Sets the item of localStorage at the given path to value
     * @param path string
     * @param value string
     */
    public setString = (path:string, value:string):void => {
        this.getHandler(path).setString(value)
    }
    //#endregion

    //#region Getters
    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @returns string | null
     */
    public getItem = (path:string):string | null => {
        return this.getHandler(path).getItem()
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @param expected string
     * @returns string
     */
    public getString = (path:string, expected:string):string => {
        return this.getHandler(path).getString(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @param expected number
     * @returns number
     */
    public getNumber = (path:string, expected:number):number => {
        return this.getHandler(path).getNumber(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @param expected BigInt
     * @returns BigInt
     */
    public getBigInt = (path:string, expected:BigInt):BigInt => {
        return this.getHandler(path).getBigInt(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @param expected boolean
     * @returns boolean
     */
    public getBoolean = (path:string, expected:boolean):boolean => {
        return this.getHandler(path).getBoolean(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @param expected symbol
     * @returns symbol
     */
    public getSymbol = (path:string, expected:symbol):symbol => {
        return this.getHandler(path).getSymbol(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @param expected Function
     * @returns Function
     */
    public getFunction = (path:string, expected:Function):Function => {
        return this.getHandler(path).getFunction(expected)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param path string
     * @param expected object
     * @returns object
     */
    public getObject = (path:string, expected:object):object => {
        return this.getHandler(path).getObject(expected)
    }
    //#endregion
}