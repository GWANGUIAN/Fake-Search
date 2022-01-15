export default function checkSiteName(siteName) {
    const name = siteName
    const checkForm = new RegExp(/^[가-힣a-zA-Z]{2,10}$/);
    const checkDomain = ['naver','daum','kakao','google','nate','네이버','다음','카카오','구글','네이트'] 
    
    if(name === null || name=== "" || checkDomain.some((el) => name.toLowerCase().includes(el))) {
        return false
    } else if(!checkForm.test(name)) {
        return false
    } else return true
}