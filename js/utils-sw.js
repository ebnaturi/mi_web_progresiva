function actualizarCacheDinamico(C_DInamico, peticion, respuest){
    if(respuest.ok){
       return caches.open(C_DInamico)
        .then(cache=>{
            cache.put(peticion,respuest.clone());
            return respuest.clone();
        });
    }
    else{
        return respuest;
    }
}