"use strict";

import React from "react";
import * as info from "../../constants/applicationInfo";

const About = () => {
  return (
    <div className="container">
      <div className="about">
        <p>{info.AboutText}</p>
      </div>
    </div>
  );
};

export default About;