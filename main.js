let arr = []
// Storage Einträge sind in Key-Value Textformat.
// Damit es einfacher wird, damit zu arbeiten,
// deklariere ich einen leeren Array, den ich später befülle.

// Sicherheitsahlber warten wir das Laden des Dokuments ab.
window.addEventListener("load", (event) => {
  console.log("page is fully loaded")
  BuildFxhash()
  const r = fxrand

  //--- --> seed für URL ----
  let params = new URLSearchParams(location.search);
  if (params.has("seed")) {
      console.log('has seed')
  } else {
      console.log('no seed')
  }

  myRandomNumber = r()

  // Display current random number
  const pRand = document.querySelector('#current-random')
  pRand.innerHTML = `<strong>Current random number</strong>: <code>${myRandomNumber}</code>`

  // Display current Hash
  const pHash = document.querySelector('#current-hash')
  pHash.innerHTML = `<strong>Current hash</strong>: <code>${fxhash}</code>`

  // fxHash to local storage
  for (var i = 0; i < localStorage.length; i++) { // Iteration über Storage
    const key = localStorage.key(i) // Name unter welchem der Wert gespeichert ist
    const value = localStorage.getItem(localStorage.key(i)) // der gespeicherte Wert
    console.log(`${key}: ${value}`)

    arr.push({key: key, hash: value})  // (arr mit sauber formatierten JS-Objekt befüllen)
  }
  console.log(arr)

  // Verdoppelungen vermeiden:
  if (arr.map(item=>item.hash).find(item=>(item == fxhash))) {
    // Der Array wird mit Array-Methoden (Higher Order Functions) prozessiert:
    // .map() erstellt einen Array nur aus den Hashes
    // .find() sucht einen Eintrag der dem aktuellen hash entspricht
    // So wird geprüft, ob der aktuelle Hash schon gespeichert ist,
    // weil er früher schon einmal verwendet wurde.
    console.log('hash already in store')
  } else { // neuer Hash!
    console.log('Add new hash to storage.')
    localStorage.setItem(`fxhash${localStorage.length}`, fxhash);
  }

  // Auflisten der bisherigen Hashes in Liste
  // Die Liste wird auch mit Links ausgestattet,
  // die die Seite mit ?seed-Parameter laden.
  const historyList = document.querySelector('#history')
  historyList.innerHTML = ''
  if (arr.length) { // gibts schon Einträge im Speicher?
    for (const item of arr) {
      // Reihenfolge stimmt leider noch nicht.
      // ich verstehe noch nicht, wie die Storage-Chronologie funktioniert,
      // bzw. wie ich den Array danach sauber ordnen kann. Nicht dringend.
      const newLi = document.createElement('li')
      newLi.innerHTML = `<a href="/?seed=${item.hash}">${item.key}: ${item.hash}</a>`
      historyList.appendChild(newLi)
    }
  } else {
    console.log('no history in store yet')
  }

  /*
  Storage (aus MDN):
  Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads. The keys and the values are always strings (note that, as with objects, integer keys will be automatically converted to strings). You can access these values like an object, or with the Storage.getItem() and Storage.setItem() methods. These three lines all set the (same) colorSetting entry

  It's recommended to use the Web Storage API (setItem, getItem, removeItem, key, length) to prevent the pitfalls associated with using plain objects as key-value stores.
  */

  // Button zum leeren des Speichers
  document.querySelector('#clear-button').addEventListener('click', ()=> {
    localStorage.clear()
  })
  
});
