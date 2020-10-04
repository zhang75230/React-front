import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Fade } from 'react-awesome-reveal';

import '../styles/about.css'
import huy from '../images/devs/huy.jpg';
import austin from '../images/devs/austin.jpg';
import alice from '../images/devs/alice.jpg';
import linkedinIcon from '../images/linkedin.png';


const About = () => {
    return (
        <Fade className="about">
            <Header mapType="homemap" currentTab="About"/>
            <div className="title">
                <h1>Dev Team</h1>
            </div>
            
            <div className="img-container">
                <div className="card">
                    <div className="img-figure">
                        <img src={austin} alt="..." />
                    </div>
                    <div className="info">
                        <h3>Austin Sweet</h3>
                        <p className="role">Team Lead</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/austin-sweet/"><img src={linkedinIcon} /></a>
                    </div>
                    <hr />
                </div>

                <div className="card">
                    <div className="img-figure">
                        <img src={huy} alt="Huy Cam" />
                    </div>
                    <div className="info">
                        <h3>Huy Cam</h3>
                        <p className="role">Full-Stack Developer</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/huy-cam/"><img src={linkedinIcon} /></a>
                    </div>
                </div>

                <div className="card">
                    <div className="img-figure">
                        <img src={alice} alt="Alice Yeojin Yoo" />
                    </div>
                    <div className="info">
                        <h3>Alice Yeojin Yoo</h3>
                        <p className="role">Back End Developer</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>
                    <div className="linkedin">
                        <a href="https://www.linkedin.com/in/aliceyootech/"><img src={linkedinIcon} /></a>
                    </div>
                </div>                
            </div>
            <Footer />
        </Fade>
    );
}

export default About;