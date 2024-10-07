import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navBar'>
        <div className='home'>
            <Link to="/">Home</Link>
        </div>
        <div className='analytics'>
            <Link to="/analytics">Analytics</Link>
        </div>
            <div className='prediction'>
                <Link to="/prediction">Predict Property Price</Link>
            </div>
        </div>
    );
}

export default Navbar;