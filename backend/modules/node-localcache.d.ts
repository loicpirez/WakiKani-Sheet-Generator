declare module 'node-localcache' {
  export default class LocalCache {
    constructor (fileName: string, skipFileCaching?: boolean)
    setItem (key: string, value: any): void
    getItem (key: string): any
  }
}
