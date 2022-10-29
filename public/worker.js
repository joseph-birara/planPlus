console.log("Service Worker Loaded...");


this.addEventListener ('activate', function (event) {
  console.log ('service worker activated');
});
this.addEventListener ('push', async function (event) {
  const message = await event.data.json ();
  let {title, body} = message;
  console.log ("message ===",{message});
  await event.waitUntil (
    this.registration.showNotification (title, {
      body: body,
      actions: [
        {
          title: 'say hi',
        },
      ],
    })
  );
});