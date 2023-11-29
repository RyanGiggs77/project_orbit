import './Hero.scss'
import aqua from '../../assets/aqua.webp'

const Hero = () => {
    return (
    <>
    <section className='Hero'>
        <div>
            <div className="banner">
                <h1>DETEKSI</h1>
                <p>Selamat datang di website Deteksi Tutup Botol! Nikmati kemudahan deteksi tutup botol secara instan dan akurat.</p>
            </div>
            <img src={aqua}/>
        </div>
    </section>
    </>
    )
  };
  
export default Hero;