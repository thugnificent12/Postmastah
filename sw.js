const C='direttoreufficio-v1',F=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./musica.mp3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
// Prima internet (cosi' il gioco e' sempre aggiornato), la copia salvata solo se non c'e' connessione.
// Si salvano solo le risposte complete (200) di questo sito; senza rete l'indirizzo con ?qualcosa usa la stessa copia.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request,{cache:'no-store'}).then(res=>{if(res.ok&&res.status===200&&res.type==='basic'){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});}return res;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))));});
