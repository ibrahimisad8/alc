let cacheName = 'currency-converter';

let filesToCache = [
	'./',
	'../index.html',
    '../css/style.css',
    '../css/layout.css',
    '../css/bootstrap.min.css',
];


self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Installed');
    e.waitUntil(    	
	    caches.open(cacheName).then((cache) => {    	
			return cache.addAll(filesToCache);
	    })
	); 
});


self.addEventListener('activate', (e) => {
	e.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(cacheNames.map((thisCacheName) => {
				if (thisCacheName !== cacheName) {				
					return caches.delete(thisCacheName);
				}
			}));
		})
	);

});


self.addEventListener('fetch', (e) => {
	let requestUrl = new URL(e.request.url);
	if (requestUrl.protocol.startsWith('http') && !requestUrl.pathname.startsWith('/api/v5/convert')) {
		e.respondWith(
			caches.open(cacheName)
				.then((cache) => {
					return cache.match(e.request).then((response) => {
						if (response) {
							return response;
						}

						return fetch(e.request).then((networkResponse) => {
							cache.put(e.request, networkResponse.clone());
							return networkResponse;
						})
					})
				})
		);
	}
});

self.addEventListener('message', (e) => {
	if (e.data.action === 'skipWaiting') {
		self.skipWaiting();
		let bool = confirm("There is an update available for download");
		if (bool) location.reload();
	}
});