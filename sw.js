importScripts('/js/utils-sw.js');

const C_STATIC = 'estatico-1';
const C_DINAMICO = 'dinamico-1';
const C_INMUTABLE = 'inmutable-1';

const APP_SHELL=[
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/utils-sw.js'
];

const APP_INMUTABLE=[
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

self.addEventListener('install', evt=>{
    const cacheEstatico = caches.open(C_STATIC)
        .then(cache=>{
            cache.addAll(APP_SHELL);
        });
    const cacheInmutable = caches.open(C_INMUTABLE)
        .then(cache => {
            cache.addAll(APP_INMUTABLE);
        });
    evt.waitUntil(Promise.all([cacheEstatico,cacheInmutable])  );
});

self.addEventListener('activate', evt=>{
    const respt = caches.keys()
    .then(keys=>{
        keys.forEach(key=>{
            if (key !== C_STATIC && key.includes('estatico')){
                return caches.delete(key);
            }
        });
    });
    evt.waitUntil(respt);
});


self.addEventListener('fetch', evt=>{

const respuesta = caches.match(evt.request)
.then(resp=>{
    if(resp){
        return resp;
    }
    else{
        //console.log(evt.request.url);
        return fetch(evt.request)
        .then(nuevaR=>{
            return actualizarCacheDinamico(C_DINAMICO,evt.request,nuevaR);
        });
    }
});

    evt.respondWith(respuesta );
});