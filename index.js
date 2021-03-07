if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/test_servicewoker/my-service-worker.js', { scope: '/test_servicewoker/' })
  .then(function(reg) {
    console.log('登録に成功しました。 Scope は ' + reg.scope);
  }).catch(function(error) {
    console.log('登録に失敗しました。' + error);
  });
}