import '@/styles/globals.css';  // 기존 global CSS
import Navbar from '../components/navbar/Navbar';


function MyApp({ Component, pageProps }) {
  return(
  <div>
  <Component {...pageProps} />
  <Navbar/>
  </div> 

  )
}

export default MyApp;
