import React,{Component} from 'react'
import ComponentWithModal from '../componentwithmodal'

class Footer extends ComponentWithModal{


    render(){
        return <footer className="text-center one-footer">
            <div className="container">

                
                <div className="social">
                    <a href="#0" className="icon">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#0" className="icon">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#0" className="icon">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#0" className="icon">
                        <i className="fab fa-behance"></i>
                    </a>
                    <a href="#0" className="icon">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>

                <p className="mb-0">© 2018 <b>Design_Story</b>. All Rights Reserved.</p>

            </div>
        </footer>

    }
}

export default Footer