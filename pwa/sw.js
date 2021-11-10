const cacheName = 'sgv0'

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll([
      '/san-guo/pwa/',
      '/san-guo/pwa/index.html',
      '/san-guo/pwa/index.js',
      '/san-guo/pwa/sg256.png'
    ])).then(() => {
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== cacheName) {
          return caches.delete(key)
        }
      }))
    }).then(() => {
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const res = await caches.match(e.request)
    if (res) return res
    const response = await fetch(e.request)
    const cache = await caches.open(cacheName)
    cache.put(e.request, response.clone())
    return response
  })())
})