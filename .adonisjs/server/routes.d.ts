import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.create': { paramsTuple?: []; params?: {} }
    'games.store': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.index': { paramsTuple?: []; params?: {} }
    'characters.create': { paramsTuple?: []; params?: {} }
    'characters.store': { paramsTuple?: []; params?: {} }
    'characters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.register.view': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.create': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.index': { paramsTuple?: []; params?: {} }
    'characters.create': { paramsTuple?: []; params?: {} }
    'characters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.register.view': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'games.index': { paramsTuple?: []; params?: {} }
    'games.create': { paramsTuple?: []; params?: {} }
    'games.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'games.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.index': { paramsTuple?: []; params?: {} }
    'characters.create': { paramsTuple?: []; params?: {} }
    'characters.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.edit': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'auth.register.view': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'games.store': { paramsTuple?: []; params?: {} }
    'characters.store': { paramsTuple?: []; params?: {} }
    'auth.register': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'games.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'games.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'characters.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}