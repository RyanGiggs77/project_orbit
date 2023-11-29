import './Content.scss'
import decor from '../../assets/decor.png'
import tutup from '../../assets/tutup.webp'
import aqua2 from '../../assets/aqua2.webp'
import { Link } from 'react-router-dom';

const Content = () => {
    return (
    <>
    <article className='Desc'>
        <section className='text'>
            <p>Teknologi Canggih</p>
            <h2>Kami menggunakan teknologi pengecekan terkini untuk memastikan deteksi tutup botol yang akurat dan efisien.</h2>
        </section>
        <img src={decor}/>
    </article>
    <article className='Contents'>
        <section className='content1'>
            <img src={tutup}/>
            <h3>Sistem deteksi tutup botol revolusioner yang mengubah dunia.</h3>
            <p>Dibuat dengan teknologi terkini dan algoritma andal, sistem deteksi tutup botol kami menjamin efisiensi dan keberhasilan di industri minuman.</p>
        </section>
        <section className='content2'>
            <img src={aqua2}/>
            <h3>Platform terintegrasi untuk deteksi, identifikasi, dan pelaporan.</h3>
            <p>Sistem kami tidak hanya mendeteksi, tetapi juga mengidentifikasi dan melaporkan hasil deteksi yang cepat dan akurat.</p>
        </section>
    </article>
    <article className='Deteksi'>
        <h3>DETEKSI SEKARANG!</h3>
        <p>Tunggu apa lagi? Ayo bergabung dengan sistem deteksi tutup botol terhebat di dunia! Lebih cepat, lebih andal, dan lebih inovatif.</p>
        <button><Link to='deteksi' className='links'>Mulai Deteksi</Link></button>
    </article>
    <article className='FAQ'>
        <h2>FAQ</h2>
        <div>
            <section>
                <h3>Apa saja fitur utama sistem ini?</h3>
                <p>Sistem kami menawarkan deteksi tutup botol yang akurat, identifikasi, pelaporan cepat, dan teknologi canggih.</p>
            </section>
            <section>
                <h3>Apakah sistem ini mudah digunakan?</h3>
                <p>Ya, aplikasi kami dirancang user-friendly dan intuitif, sehingga mudah digunakan oleh siapa saja.</p>
            </section>
            <section>
                <h3>Berapa biaya untuk menggunakan sistem ini?</h3>
                <p>Untuk harga GRATIS anda bisa akses dimanapun dan kapanpun</p>
            </section>
            <section>
                <h3>Bagaimana cara mendapatkan dukungan pelanggan?</h3>
                <p>Hubungi kami melalui halaman kontak atau email dukungan teknis yang tercantum di situs web.</p>
            </section>
        </div>
    </article>
    </>
    )
  };
  
export default Content;