export default function checkAutoComplete(autoWord) {
  const word = autoWord;
  const checkForm = new RegExp(/^[가-힣a-zA-Z0-9~!@#$%^&*()_+|<>?:{};\-=`.,/ ]{1,16}$/);

  return (word!=='' && checkForm.test(word));
}
