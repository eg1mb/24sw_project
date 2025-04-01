// app/components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link href="/">Home</Link></li>
        <li style={styles.navItem}><Link href="/test">Test</Link></li>
        <li style={styles.navCenterItem}><Link href="/add">+</Link></li>
        <li style={styles.navItem}><Link href="/result">Result</Link></li>
        <li style={styles.navItem}><Link href="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#f8f9fa', // 배경색을 흰색에 가깝게 설정
    padding: '10px 20px',
    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // 살짝 그림자 추가
    position: 'fixed', // 화면 하단에 고정
    bottom: 0,
    width: '100%',
  },
  navList: {
    display: 'flex',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column', // 아이콘과 텍스트를 세로로 배치
    alignItems: 'center',
    color: '#6c757d', // 회색으로 설정하여 비활성화된 느낌
    margin: '0 20px',
    fontSize: '14px',
    textDecoration: 'none',
  },
  navCenterItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    fontSize: '24px',
    margin: '0 20px',
    boxShadow: '0px 4px 10px rgba(0, 123, 255, 0.3)', // 버튼에 그림자 추가
  },
  '@media (max-width: 768px)': {
    navList: {
      flexDirection: 'row', // 모바일에서도 가로 배치를 유지
      justifyContent: 'space-around', // 버튼 간격을 조정하여 전체 화면에 맞춤
    },
    navCenterItem: {
      width: '40px',
      height: '40px',
      fontSize: '20px',
      margin: '0 10px',
    },
  },
};

export default Navbar;
