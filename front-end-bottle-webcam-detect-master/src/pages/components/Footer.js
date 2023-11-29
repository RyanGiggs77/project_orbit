import './Footer.scss'
import twitter from '../../assets/twitter.png'
import instagram from '../../assets/instagram.png'
import twitch from '../../assets/twitch.png'

const Footer = () => {
    return (
    <>
      <footer className='Footer' id='footer'>
        <div className='ImageContainer'>
            <img src={twitter}/>
            <img src={instagram}/>
            <img src={twitch}/>
        </div>
        <p>Hak Cipta © 2023 Deteksi Tutup Botol</p>
      </footer>
    </>
    )
  };
  
export default Footer;