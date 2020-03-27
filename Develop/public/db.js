let db;
// create a new db request for a "budget" database.
const request = window.indexedDB.open("budget", 1);
request.onupgradeneeded = function(event) {
  // create object store called "pending" and set autoIncrement to true
  const db = event.result;
  const pendingStore = db.createObjectStore("pending", {autoIncrement: true});
};

request.onsuccess = function({target}) {
  db = target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function({target}) {
  // log error here
  console.log(target.error)
};

function saveRecord(record) {
  const db = request.result
  // create a transaction on the pending db with readwrite access
  const transaction = db.transaction(['pending'], 'readwrite')
  // access your pending object store
  const pendingStore = transaction.objectStore('pending')
  // add record to your store with add method.
  pendingStore.add(record)
}

function checkDatabase() {
  const db = record.result
  // open a transaction on your pending db
  const transaction = db.transaction(['pending'], 'readwrite')
  // access your pending object store
  const pendingStore = transaction.objectStore('pending')
  // get all records from store and set to a variable
  const getPending = pendingStore.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
          // if successful, open a transaction on your pending db
          // access your pending object store
          // clear all items in your store
          pendingStore.clear();
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);