export default function filterAutoComplete(autoWord) {
    return autoWord.replace(/[^가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{};\-=`.,/ ]+/g,'')
  }