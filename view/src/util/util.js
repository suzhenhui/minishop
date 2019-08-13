export default {
    fetch(key){
      return JSON.parse(window.localStorage.getItem(key)) || '[]'
    },
    save(key,value){
      return window.localStorage.setItem(key,JSON.stringify(value))
    }
}
