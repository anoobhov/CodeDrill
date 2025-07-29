import Nav from "../components/nav";
import Footer from '../components/footer';
import Pricing from '../components/Homepage/pricing';
import Features from '../components/Homepage/Features';
import Main from '../components/Homepage/Main';

function Homepage(){
return(<div className='bg-gradient-to-tl from-gray-900 via-gray-500 to-gray-900 scroll-smooth'>
    <Nav/>
    {/* main */}
        <div className=" min-h-[100vh] p-25 pt-40 flex md:flex-row">
            <Main/>
        </div>
{/* features */}
<div className=" mt-5 p-3 text-center">
    <Features/>
</div>
{/* Pricing */}
<div className=" mt-5 p-6 text-center" id='sheets'>
  <Pricing/>
</div>
{/* ScreenShots */}
{/* Footer */}
<Footer/>
    </div>)
}

export default Homepage