<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thrilok Hub | Control Center</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore-compat.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        body { background: #020617; color: #f8fafc; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-tap-highlight-color: transparent; }
        .glass { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .tab-active { background: #3b82f6 !important; color: white !important; box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.5); }
        input, select, textarea { background: rgba(0,0,0,0.3) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: white !important; }
    </style>
</head>
<body class="pb-24">

    <div class="sticky top-0 z-50 glass p-5 flex justify-between items-center border-b border-white/5">
        <h1 class="font-extrabold text-sm uppercase italic">Admin <span class="text-blue-500">Panel</span></h1>
        <button onclick="location.reload()" class="bg-white/5 w-10 h-10 rounded-full flex items-center justify-center border border-white/10"><i class="fa-solid fa-rotate-right text-xs"></i></button>
    </div>

    <div class="max-w-4xl mx-auto p-5 space-y-8">
        <nav class="flex p-2 glass rounded-3xl gap-2 sticky top-24 z-40 overflow-x-auto">
            <button onclick="showSection('p')" id="btn-p" class="tab-active flex-1 py-4 px-4 rounded-2xl text-[10px] font-black uppercase">Products</button>
            <button onclick="showSection('o')" id="btn-o" class="flex-1 py-4 px-4 rounded-2xl text-[10px] font-black uppercase">Orders</button>
            <button onclick="showSection('s')" id="btn-s" class="flex-1 py-4 px-4 rounded-2xl text-[10px] font-black uppercase">Setup</button>
            <button onclick="showSection('n')" id="btn-n" class="flex-1 py-4 px-4 rounded-2xl text-[10px] font-black uppercase text-blue-400">Push</button>
        </nav>

        <section id="sec-p" class="space-y-6">
            <div class="glass p-8 rounded-[2.5rem] space-y-5">
                <input id="p-n" placeholder="Product Title" class="w-full p-4 rounded-2xl outline-none">
                <input id="p-pr" type="number" placeholder="Price (₹)" class="w-full p-4 rounded-2xl outline-none">
                <input id="p-i1" placeholder="Main Image URL" class="w-full p-4 rounded-2xl outline-none">
                <button onclick="saveP()" class="w-full bg-blue-600 py-5 rounded-[2rem] font-black uppercase">Push to Live Store</button>
            </div>
            <div id="p-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </section>

        <section id="sec-n" class="hidden space-y-6">
            <div class="glass p-8 rounded-[2.5rem] space-y-4 border-blue-500/20">
                <h2 class="text-lg font-black italic uppercase">Send <span class="text-blue-500">Push Alert</span></h2>
                <input id="n-t" placeholder="Alert Title (e.g. 50% Off!)" class="w-full p-4 rounded-2xl outline-none">
                <textarea id="n-b" placeholder="Message content..." class="w-full p-4 rounded-2xl outline-none h-24"></textarea>
                <button onclick="sendPush()" class="w-full bg-blue-600 py-5 rounded-[2rem] font-black uppercase tracking-widest">
                    Broadcast Now 🚀
                </button>
            </div>
        </section>

        <section id="sec-o" class="hidden"> <div id="ord-list"></div> </section>
        <section id="sec-s" class="hidden"> </section>
    </div>

    <script>
        const firebaseConfig = { apiKey: "AIzaSyAwmqZpgzAsdwIURspaXeETp20ARbBR8lg", authDomain: "thtilok-store.firebaseapp.com", projectId: "thtilok-store" };
        firebase.initializeApp(firebaseConfig); const db = firebase.firestore();

        function showSection(s) {
            document.querySelectorAll('section').forEach(x => x.classList.add('hidden'));
            document.querySelectorAll('nav button').forEach(x => x.classList.remove('tab-active'));
            document.getElementById('sec-'+s).classList.remove('hidden');
            document.getElementById('btn-'+s).classList.add('tab-active');
        }

        async function saveP() {
            const data = { name: document.getElementById('p-n').value, price: document.getElementById('p-pr').value, img1: document.getElementById('p-i1').value, updated: Date.now() };
            await db.collection('products').add(data);
            alert("Added! ✅");
        }

        async function sendPush() {
            const t = document.getElementById('n-t').value;
            const b = document.getElementById('n-b').value;
            if(!t || !b) return alert("Fill all!");
            await db.collection('notifications').add({ title: t, body: b, time: firebase.firestore.FieldValue.serverTimestamp() });
            alert("Sent! 🚀");
        }
    </script>
</body>
</html>
