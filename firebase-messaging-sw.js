importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAwmqZpgzAsdwIURspaXeETp20ARbBR8lg",
  projectId: "thtilok-store",
  messagingSenderId: "215927517073",
  appId: "1:215927517073:web:dc324c3ca380d0912ab430"
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'icon-192.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
