import React, { Component } from 'react';

import Navbar from './Navbar';
import FILLER from '../utils/FillerData';

class About extends Component {
  render() {
    const text = FILLER.text.map((para, index) => <p key={index}>{para}</p>);
    return (
      <div>
        <Navbar />
        <div className="about-text">
          {text}
        </div>
      </div>
    );
  }
}

export default About;
