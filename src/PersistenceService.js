'use strict';

class LocalStorageProxyHandler {

  constructor() {
    this.prefix = 'exam.';
    this.typeSuffix = '.type';
  }

  get(target, name) {
    let v = target[name];
    if (v === undefined) {
      let t = window.localStorage.getItem(this.prefix + name + this.typeSuffix);
      if (t) {
        let serialized = window.localStorage.getItem(this.prefix + name);
        switch(t) {
          case 'object': v = JSON.parse(serialized); break;
          case 'number': v = Number(serialized); break;
          case 'boolean': v = Boolean(serialized); break;
          case 'string': v = serialized; break;
          default: throw new Error('Unknown datatype ' + t);
        }
      }
      target[name] = v;
    }    
    return v;
  }

  set(target, name, value) {
    let t = typeof value;
    let serialized;
    switch(t) {
      case 'object': serialized = JSON.stringify(value); break;
      case 'number': 
      case 'boolean': serialized = String(value); break;
      case 'string': serialized = value; break;
      case 'symbol': throw new Error('Unable to store a symbol values');      
      default: throw new Error('Unknown datatype ' + t);
    }
    window.localStorage.setItem(this.prefix + name + this.typeSuffix, t);
    window.localStorage.setItem(this.prefix + name, serialized);
    target[name] = value;
    return true;
  }

  clear() {
    let removables = [];
    for(let i = 0; i < window.localStorage.length; i++) {
      let key = window.localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        removables.push(key);        
      }
    }
    console.log('Clear for:', removables);
    removables.forEach(key => window.localStorage.removeItem(key));
  }

}

export default class PersistenceService {

  constructor() {
    this.dataObj = {};
    // TODO: make server side storage handler
    this.storageHandler = new LocalStorageProxyHandler();
    this.dataProxy = new Proxy(this.dataObj, this.storageHandler);
  }

  get data() {
    return this.dataProxy;
  }

  reset() {
    this.dataObj = {};
    this.storageHandler.clear();
    this.dataProxy = new Proxy(this.dataObj, this.storageHandler);
  }

}