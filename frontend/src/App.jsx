import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const components = [
  {
    id: "blades",
    number: "01",
    title: "Blades",
    description: "Captent l'énergie du vent et la transforment en mouvement de rotation.",
  },
  {
    id: "hub",
    number: "02",
    title: "Hub",
    description: "Relie les trois pales à l'arbre principal et transmet leur rotation.",
  },
  {
    id: "pitch",
    number: "03",
    title: "Pitch System",
    description: "Contrôle l'angle des pales afin d'optimiser la capture de l'énergie du vent.",
  },
  {
    id: "shaft",
    number: "04",
    title: "Main Shaft",
    description: "Transmet la rotation du rotor vers le système mécanique de la nacelle.",
  },
  {
    id: "gearbox",
    number: "05",
    title: "Gearbox",
    description: "Augmente la vitesse de rotation nécessaire au fonctionnement du générateur.",
  },
  {
    id: "brake",
    number: "06",
    title: "Brake",
    description: "Permet de ralentir ou d'arrêter la rotation de l'éolienne.",
  },
  {
    id: "generator",
    number: "07",
    title: "Generator",
    description: "Transforme l'énergie mécanique de rotation en énergie électrique.",
  },
  {
    id: "yaw",
    number: "08",
    title: "Yaw System",
    description: "Oriente la nacelle afin que le rotor soit correctement face au vent.",
  },
  {
    id: "nacelle",
    number: "09",
    title: "Nacelle",
    description: "Contient les principaux équipements mécaniques et électriques de l'éolienne.",
  },
  {
    id: "tower",
    number: "10",
    title: "Tower",
    description: "Supporte la nacelle et le rotor à plusieurs dizaines de mètres de hauteur.",
  },
  {
    id: "transformer",
    number: "11",
    title: "Transformer",
    description: "Adapte la tension électrique avant son transfert vers le réseau.",
  },
  {
    id: "foundation",
    number: "12",
    title: "Foundation",
    description: "Maintient et stabilise l'ensemble de l'éolienne au sol.",
  },
];

function App() {
  const anatomyRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeComponent, setActiveComponent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!anatomyRef.current) return;

      const section = anatomyRef.current;
      const rect = section.getBoundingClientRect();

      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      /*
       * La section commence à 0% lorsque son haut
       * arrive au haut de l'écran.
       */
      const start = -viewportHeight * 0.1;
      const end = sectionHeight - viewportHeight;

      const current = Math.min(
        Math.max(-rect.top - start, 0),
        end
      );

      const progress =
        end > 0 ? current / end : 0;

      setScrollProgress(progress);

      const index = Math.min(
        Math.floor(progress * components.length),
        components.length - 1
      );

      setActiveComponent(index);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Transformation progressive de chaque composant.
   * Plus le composant est loin dans la liste,
   * plus il est séparé pendant le scroll.
   */
  const getComponentStyle = (index) => {
    const componentProgress =
      Math.min(
        Math.max(
          scrollProgress * components.length - index,
          0
        ),
        1
      );

    const positions = [
      -390,
      -320,
      -250,
      -180,
      -110,
      -50,
      40,
      110,
      180,
      250,
      320,
      390,
    ];

    const translateY =
      positions[index] * componentProgress;

    const scale =
      1 - componentProgress * 0.08;

    const opacity =
      index === 0
        ? 1
        : Math.max(
            0.35,
            0.4 + componentProgress * 0.6
          );

    return {
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      opacity,
    };
  };

  const active = components[activeComponent];

  return (
    <div className="app">

      {/* ==================================================
          NAVBAR
      ================================================== */}

      <nav className="navbar">

        <div className="brand">
          <div className="brand-symbol">
            W
          </div>

          <div>
            <span>WIND</span>
            <strong>AI</strong>
          </div>
        </div>

        <div className="nav-menu">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#anatomy">Anatomy</a>
          <a href="#ai">AI Monitoring</a>
        </div>

        <a
          href="#dashboard"
          className="nav-dashboard"
        >
          Dashboard
        </a>

      </nav>


      {/* ==================================================
          HERO
      ================================================== */}

      <section
        id="home"
        className="hero"
      >

        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="/videos/videoWind_Turbines.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-dark"></div>

        <div className="hero-content">

          <div className="hero-tag">
            WIND ENERGY × ARTIFICIAL INTELLIGENCE
          </div>

          <h1>
            THE ANATOMY
            <br />
            OF <span>WIND.</span>
          </h1>

          <p>
            Découvrez comment une éolienne transforme
            la puissance du vent en énergie électrique.
          </p>

          <a
            href="#about"
            className="hero-link"
          >
            EXPLORE ↓
          </a>

        </div>

        <div className="hero-bottom">

          <span>
            RENEWABLE ENERGY
          </span>

          <span>
            01 / 03
          </span>

        </div>

      </section>


      {/* ==================================================
          ABOUT
      ================================================== */}

      <section
        id="about"
        className="about"
      >

        <div className="about-image-wrapper">

          <img
            src="wind-turbine-exploded.png"
            alt="Wind turbine"
          />

          <div className="image-number">
            01
          </div>

        </div>

        <div className="about-text">

          <span className="eyebrow">
            THE POWER OF WIND
          </span>

          <h2>
            Quel est le rôle
            <br />
            d'une <em>éolienne ?</em>
          </h2>

          <p>
            Une éolienne transforme l'énergie cinétique
            du vent en énergie électrique. Les pales
            captent la force du vent et entraînent
            un ensemble de composants mécaniques
            permettant au générateur de produire
            de l'électricité.
          </p>

          <p>
            Mais une éolienne ne se résume pas à ses
            pales. Elle est composée de nombreux
            systèmes mécaniques, électriques et
            électroniques qui travaillent ensemble.
          </p>

          <div className="about-line">
            <span></span>
            <strong>
              SCROLL TO DISCOVER
            </strong>
          </div>

        </div>

      </section>


      {/* ==================================================
          ANATOMY / EXPLODED SCROLL
      ================================================== */}

      <section
        id="anatomy"
        className="anatomy"
        ref={anatomyRef}
      >

        <div className="anatomy-sticky">

          {/* LEFT TEXT */}

          <div className="anatomy-intro">

            <span className="eyebrow">
              02 — ANATOMY
            </span>

            <h2>
              The anatomy
              <br />
              of a <em>turbine.</em>
            </h2>

            <p>
              Faites défiler la page pour démonter
              progressivement l'éolienne et découvrir
              le rôle de chacun de ses composants.
            </p>

            <div className="progress-container">

              <div className="progress-label">
                <span>
                  COMPONENT
                </span>

                <span>
                  {active.number} / 12
                </span>
              </div>

              <div className="progress-bar">
                <div
                  style={{
                    width: `${scrollProgress * 100}%`,
                  }}
                ></div>
              </div>

            </div>

          </div>


          {/* TURBINE */}

          <div className="turbine-stage">

            <div className="wind-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>


            {/* FOUNDATION */}

            <div
              className="part foundation-part"
              style={getComponentStyle(11)}
              onClick={() => setActiveComponent(11)}
            >
              <div className="foundation-shape"></div>
            </div>


            {/* TOWER */}

            <div
              className="part tower-part"
              style={getComponentStyle(9)}
              onClick={() => setActiveComponent(9)}
            >
              <div className="tower-shape">

                <div className="tower-shadow"></div>

                <div className="tower-light"></div>

              </div>
            </div>


            {/* TRANSFORMER */}

            <div
              className="part transformer-part"
              style={getComponentStyle(10)}
              onClick={() => setActiveComponent(10)}
            >

              <div className="transformer-box">
                <span></span>
                <span></span>
                <span></span>
              </div>

            </div>


            {/* NACELLE */}

            <div
              className="part nacelle-part"
              style={getComponentStyle(8)}
              onClick={() => setActiveComponent(8)}
            >

              <div className="nacelle-shape"></div>

            </div>


            {/* YAW */}

            <div
              className="part yaw-part"
              style={getComponentStyle(7)}
              onClick={() => setActiveComponent(7)}
            >

              <div className="yaw-ring">
                Y
              </div>

            </div>


            {/* GENERATOR */}

            <div
              className="part generator-part"
              style={getComponentStyle(6)}
              onClick={() => setActiveComponent(6)}
            >

              <div className="generator-cylinder">
                <span>⚡</span>
              </div>

            </div>


            {/* BRAKE */}

            <div
              className="part brake-part"
              style={getComponentStyle(5)}
              onClick={() => setActiveComponent(5)}
            >

              <div className="brake-disc"></div>

            </div>


            {/* GEARBOX */}

            <div
              className="part gearbox-part"
              style={getComponentStyle(4)}
              onClick={() => setActiveComponent(4)}
            >

              <div className="gearbox-shape">

                <div className="gear gear-one">
                  ⚙
                </div>

                <div className="gear gear-two">
                  ⚙
                </div>

              </div>

            </div>


            {/* MAIN SHAFT */}

            <div
              className="part shaft-part"
              style={getComponentStyle(3)}
              onClick={() => setActiveComponent(3)}
            >

              <div className="shaft-cylinder"></div>

            </div>


            {/* PITCH SYSTEM */}

            <div
              className="part pitch-part"
              style={getComponentStyle(2)}
              onClick={() => setActiveComponent(2)}
            >

              <div className="pitch-ring">
                P
              </div>

            </div>


            {/* HUB */}

            <div
              className="part hub-part"
              style={getComponentStyle(1)}
              onClick={() => setActiveComponent(1)}
            >

              <div className="hub-shape"></div>

            </div>


            {/* BLADES */}

            <div
              className="part blades-part"
              style={getComponentStyle(0)}
              onClick={() => setActiveComponent(0)}
            >

              <div className="rotor">

                <div className="blade blade-a"></div>
                <div className="blade blade-b"></div>
                <div className="blade blade-c"></div>

                <div className="rotor-center"></div>

              </div>

            </div>

          </div>


          {/* RIGHT INFORMATION */}

          <div className="anatomy-info">

            <div className="info-number">
              {active.number}
            </div>

            <div className="info-line"></div>

            <span>
              COMPONENT
            </span>

            <h3>
              {active.title}
            </h3>

            <p>
              {active.description}
            </p>

            <div className="info-arrow">
              ↓
            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          COMPONENTS LIST
      ================================================== */}

      <section className="component-list">

        <div className="list-header">

          <span className="eyebrow">
            03 — COMPONENTS
          </span>

          <h2>
            Every part has
            <br />
            a <em>purpose.</em>
          </h2>

        </div>


        <div className="component-table">

          {components.map((component, index) => (

            <div
              className={`component-row ${
                activeComponent === index
                  ? "row-active"
                  : ""
              }`}
              key={component.id}
              onClick={() =>
                setActiveComponent(index)
              }
            >

              <div className="row-number">
                {component.number}
              </div>

              <div className="row-title">
                {component.title}
              </div>

              <div className="row-description">
                {component.description}
              </div>

              <div className="row-arrow">
                →
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ==================================================
          AI SECTION
      ================================================== */}

      <section
        id="ai"
        className="ai-section"
      >

        <div className="ai-left">

          <span className="eyebrow">
            04 — ARTIFICIAL INTELLIGENCE
          </span>

          <h2>
            From wind
            <br />
            to <em>intelligence.</em>
          </h2>

          <p>
            Les capteurs d'une éolienne produisent
            continuellement des données. Notre solution
            exploite ces données pour détecter des
            comportements anormaux et contribuer
            à la maintenance prédictive.
          </p>

          <a
            href="#dashboard"
            className="ai-button"
          >
            OPEN AI DASHBOARD →
          </a>

        </div>


        <div className="ai-visual">

          <div className="ai-orbit orbit-one"></div>
          <div className="ai-orbit orbit-two"></div>
          <div className="ai-orbit orbit-three"></div>

          <div className="ai-core">

            <span>
              AI
            </span>

            <small>
              MONITORING
            </small>

          </div>

        </div>

      </section>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer className="footer">

        <div className="footer-top">

          <div className="footer-logo">

            <div className="brand">
              <div className="brand-symbol">
                W
              </div>

              <div>
                WIND<strong>AI</strong>
              </div>
            </div>

            <p>
              Intelligent monitoring
              for the future of wind energy.
            </p>

          </div>


          <div className="footer-column">

            <h4>
              Explore
            </h4>

            <a href="#home">
              Home
            </a>

            <a href="#about">
              About
            </a>

            <a href="#anatomy">
              Anatomy
            </a>

            <a href="#ai">
              AI Monitoring
            </a>

          </div>


          <div className="footer-column">

            <h4>
              Technology
            </h4>

            <span>
              Machine Learning
            </span>

            <span>
              Python
            </span>

            <span>
              SHAP
            </span>

            <span>
              FastAPI
            </span>

          </div>


          <div className="footer-column">

            <h4>
              Project
            </h4>

            <span>
              Predictive Maintenance
            </span>

            <span>
              Wind Turbine
            </span>

            <span>
              Data Science
            </span>

            <span>
              Artificial Intelligence
            </span>

          </div>

        </div>


        <div className="footer-bottom">

          <span>
            © 2026 WIND AI
          </span>

          <span>
            DATA • AI • WIND ENERGY
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;