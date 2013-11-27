define(function(){
   return {
       baseUrl: "/",
       paths: {
           sugar: "lib/sugarjs/release/sugar.min",
           sonos: "lib/sonos/dist/sonos"
       },
       packages: ["shared", "models", "runtime", "messaging"],
       shim: {
           sugar : {exports : "sugar"}
       },
       enforceDefine: false
   };
});
