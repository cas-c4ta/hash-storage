let arr = [] // macht arbeit mit storage einträgen leichter
// ausserhalb deklariert, damit in konsole verfügbar

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

  // display Random & Hash as Paragraphs
  const pRand = document.querySelector('#current-random')
  pRand.innerHTML = `<strong>Current random number</strong>: <code>${myRandomNumber}</code>`
  const pHash = document.querySelector('#current-hash')
  pHash.innerHTML = `<strong>Current hash</strong>: <code>${fxhash}</code>`

  // fxHash to local storage
  // 
  arr = []

  for (var i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i)
    const value = localStorage.getItem(localStorage.key(i))
    console.log(`${key}: ${value}`)

    arr.push({key: key, hash: value})
  }
  console.log(arr)

  // Verdoppelungen vermeiden:
  if (arr.map(item=>item.hash).find(item=>(item == fxhash))) {
    // map erstellt array nur aus hashes
    // find sucht einen eintrag der dem aktuellen hash entspricht
    console.log('hash already in store')
  } else {
    console.log('add new hash')
    localStorage.setItem(`fxhash${localStorage.length}`, fxhash);
  }

  const historyList = document.querySelector('#history')
  historyList.innerHTML = ''
  if (arr.length) {
    for (const item of arr) {
      // Reihenfolge!
      const newLi = document.createElement('li')
      newLi.innerHTML = `<a href="/?seed=${item.hash}">${item.key}: ${item.hash}</a>`
      historyList.appendChild(newLi)
    }
  } else {
    console.log('no history in store yet')
  }
  // und was ist, wenn der aktuelle bereits früher drin war?



  /*
  Storage:
  Storage objects are simple key-value stores, similar to objects, but they stay intact through page loads. The keys and the values are always strings (note that, as with objects, integer keys will be automatically converted to strings). You can access these values like an object, or with the Storage.getItem() and Storage.setItem() methods. These three lines all set the (same) colorSetting entry

  It's recommended to use the Web Storage API (setItem, getItem, removeItem, key, length) to prevent the pitfalls associated with using plain objects as key-value stores.


  */

  document.querySelector('#clear-button').addEventListener('click', ()=> {
    localStorage.clear()
  })
  
});
