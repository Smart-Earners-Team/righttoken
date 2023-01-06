import React, { useState } from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import {GiHamburgerMenu} from "react-icons/gi"
import {AiOutlineClose} from "react-icons/ai"
import { menuItem } from '../data/content'
import {StaticImage} from "gatsby-plugin-image"

import {FaTelegramPlane, FaFacebookF, FaTwitter, FaLinkedin, FaMediumM} from "react-icons/fa"

const Header = () => {
    const [navOpen, setNavOpen] = useState(false)
    const toggle=()=> setNavOpen(!navOpen)
  return (
    <header className='bg-black text-white flex items-center justify-between px-4 py-4 relative max-w-[1300px] m-auto '>
        <Link to='/'>
            <StaticImage src='../images/logo-transparent.png' width={150}  alt="zeroloss logo" />
        </Link>
        {/* <nav className={`${navOpen?"absolute top-[80px]  bg-black  w-screen translate-x-0":"md:translate-x-0 translate-x-[-1000px] sm:ml-auto sm:w-auto   sm:h-min"}      `} > */}
        <nav className={`${navOpen?" translate-x-0 left-0 p-10 top-[70px] z-50 h-[100vh] ml-auto justify-end w-screen":" p-0 translate-x-[-1000px] md:translate-x-0"} bg-[#e5e5e5] md:bg-transparent text-center text-black md:text-white absolute md:!static md:ml-auto sm:w-auto   sm:h-min` } >
            <menu className='flex text-xs md:!flex-row flex-col gap-10 ml-auto justify-end  basis-full '>
                {/* {menuItem.map((item,index)=> <li className='text-center p-5 text-xl' key={index}><a {...(item.download? "download": "")} href={item.url.toLowerCase()}>{item.linkText}</a></li>)} */}

<li><a href="index.html">HOME</a></li>
<li class="menu-item-has-children">
<a href="#">PLATFORMS</a>
{/* <menu class="sub-menu">
    <li><a class="smooth-link" data-link="milio-social" href="https://rightsledgerinc.com/index.html#milio-social">Milio Social</a></li>
    <li><a class="smooth-link" data-link="milio-live" href="https://rightsledgerinc.com/index.html#milio-live">Milio Live</a></li>
    <li><a class="smooth-link" data-link="milio-ondemand" href="https://rightsledgerinc.com/index.html#milio-ondemand">Milio OnDemand</a></li>
    <li><a class="smooth-link" data-link="milio-chat" href="https://rightsledgerinc.com/index.html#milio-chat;">Milio Chat</a></li>
    <li><a class="smooth-link" data-link="milio-cards" href="https://rightsledgerinc.com/index.html#milio-cards">Milio Cards</a></li>
    <li><a class="smooth-link" data-link="milio-marketplace" href="https://rightsledgerinc.com/index.html#marketplace">Milio Marketplace</a></li>
</menu> */}
</li>
<li><a class="smooth-link" data-link="team-section" href="https://rightsledgerinc.com/index.html#team-section">TEAM</a></li>
<li><a class="smooth-link" data-link="partners" href="https://rightsledgerinc.com/index.html#partners">PARTNERS</a></li>
<li><a href="https://rightsledgerinc.com/press.html">PRESS</a></li>
<li><a href="https://medium.com/RightsLedger">BLOG</a></li>
<li><a href="https://rightsledgerinc.com/support.html">SUPPORT</a></li>
<menu className='flex text-xs md:!flex-row flex-col gap-2 m-auto md:ml-auto justify-end  basis-full '>
    
<li class="header-social"><a href="https://t.me/Rightsledger_Philippines" target="_blank"><FaTelegramPlane /></a></li>
<li class="header-social"><a href="https://www.facebook.com/RightsLedger/" target="_blank"><FaFacebookF /></a></li>
<li class="header-social"><a href="https://twitter.com/RightsLedger" target="_blank"><FaTwitter /></a></li>
<li class="header-social"><a href="https://www.linkedin.com/company/18232840/" target="_blank"><FaLinkedin /></a></li>
<li class="header-social"><a href="https://medium.com/RightsLedger" target="_blank"><FaMediumM /></a></li>
</menu>
            </menu>
        </nav>
        <div className='ml-auto lg:ml-10 flex md:hidden gap-2'>
            
            {
                navOpen?<AiOutlineClose onClick={toggle} className="md:hidden"  color='white' size="30px"/>:<GiHamburgerMenu onClick={toggle} color="#ea2e2b" className='basis-full md:invisible' size="30px" />
            }
            <div className='flex'>
            </div>
        </div>

    </header>
  )
}

export default Header