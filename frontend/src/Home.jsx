import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import turbineExplodedImg from "./assets/wind-turbine-exploded.png";
import eolienneChampImg from "./assets/eolienne-champ.jpg";


/* ------------------------------------------------------------------ */
/*  Éolienne interactive : photo "vue éclatée" révélée au survol       */
/* ------------------------------------------------------------------ */
function ExplodedTurbine() {
  return (
    <div className="exploded-photo">
      <img
        className="exploded-photo__img"
        src={turbineExplodedImg}
        alt="Vue éclatée d'une éolienne détaillant chaque composant : pales, moyeu, arbre principal, multiplicateur, frein, générateur, nacelle, système d'orientation, tour, transformateur et fondation."
      />

      <div className="exploded-photo__veil">
        <span className="exploded-photo__hint">
          <svg viewBox="0 0 24 24" className="exploded-photo__hint-icon">
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12h8M12 8v8" />
          </svg>
          Survolez pour explorer la vue éclatée
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Étapes du pipeline : capteur -> décision                           */
/* ------------------------------------------------------------------ */
const PIPELINE_STEPS = [
  {
    id: "acquisition",
    title: "Acquisition",
    desc: "Capture des vibrations via capteurs haute fréquence.",
  },
  {
    id: "fenetrage",
    title: "Fenêtrage",
    desc: "Découpage en segments de 10 000 échantillons.",
  },
  {
    id: "extraction",
    title: "Extraction",
    desc: "Calcul (Moyenne, RMS, Kurtosis, Skewness, Peak-to-peak).",
  },
  {
    id: "ia",
    title: "IA Analysis",
    desc: "Traitement par modèles avancés (XGBoost, SVM).",
  },
  {
    id: "decision",
    title: "Décision",
    desc: "Classification : ÉOLIENNE SAINE ou ENDOMMAGÉE.",
  },
];

function PipelineIcon({ id }) {
  switch (id) {
    case "acquisition":
      return (
        <svg viewBox="0 0 32 32" className="pipeline-icon">
          <path d="M3 18h5l3-10 4 18 3-13 2 5h9" />
        </svg>
      );
    case "fenetrage":
      return (
        <svg viewBox="0 0 32 32" className="pipeline-icon">
          <rect x="4" y="8" width="24" height="16" rx="2" />
          <line x1="12" y1="8" x2="12" y2="24" />
          <line x1="20" y1="8" x2="20" y2="24" />
        </svg>
      );
    case "extraction":
      return (
        <svg viewBox="0 0 32 32" className="pipeline-icon">
          <line x1="6" y1="26" x2="6" y2="14" />
          <line x1="14" y1="26" x2="14" y2="6" />
          <line x1="22" y1="26" x2="22" y2="18" />
          <line x1="3" y1="26" x2="29" y2="26" />
        </svg>
      );
    case "ia":
      return (
        <svg viewBox="0 0 32 32" className="pipeline-icon">
          <rect x="9" y="9" width="14" height="14" rx="2" />
          <circle cx="16" cy="16" r="3" />
          <line x1="16" y1="2" x2="16" y2="9" />
          <line x1="16" y1="23" x2="16" y2="30" />
          <line x1="2" y1="16" x2="9" y2="16" />
          <line x1="23" y1="16" x2="30" y2="16" />
        </svg>
      );
    case "decision":
      return (
        <svg viewBox="0 0 32 32" className="pipeline-icon">
          <circle cx="16" cy="16" r="12" />
          <path d="M10 16.5l4 4 8-9" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Page d'accueil                                                      */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <div className="page">
      {/* ------------------------------- NAV ------------------------------- */}
      <header className="nav">
        <div className="nav__logo">
          <span className="nav__logo-mark">≋</span>
          WINDGUARD AI
        </div>
        <nav className="nav__links">
          <a href="#mission">Mission</a>
          <a href="#composants">Composants</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#ia">IA</a>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Link className="btn btn--accent" to="/dashboard">
          Dashboard
        </Link>
      </header>

      {/* ------------------------------- HERO ------------------------------ */}
      <section className="hero" id="mission">
        <div className="hero__overlay" />
        <div className="hero__content">
          <h1 className="hero__title">
            L'énergie du vent.
            <br />
            <em>La technologie de demain.</em>
          </h1>
          <p className="hero__subtitle">Surveiller. Comprendre. Anticiper.</p>
          <p className="hero__text">
            Une solution intelligente de maintenance prédictive basée sur
            l'analyse des vibrations des éoliennes.
          </p>
          <a className="btn btn--outline" href="#composants">
            Découvrir le projet →
          </a>
        </div>
      </section>

      {/* --------------------------- PHOTO + Q&A ---------------------------- */}
      <section className="intro">
        <div className="intro__photo">
          <img
            src={eolienneChampImg}
            alt="Éolienne dans un champ, ciel bleu"
          />
        </div>

        <div className="intro__content">
          <div className="intro__qa">
            <h3>C'est quoi le rôle d'une éolienne ?</h3>
            <p>
              Une éolienne capte l'énergie cinétique du vent grâce à la
              rotation de ses pales, la transmet sous forme d'énergie
              mécanique via l'arbre et le multiplicateur, puis la convertit
              en électricité grâce au générateur. Elle transforme ainsi une
              ressource naturelle et renouvelable en énergie directement
              exploitable sur le réseau.
            </p>
          </div>

          <div className="intro__features">
            <div className="feature">
              <h4>Efficiency</h4>
              <p>Optimisation maximale</p>
            </div>
            <div className="feature">
              <h4>Predictive</h4>
              <p>Anticipation des pannes</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------ DÉCOMPOSITION INTERACTIVE ------------------------ */}
      <section className="decomposition" id="composants">
        <h2>Décomposition interactive</h2>
        <p className="decomposition__intro">
          Survolez l'éolienne pour explorer sa structure interne et
          comprendre le rôle de chaque composant.
        </p>

        <ExplodedTurbine />
      </section>

      {/* ------------------------------ PIPELINE ------------------------------ */}
      <section className="pipeline" id="pipeline">
        <h2>Des données brutes à des décisions concrètes</h2>
        <div className="pipeline__steps">
          {PIPELINE_STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              <div
                className={`pipeline__step${
                  step.id === "decision" ? " pipeline__step--decision" : ""
                }`}
              >
                <span className="pipeline__number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pipeline__icon">
                  <PipelineIcon id={step.id} />
                </span>
                <h4 className="pipeline__title">{step.title}</h4>
                <p className="pipeline__desc">{step.desc}</p>
              </div>

              {i < PIPELINE_STEPS.length - 1 && (
                <span className="pipeline__arrow" aria-hidden="true">
                  →
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* --------------------------------- IA --------------------------------- */}
      <section className="ia" id="ia">
        <h2>
          Intelligence Artificielle &amp; <em>Performance</em>
        </h2>
        <p>
          Nous avons testé les algorithmes les plus robustes de l'industrie
          pour garantir une fiabilité absolue. Voici les résultats obtenus
          sur notre jeu de test.
        </p>

        <div className="ia__grid">
          <div className="ia__metrics">
            <div className="ia__tags">
              <span className="tag tag--forest">Random Forest</span>
              <span className="tag tag--svm">SVM</span>
              <span className="tag tag--xgb">XGBoost</span>
            </div>

            <div className="ia__stats-grid">
              <div className="ia__stat">
                <span className="ia__label">Accuracy</span>
                <span className="ia__value">100%</span>
              </div>
              <div className="ia__stat">
                <span className="ia__label">Precision</span>
                <span className="ia__value">100%</span>
              </div>
              <div className="ia__stat">
                <span className="ia__label">Recall</span>
                <span className="ia__value">100%</span>
              </div>
              <div className="ia__stat">
                <span className="ia__label">F1-Score</span>
                <span className="ia__value">100%</span>
              </div>
            </div>

            <div className="ia__stat ia__stat--wide">
              <span className="ia__label">ROC-AUC</span>
              <span className="ia__value">1.00</span>
            </div>

            <p className="ia__note">
              * Résultats basés sur le jeu de test spécifique utilisé lors du
              développement du projet.
            </p>
          </div>

          <div className="ia__shap">
            <svg className="ia__shap-deco" viewBox="0 0 200 200" aria-hidden="true">
              <path d="M40 160 L160 40 M110 40 H160 V90" />
            </svg>

            <div className="ia__shap-header">
              <span className="ia__shap-icon">
                <svg viewBox="0 0 32 32">
                  <circle cx="16" cy="16" r="13" />
                  <circle cx="16" cy="16" r="6" />
                </svg>
              </span>
              <h4>Analyse SHAP</h4>
            </div>

            <p>
              Grâce à l'analyse SHAP (Shapley Additive exPlanations), nous
              avons identifié les caractéristiques les plus déterminantes
              dans la classification&nbsp;:
            </p>

            {[
              { label: "Écart-type (Std)", value: 92 },
              { label: "Variance", value: 88 },
              { label: "RMS (Root Mean Square)", value: 85 },
            ].map((item) => (
              <div className="ia__shap-item" key={item.label}>
                <div className="ia__shap-row">
                  <span>{item.label}</span>
                  <em>Impact majeur</em>
                </div>
                <div className="ia__shap-track">
                  <div
                    className="ia__shap-fill"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="ia__shap-callout">
              <p>
                Ces indicateurs temporels et fréquentiels permettent à l'IA
                de distinguer les signatures vibratoires d'une structure
                saine de celles d'une structure présentant des
                micro-fissures ou des défauts d'alignement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------- FOOTER ------------------------------- */}
      <footer className="footer">
        <div className="footer__brand">
          <div className="nav__logo">
            <span className="nav__logo-mark">≋</span>
            WINDGUARD AI
          </div>
          <p>
            L'excellence technologique au service de la transition
            énergétique. Une solution française dédiée à l'optimisation et
            à la sécurisation du parc éolien mondial.
          </p>
        </div>

        <div className="footer__col">
          <h5>Navigation</h5>
          <a href="#mission">Accueil</a>
          <a href="#mission">Mission</a>
          <a href="#composants">Technologie</a>
          <a href="#ia">Performance</a>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className="footer__col">
          <h5>Contact</h5>
          <p>contact@windguard-ai.fr</p>
          <p>Grenoble, France</p>
          <p className="footer__disclaimer">
            Projet académique — données simulées à des fins de démonstration
            technologique.
          </p>
        </div>

        <div className="footer__bottom">© 2026 WindGuard AI. Tous droits réservés.</div>
      </footer>
    </div>
  );
}