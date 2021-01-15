const request = indexedDB.open('whatsApp', 4)

request.onsuccess = () => {
  const database = request.result
  database.transaction(['whatsApp'], 'readwrite')
}

request.onupgradeneeded = () => {
  const database = request.result
  database.createObjectStore('chatPageBackground', { autoIncrement: true })
  database.createObjectStore('statusData', { autoIncrement: true })
  database.createObjectStore('chatData', { keyPath: 'itemId' })
}

request.onerror = () => {
  console.log('request unsuccessful')
}

const addEntryToDb = (storeName, entry) => {
  const database = request.result
  const transaction = database.transaction([storeName], 'readwrite')
  const store = transaction.objectStore(storeName)
  store.add(entry)

  transaction.oncomplete = () => {
    console.log('success')
  }

  transaction.onerror = () => {
    console.log(`error adding to ${storeName}`)
  }
}

const getEntryFromDb = (storeName) => {
  const data = new Promise((resolve, reject) => {
    const database = request.result
    const transaction = database.transaction([storeName])
    const store = transaction.objectStore(storeName)
    const getData = store.getAll()

    getData.onsuccess = () => {
      resolve(getData.result)
    }

    getData.onerror = () => {
      reject(getData.error)
    }
  })
  return Promise.resolve(data)
}

const clearAllEntries = (storeName) => {
  const database = request.result;
  const transaction = database.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  store.clear();
}

const deleteEntry = (itemId) => {
  const database = request.result
  const transaction = database.transaction(['chatData'], 'readwrite')
  const store = transaction.objectStore('chatData')
  for (let index = 0; index < itemId.length; index++) {
    const singleItemId = itemId[index]
    store.delete(singleItemId)
  }
}

export { request, addEntryToDb, getEntryFromDb, clearAllEntries, deleteEntry }
