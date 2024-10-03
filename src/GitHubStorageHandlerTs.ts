/**
 * A typical GitHubStorageHandler attempts to solve the issue of using localStorage within multiple GitHub websites.
 * 
 * Works great with Redux slice.
 */
export default class GitHubStorageHandlerTs {
    /**
     * The current pathname and given path joined by /
     */
    readonly path:string
    /**
     * The given path
     */
    readonly basePath:string

    /**
     * Creates a new GitHubStorageHandler with the GitHub pathname as a prefix to path. 
     * @param path string
     */
    public constructor(path:string){
        const storagePrefix:string = window.location.pathname
        this.path = `${storagePrefix}/${path}`
        this.basePath = path
    }

    //#region Setters
    /**
     * Sets the item of localStorage at this path to value
     * @param value string
     */
    private setToPath = (value:string):void => {
        localStorage.setItem(this.path, value)
    }

    /**
     * Sets the item of localStorage at this path to value
     * @param value T
     */
    public setItem = <T>(value: T):void => {
        switch(typeof value){
            case "string":
                this.setToPath(value)
                break
            case "number":
            case "bigint":
            case "boolean":
            case "symbol":
            case "function":
            case "undefined":
                this.setToPath(String(value))
                break
            case "object":
                this.setToPath(JSON.stringify(value))
                break
            default:
                throw new Error(`Type ${typeof value} is not covered. Convert to a string first.`)
        }
    }

    /**
     * Sets the item of localStorage at this path to value
     * @param value boolean
     */
    public setBoolean = (value:boolean):void => {
        localStorage.setItem(this.path, value.toString())
    }

    /**
     * Sets the item of localStorage at this path to value
     * @param value number
     */
    public setNumber = (value:number):void => {
        localStorage.setItem(this.path, value.toString())
    }
    
    /**
     * Sets the item of localStorage at this path to value
     * @param value object
     */
    public setObject = (value:object):void => {
        this.setToPath(JSON.stringify(value))
    }

    /**
     * Sets the item of localStorage at this path to value
     * @param value string
     */
    public setString = (value:string):void => {
        this.setToPath(value)
    }
    //#endregion

    //#region Getters
    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @returns string | null
     */
    public getItem = ():string | null => {
        return localStorage.getItem(this.path)
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param expected string
     * @returns string
     */
    public getString = (expected:string):string => {
        return this.getItem() || expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param expected number
     * @returns number
     */
    public getNumber = (expected:number):number => {
        const found:string | null = this.getItem()

        return found ? Number(found) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param expected BigInt
     * @returns BigInt
     */
    public getBigInt = (expected:BigInt):BigInt => {
        const found:string | null = this.getItem()

        return found ? BigInt(found) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param expected boolean
     * @returns boolean
     */
    public getBoolean = (expected:boolean):boolean => {
        const found:string | null = this.getItem()

        return found ? found==='true' : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param expected symbol
     * @returns symbol
     */
    public getSymbol = (expected:symbol):symbol => {
        const found:string | null = this.getItem()

        return found ? Symbol(found) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param expected Function
     * @returns Function
     */
    public getFunction = (expected:Function):Function => {
        const found:string | null = this.getItem()

        return found ? eval(found) : expected
    }

    /**
     * Gets the item stored in localStorage at this path or the expected value
     * @param expected object
     * @returns object
     */
    public getObject = (expected:object):object => {
        const found:string | null = this.getItem()

        return found ? JSON.parse(found) : expected
    }
    //#endregion
}