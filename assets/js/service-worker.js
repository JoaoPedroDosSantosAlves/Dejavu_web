// service-worker.js

self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker ativado');
    return self.clients.claim();
});

// Listener para notificações agendadas
self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const options = {
        body: data.body || 'Você tem uma nova tarefa!',
        icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png', // Ícone para a notificação
        vibrate: [200, 100, 200],
        data: { url: data.url || '/' },
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Lembrete de Tarefa', options)
    );
});

// Abrir a página ao clicar na notificação
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow(event.notification.data.url);
        })
    );
});
