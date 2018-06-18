import React from "react";

// Components
import ButtonLink from '../components/ButtonLink';

// Styles
import '../styles/Home.css';

export default class Home extends React.Component {
    render() {
        return (
            <div className='home'>
                <div className='home-nav'>
                    <ButtonLink to='/about' classes='nav-button' name='about' />
                    <a className='nav-button' href='https://www.gitbook.com/'>
                        docs
                    </a>
                </div>
                <div className='home-center'>
                    <div className='motto'>
                        <h2>
                            a RESTful api for <b>bad</b> developers and{" "}
                        <b>
                            <i>even</i> worse
                        </b>{" "}
                        human beings.
                        </h2>
                    </div>
                    <div className='login-signup-buttons'>
                        <ButtonLink to='/login' classes='nav-button' name='log in' />
                        <ButtonLink to='/signup' classes='nav-button' name='sign up' />
                    </div>
                </div>
                <div className='title'>
                    <h1>cards against developers</h1>
                </div>
            </div>
        );
    }
}