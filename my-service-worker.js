const version = 'v2';
const CACHE_LIST = [
  '/test_servicewoker/index.html',
  '/test_servicewoker/index.js',
  '/test_servicewoker/my.png',
];

/**
 * キャッシュを対象の登録ロジック
 * 
 */
self.addEventListener('install', (event) => {
  console.log('run install');
  event.waitUntil(
    caches.open(version).then((cache) => {
      return cache.addAll(CACHE_LIST);
    })
  );
});

/**
 * 削除する処理が必要な場合に記載する
 * 
 */
 self.addEventListener('activate', (event) => {
  console.log('run activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (version.indexOf(key) === -1) {
          console.log(key)
          return caches.delete(key);
        }
      }));
    })
  );
});

/**
 * キャッシュ対象の取得するか否かを判定して返す
 * 
 */
self.addEventListener('fetch', (event) => {
  console.log('run fetch');
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request).then((response) => {
        return caches.open(version).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});