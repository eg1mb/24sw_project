import '@/styles/globals.css';  // 기존 global CSS
import Navbar from '../components/navbar/Navbar';
import Header from "../components/navbar/Header";


function MyApp({ Component, pageProps }) {
  return(
  <div>
    <Header/>
  <Component {...pageProps} 
  style = {{
    marginBottom : '70px'
  }}/>
  <Navbar/>
  </div> 

  )
}

export default MyApp;
