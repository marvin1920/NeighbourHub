import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css";

import heroImg from "../assets/images/hero.png";
import marketplaceImg from "../assets/images/marketplace.png";
import servicesImg from "../assets/images/services.png";
import communityImg from "../assets/images/community.png";

function Home() {
  return (
    <div className="home">
      <Navbar />

      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to NeighbourHub</h1>
          <p>Your Community. One Platform.</p>

          <a href="/register" className="hero-button">
            Join Your Community
          </a>
        </div>

        <img src={heroImg} alt="Neighbourhood community" className="hero-image" />
      </div>

      <div className="features">

        <div className="feature-card">
          <img src={marketplaceImg} alt="Marketplace" className="feature-image" />
          <h3>Marketplace</h3>
          <p>Buy and sell products within your community.</p>
        </div>

        <div className="feature-card">
          <img src={servicesImg} alt="Services" className="feature-image" />
          <h3>Services</h3>
          <p>Find and offer useful services to your neighbours.</p>
        </div>

        <div className="feature-card">
          <img src={communityImg} alt="Community Events" className="feature-image" />
          <h3>Community Events</h3>
          <p>Stay updated with events happening around you.</p>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default Home;