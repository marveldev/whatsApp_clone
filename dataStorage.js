const request = indexedDB.open('whatsApp', 2);

request.onsuccess = () => {
  const database = request.result;
  const transaction = database.transaction(['whatsApp'], 'readwrite')
  const store = transaction.objectStore('whatsApp');
  store.add({text: 'This is a sample Text', userPhoto: 'This is a sample image'})
}

request.onupgradeneeded = () => {
  const database = request.result;
  database.createObjectStore('whatsApp', { keyPath: 'itemId' });
}

request.onerror = () => {
  console.log('request unsuccessful');
}

const addEntryToDb = (entry) => {
  const database = request.result;
  const transaction = database.transaction(['whatsApp'], 'readwrite');
  const store = transaction.objectStore('whatsApp')
  store.add(entry);

  transaction.oncomplete = () => {
    console.log('success');
  }

  transaction.onerror = () => {
    console.log(`error adding to whatsApp`)
  }
}

const getEntryFromDb = () => {
  const data = new Promise((resolve, reject) => {
    const database = request.result
    const transaction = database.transaction(['whatsApp']);
    const store = transaction.objectStore('whatsApp')
    const getData = store.getAll();

    getData.onsuccess = () => {
      resolve(getData.result)
    }

    getData.onerror = () => {
      console.log(`error adding to 'item'`)
      reject(getData.error);
    }
  })
  return Promise.resolve(data);
}

const deleteEntry = (entryId) => {
  const database = request.result;
  const transaction = database.transaction(['whatsApp'], 'readwrite');
  const store = transaction.objectStore('whatsApp');
  store.delete(entryId)
}

export { request, addEntryToDb, getEntryFromDb, deleteEntry };
