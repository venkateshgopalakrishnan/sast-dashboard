import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

// About page component
const AboutPage = () => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>About Nanoheal</h1>
        <br />
        <p style={{ fontSize: 20 }}>
          Nanoheal provides automated, cognitive device user experience
          management software for brands of all sizes. Our innovative, patented
          platform provides companies ranging from Enterprise Help Desks to
          Small Businesses and Support Providers with everything needed to
          optimize the automated management of end-user devices.
        </p>

        <p style={{ fontSize: 20 }}>
          Our solutions give companies total transparency and complete control
          over every level of user interaction – all with the fastest, most
          forward-thinking, future proof technology in the industry. Whether a
          desktop, laptop, tablet, smart phone, or IoT device, with Nanoheal you
          are covered.
        </p>
      </Container>
    </Jumbotron>
  );
};

export default AboutPage;
