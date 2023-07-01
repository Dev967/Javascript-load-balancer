const {io} = require("socket.io-client")
const { initializeApp } = require("firebase/app");
const { getDatabase, ref,  set,push, increment} = require("firebase/database");

const firebaseConfig = {
    //paste firbease config here
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const socket = io('http://localhost:3000/live');

socket.on('work', (p) => {
    const promise = new Promise((res, rej) => {
        p.map(async (data) => {
            await work(data.event)
        })
        res()
    })
   promise.then(() => {
    socket.emit('work_done')
   }) 
})

const work = async (raw) => {
    const data = JSON.parse(raw);
    switch(data.event){
        case "category_clicked":
            const data1 = data.properties.category.name;
            if(data1) await incrementCount("categories", data1);
            break;
        case "company_clicked":
            const data2 = data.properties.company.companyName;
            if(data2) await incrementCount("companies", data2)
            break;
        case "stack_clicked":
            const data3 = data.properties.stack.companyName;
            if(data3) await incrementCount("stacks", data3)
            break;
        case "nav_clicked":
            const data4 = {doc: data.properties.nav, user: data.properties?.user.fullName ?? data.properties?.user.email ?? "", time: data.sentAt ?? ""};
            if(data4) await writeNotfication(data4)
    }
}

const writeNotfication = async (data) => {
    const listRef = ref(db, 'notifications');
    const notifRef = push(listRef);
    set(notifRef, {
        user: data.user,
        time: data.time,
        read: false
    });
}

const incrementCount = async (collection, doc) => {
    doc = doc.replace(".", " ");
  await set(ref(db, `${collection}/${doc}`), {
        count: increment(1)
  });

}