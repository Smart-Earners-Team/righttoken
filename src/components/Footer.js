import { Link } from 'gatsby'
import { AiFillTwitterCircle, } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'
import { AiFillMediumCircle } from 'react-icons/ai'
import React, { useEffect } from 'react'
import { BsDiscord, BsTelegram } from 'react-icons/bs'
import {FaTelegramPlane, FaFacebookF, FaTwitter, FaLinkedin, FaMediumM} from "react-icons/fa"


const Footer = () => {

  useEffect(()=>{
    async function dynamicImportModule(){
      const DynamicModule = (await import('boxicons'))
    }

    dynamicImportModule()
  }, [])
  return (
    <footer className='text-white p-10 text-xs font-light text-center justify-between flex bg-black flex-col md:flex-row flex-wrap items-center '>
      <p>©2023 RIGHTSLEDGERINC.COM</p>
      <div>
        <p>
        FOR MORE INFORMATION, CONTACT US AT <br />
      <span>INFO@RIGHTSLEDGERINC.COM</span>
        </p>
      </div>

        <menu className='flex text-xs gap-2 justify-center '>
    
<li class="header-social"><a href="https://t.me/Rightsledger_Philippines" target="_blank"><FaTelegramPlane /></a></li>
<li class="header-social"><a href="https://www.facebook.com/RightsLedger/" target="_blank"><FaFacebookF /></a></li>
<li class="header-social"><a href="https://twitter.com/RightsLedger" target="_blank"><FaTwitter /></a></li>
<li class="header-social"><a href="https://www.linkedin.com/company/18232840/" target="_blank"><FaLinkedin /></a></li>
<li class="header-social"><a href="https://medium.com/RightsLedger" target="_blank"><FaMediumM /></a></li>
</menu>


    </footer>
  )
}

export default Footer
