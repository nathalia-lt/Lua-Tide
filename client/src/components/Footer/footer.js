import React from "react";
import './footer.css';
import iconlinkedin from './icon-linkedin.png'
import icongithub from './icon-github.png'
import icontwitter from './icon-twitter.png'


function Footer(){

    function handleClickLinkedin(){
        window.open('https://www.linkedin.com/in/nathalia-troina-140095130/')
    }

    function handleClickGithub(){
        window.open('https://github.com/nathalia-lt')
    }

    function handleClickTwitter(){
        window.open('http://www.twitter.com')
    }

    return(
        <div>
            <div className="iconswrapper">
                <img src={iconlinkedin} alt="Linkedin" onClick={handleClickLinkedin}/>
                <img src={icongithub} alt="Github" onClick={handleClickGithub} />
                <img src={icontwitter} alt="Twitter" onClick={handleClickTwitter} />
           
            </div>
            <div className="bottomtext"> All rights reserved </div>
        </div>
    )

}

export default Footer;

