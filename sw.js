function responsePromise(){
    return new Promise(accept => {
        let obj = {
            nombre: "joaquin", apellido: "losada"
        }

        let resp = new Response(
            JSON.stringify(obj),
            {
                status: 200,
                statusText: "OK",
                headers: {
                    "content-type": "application/json"
                }
            }
        );
        accept(resp)

    })
}


function esperarPromise(ms){
    return new Promise(accept => {
        setTimeout(accept, ms);
    })
}

self.addEventListener("install", (evt) => {
    console.log("service worker install", evt)
    evt.waitUntil(esperarPromise(3000))
})

self.addEventListener("activate", (evt) => {
    console.log("service worker activate", evt)
})

self.addEventListener("fetch", (evt) => {
    console.log("service worker fetch", evt.request.url)

    if(evt.request.url.includes("index.html")){
        if(!navigator.onLine){
            let resp = new Response("<h1>Bienvenido a la parte offline</h1>",
            {
                status:200,
                statusText: "OK",
                headers: {
                    "content-type" : "text/html"
                }
            });

            evt.respondWith(resp)
        }
    }



    /*Ejemplo 2  */
    if(evt.request.url.includes("api/prueba")){
        console.log("Entra")
        evt.respondWith(responsePromise());
        
    }


    /* ejemplo 1 
    console.log("service worker fetch", evt.request.url)

    if(evt.request.url.includes("api/prueba")){
        let obj = {
            nombre: "joaquin", apellido: "losada"
        }

        let resp = new Response(
            JSON.stringify(obj),
            {
                status: 200,
                statusText: "OK",
                headers: {
                    "content-type": "application/json"
                }
            }
        );
        evt.respondWith(resp)
    }
    */
})