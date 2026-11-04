import React from "react";
import "./AnalysisReport.css";

/* ------------------------------------------------------------------ */
/*  Icônes (SVG en ligne, même convention que le reste du projet)      */
/* ------------------------------------------------------------------ */
function DatabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="analysis-report__icon">
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="analysis-report__icon">
      <path d="M12 3.5 2.5 20h19L12 3.5Z" />
      <line x1="12" y1="9.5" x2="12" y2="14" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="analysis-report__icon">
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="analysis-report__icon">
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
      <line x1="8" y1="3" x2="8" y2="6.5" />
      <line x1="16" y1="3" x2="16" y2="6.5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="analysis-report__icon">
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="11" x2="12" y2="16" />
      <circle cx="12" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="analysis-report__check">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.3 12.3l2.4 2.4 5-5.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Carte de résultat d'analyse IA                                     */
/* ------------------------------------------------------------------ */
export default function AnalysisReport({
  analysisId = "ANL-225",
  status = "Damaged",
  isHealthy, // NOUVEAU
  probability = 97.24,
  riskLevel = "Critical",
  riskPercent = 55,
  date = "14/09/2026 00:31:31",
  features = [
    "Vibration Amplitude",
    "Harmonic Distortion",
    "Thermal Variance",
    "Blade Angle Dev.",
  ],
  onExport,
  onAlert,
}) {
  // NOUVEAU : déduit l'état si isHealthy n'est pas fourni explicitement
  const healthy = isHealthy ?? /healthy|sain/i.test(status);

  return (
    <div
      className={`analysis-report ${
        healthy ? "analysis-report--healthy" : "analysis-report--damaged"
      }`}
    >
      <div className="analysis-report__header">
        <div className="analysis-report__header-left">
          <div className="analysis-report__eyebrow">
            <DatabaseIcon />
            <span>Analysis ID : {analysisId}</span>
          </div>
          <h1 className="analysis-report__title">Rapport d'Analyse IA</h1>
        </div>

        <span className="analysis-report__badge">
          {healthy ? <ShieldIcon /> : <AlertTriangleIcon />}
          {status}
        </span>
      </div>
      {/* ... le reste du fichier ne change pas ... */}

      <div className="analysis-report__grid">
        <div className="analysis-report__col">
          <p className="analysis-report__label">Probabilité</p>
          <div className="analysis-report__prob">
            <span className="analysis-report__prob-value">
              {probability}%
            </span>
            <span className="analysis-report__prob-caption">
              Confiance modèle
            </span>
          </div>

          <div className="analysis-report__risk-card">
            <div className="analysis-report__risk-row">
              <span className="analysis-report__risk-label">
                <ShieldIcon />
                Niveau de Risque
              </span>
              <span className="analysis-report__risk-pill">{riskLevel}</span>
            </div>
            <div className="analysis-report__risk-track">
              <div
                className="analysis-report__risk-fill"
                style={{ width: `${riskPercent}%` }}
              />
            </div>
          </div>

          <p className="analysis-report__date">
            <CalendarIcon />
            Analyse effectuée le : {date}
          </p>
        </div>

        <div className="analysis-report__features">
          <div className="analysis-report__features-header">
            <InfoIcon />
            <h2>Caractéristiques extraites</h2>
          </div>

          <ul className="analysis-report__features-list">
            {features.map((feature) => (
              <li key={feature}>
                <span>{feature}</span>
                <CheckCircleIcon />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="analysis-report__actions">
        <button
          type="button"
          className="analysis-report__btn analysis-report__btn--neutral"
          onClick={onExport}
        >
          Exporter Rapport PDF
        </button>
        <button
          type="button"
          className="analysis-report__btn analysis-report__btn--accent"
          onClick={onAlert}
        >
          Alerter Maintenance
        </button>
      </div>
    </div>
  );
}