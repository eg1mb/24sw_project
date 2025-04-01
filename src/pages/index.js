import Link from 'next/link';

export default function Home () {
  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      fontSize: '40px'
    }}>
      <div>
        말하기 연습은 sgoi와 함께! <br/> 
        <Link href="/test">
          <button style={{ marginTop: '10px' , fontSize : '10px' }}>테스트 하러 가기</button>
        </Link>
      </div>
    </div>
  );
}





