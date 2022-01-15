export default function changeDomain(domain) {
    const word = domain.slice(0,1);
    const checkEng = new RegExp(/^[a-zA-Z]$/);
    const f = ['G', 'G', 'N', 'D', 'D', 'R', 'M',
               'B', 'B', 'S', 'S', 'ㅇ', 'J', 'J',
               'C', 'K', 'T', 'F', 'H'];
    const s = ['A', 'A', 'Y', 'Y', 'E', 'E', 'Y',
               'Y', 'O', 'W', 'W', 'W', 'Y', 'W',
               'W', 'W', 'W', 'Y', 'E', 'U', 'I'];
    const ga = 44032;
    let uni = word.charCodeAt(0);
    uni = uni - ga;
    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - (fn * 588)) / 28);
    if(checkEng.test(word)) {
        return word.toUpperCase()
    } else if (f[fn] !== 'ㅇ') {
        return f[fn]
    } else {
        return s[sn]
    }
}