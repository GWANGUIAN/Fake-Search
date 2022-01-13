import React from 'react';

export default function NotFound({word}) {
  return <div className='notfound-container'>
      <div className='text-title'><span id='text-word'>{`'${word}'`}</span><span>에 해당하는 검색결과가 없습니다.</span></div>
      <ul>
          <li>단어의 철자가 정확한지 확인해 보세요.</li>
          <li>한글을 영어로 혹은 영어를 한글로 입력했는지 확인해 보세요.</li>
          <li>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</li>
          <li>두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</li>
          <li>검색 옵션을 변경해서 다시 검색해 보세요.</li>
      </ul>
  </div>;
}
