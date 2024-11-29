import '@/styles/globals.css';  // 기존 global CSS
import Navbar from '../components/navbar/Navbar';
import Header from "../components/navbar/Header";


function MyApp({ Component, pageProps }) {
  return(
  <div>
    <Header/>
    <main style = {{
      marginBottom : '70px'
    }}>
      <Component {...pageProps}/>
    </main>
    <Navbar/>
  </div> 

  )
}

export default MyApp;
