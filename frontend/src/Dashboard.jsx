import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import AnalysisReport from "./AnalysisReport";
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Config : adapte cette URL à ton endpoint FastAPI                   */
/* ------------------------------------------------------------------ */
const API_URL = "http://localhost:8000/predict-file";

/* ------------------------------------------------------------------ */
/*  Les 4 statistiques qui présentent le projet                        */
/* ------------------------------------------------------------------ */
const PROJECT_STATS = [
  {
    id: "accuracy",
    value: "100%",
    label: "Précision du modèle",
    desc: "Accuracy obtenue sur le jeu de test lors du développement.",
  },
  {
    id: "features",
    value: "9",
    label: "Caractéristiques extraites",
    desc: "Moyenne, écart-type, min, max, RMS, variance, kurtosis, skewness, peak-to-peak.",
  },
  {
    id: "window",
    value: "10 000",
    label: "Échantillons par fenêtre",
    desc: "Taille des segments découpés avant extraction des features.",
  },
  {
    id: "classes",
    value: "2",
    label: "États détectés",
    desc: "Classification binaire : Healthy (sain) ou Damaged (endommagé).",
  },
];

/* ------------------------------------------------------------------ */
/*  Libellés FR des features renvoyées par l'API                       */
/* ------------------------------------------------------------------ */
const FEATURE_LABELS = {
  mean: "Moyenne",
  std: "Écart-type",
  min: "Minimum",
  max: "Maximum",
  rms: "RMS",
  variance: "Variance",
  kurtosis: "Kurtosis",
  skewness: "Skewness",
  peak_to_peak: "Peak-to-peak",
};

/* ------------------------------------------------------------------ */
/*  Données statiques du dataset & du modèle (section Analytics)       */
/* ------------------------------------------------------------------ */
const DATASET_STATS = {
  totalFiles: 20,
  healthyFiles: 10,
  damagedFiles: 10,
  totalWindows: 4800,
  healthyWindows: 2400,
  damagedWindows: 2400,
  healthyPercent: 50,
  damagedPercent: 50,
};

const MODEL_METRICS = [
  { name: "Accuracy", value: 100 },
  { name: "Precision", value: 100 },
  { name: "Recall", value: 100 },
  { name: "F1-Score", value: 100 },
  { name: "ROC-AUC", value: 100 }, // 1.00 ramené sur 100 pour l'échelle du graphique
];

const COMPOSITION_DATA = [
  { name: "Fichiers", Healthy: DATASET_STATS.healthyFiles, Damaged: DATASET_STATS.damagedFiles },
  { name: "Fenêtres", Healthy: DATASET_STATS.healthyWindows, Damaged: DATASET_STATS.damagedWindows },
];

const COLOR_HEALTHY = "#a3d94a";
const COLOR_DAMAGED = "#d9583f";

/* ------------------------------------------------------------------ */
/*  Icônes                                                             */
/* ------------------------------------------------------------------ */
function StatIcon({ id }) {
  switch (id) {
    case "accuracy":
      return (
        <svg viewBox="0 0 32 32" className="stat-icon">
          <circle cx="16" cy="16" r="12" />
          <path d="M10 16.5l4 4 8-9" />
        </svg>
      );
    case "features":
      return (
        <svg viewBox="0 0 32 32" className="stat-icon">
          <line x1="6" y1="26" x2="6" y2="14" />
          <line x1="14" y1="26" x2="14" y2="6" />
          <line x1="22" y1="26" x2="22" y2="18" />
          <line x1="3" y1="26" x2="29" y2="26" />
        </svg>
      );
    case "window":
      return (
        <svg viewBox="0 0 32 32" className="stat-icon">
          <rect x="4" y="8" width="24" height="16" rx="2" />
          <line x1="12" y1="8" x2="12" y2="24" />
          <line x1="20" y1="8" x2="20" y2="24" />
        </svg>
      );
    case "classes":
      return (
        <svg viewBox="0 0 32 32" className="stat-icon">
          <circle cx="11" cy="16" r="7" />
          <circle cx="21" cy="16" r="7" />
        </svg>
      );
    case "upload":
      return (
        <svg viewBox="0 0 32 32" className="upload-icon">
          <path d="M16 22V6M16 6l-6 6M16 6l6 6" />
          <path d="M6 24v2a2 2 0 002 2h16a2 2 0 002-2v-2" />
        </svg>
      );
    case "healthy":
      return (
        <svg viewBox="0 0 32 32" className="result-icon">
          <circle cx="16" cy="16" r="13" />
          <path d="M10 16.5l4 4 8-9" />
        </svg>
      );
    case "damaged":
      return (
        <svg viewBox="0 0 32 32" className="result-icon">
          <circle cx="16" cy="16" r="13" />
          <line x1="16" y1="9" x2="16" y2="18" />
          <circle cx="16" cy="22.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Graphiques Analytics (recharts)                                    */
/* ------------------------------------------------------------------ */
function DatasetDonut() {
  const data = [
    { name: "Healthy", value: DATASET_STATS.healthyWindows },
    { name: "Damaged", value: DATASET_STATS.damagedWindows },
  ];
  return (
    <ResponsiveContainer width="100%" height={230}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={88} paddingAngle={2}>
          <Cell fill={COLOR_HEALTHY} />
          <Cell fill={COLOR_DAMAGED} />
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

function ModelMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={MODEL_METRICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3e2d3" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
        <Tooltip />
        <Bar dataKey="value" fill={COLOR_HEALTHY} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CompositionChart() {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={COMPOSITION_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e3e2d3" />
        <XAxis dataKey="name" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Healthy" fill={COLOR_HEALTHY} radius={[6, 6, 0, 0]} />
        <Bar dataKey="Damaged" fill={COLOR_DAMAGED} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// Connecté en LIVE au résultat de la dernière analyse envoyée à FastAPI
function LastAnalysisDonut({ result }) {
  if (!result) {
    return (
      <div className="analytics-empty">
        Lance une analyse dans la section "Tester le modèle" pour voir le
        résultat ici.
      </div>
    );
  }

  const pct = Number((result.probability * 100).toFixed(2));
  const color = result.isHealthy ? COLOR_HEALTHY : COLOR_DAMAGED;
  const data = [
    { name: result.label, value: pct },
    { name: "reste", value: Math.max(100 - pct, 0) },
  ];

  return (
    <div className="analytics-donut-wrap">
      <ResponsiveContainer width="100%" height={210}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={62}
            outerRadius={88}
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill={color} />
            <Cell fill="#e9e9df" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="analytics-donut-center">
        <strong style={{ color }}>{pct}%</strong>
        <span>{result.label}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function formatDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function computeRisk(probability, isHealthy) {
  if (probability == null) return isHealthy ? "Faible" : "Élevé";
  if (isHealthy) return probability >= 0.85 ? "Faible" : "Modéré";
  return probability >= 0.85 ? "Élevé" : "Modéré";
}

function mapRisk(riskLabelFR, probability) {
  const table = {
    "Faible": { level: "Low", percent: 20 },
    "Modéré": { level: "Medium", percent: 55 },
    "Élevé": { level: "Critical", percent: 90 },
  };
  return (
    table[riskLabelFR] || {
      level: riskLabelFR,
      percent: probability != null ? Math.round(probability * 100) : 50,
    }
  );
}

// Adapté exactement à la réponse de /predict-file
function normalizeResult(data) {
  if (data.error) {
    throw new Error(data.error);
  }

  const isHealthy = data.label === "Healthy";
  const probability = isHealthy
    ? data.probability_healthy
    : data.probability_damaged;

  const riskLabelFR = computeRisk(probability, isHealthy);
  const { level: riskLevel, percent: riskPercent } = mapRisk(riskLabelFR, probability);

  return {
    label: data.label,
    isHealthy,
    probability, // fraction 0-1
    riskLevel,
    riskPercent,
    analysisId: `ANL-${Math.floor(100 + Math.random() * 900)}`,
    date: formatDate(),
    filename: data.filename,
    numberOfWindows: data.number_of_windows,
    healthyWindows: data.healthy_windows,
    damagedWindows: data.damaged_windows,
    healthyPercentage: data.healthy_percentage,
    damagedPercentage: data.damaged_percentage,
  };
}

/* ------------------------------------------------------------------ */
/*  Page Dashboard                                                      */
/* ------------------------------------------------------------------ */
export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const onSelectFile = useCallback((selected) => {
    if (!selected) return;
    setFile(selected);
    setResult(null);
    setError(null);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) onSelectFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(API_URL, { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Erreur serveur (${res.status})`);

      const data = await res.json();
      setResult(normalizeResult(data)); // lève une erreur si data.error existe
    } catch (err) {
      setError(
        err.message === "Failed to fetch"
          ? "Impossible de joindre l'API FastAPI. Vérifie qu'elle est démarrée et accessible."
          : err.message || "Une erreur est survenue lors de l'analyse."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetFile = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="dashboard">
      {/* ------------------------------- NAV ------------------------------- */}
      <header className="dnav">
        <div className="dnav__logo">
          <span className="dnav__logo-mark">≋</span>
          WINDGUARD AI
        </div>
        <nav className="dnav__links">
          <Link to="/">Accueil</Link>
          <a href="#stats">Statistiques</a>
          <a href="#analytics">Analytics</a>
          <a href="#test">Tester le modèle</a>
        </nav>
      </header>

      {/* ------------------------------- INTRO ------------------------------ */}
      <section className="dhero">
        <h1>Dashboard WindGuard AI</h1>
        <p>
          WindGuard AI est un projet de maintenance prédictive des éoliennes
          basé sur l'intelligence artificielle et l'analyse de signaux
          vibratoires. À partir des données capteurs, le signal est découpé
          en fenêtres puis neuf caractéristiques statistiques sont extraites
          et envoyées à un modèle de Machine Learning qui détermine l'état
          de l'éolienne&nbsp;: <strong>Healthy</strong> (normal) ou{" "}
          <strong>Damaged</strong> (anomalie).
        </p>
      </section>

      {/* ------------------------------ STATS ------------------------------- */}
      <section className="dstats" id="stats">
        <div className="dstats__grid">
          {PROJECT_STATS.map((stat) => (
            <div className="stat-card" key={stat.id}>
              <span className="stat-card__icon">
                <StatIcon id={stat.id} />
              </span>
              <span className="stat-card__value">{stat.value}</span>
              <span className="stat-card__label">{stat.label}</span>
              <p className="stat-card__desc">{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------- ANALYTICS ----------------------------- */}
      <section className="danalytics" id="analytics">
        <h2>Statistiques du projet</h2>
        <p className="dtest__intro">
          Aperçu du dataset vibratoire, des performances du modèle et de ta
          dernière analyse en temps réel.
        </p>

        {/* Cartes chiffrées */}
        <div className="danalytics__stats">
          <div className="analytics-stat"><span>{DATASET_STATS.totalFiles}</span><p>Fichiers analysés</p></div>
          <div className="analytics-stat"><span>{DATASET_STATS.totalWindows}</span><p>Fenêtres totales</p></div>
          <div className="analytics-stat"><span>{DATASET_STATS.healthyWindows}</span><p>Fenêtres Healthy</p></div>
          <div className="analytics-stat"><span>{DATASET_STATS.damagedWindows}</span><p>Fenêtres Damaged</p></div>
          <div className="analytics-stat"><span>{DATASET_STATS.healthyPercent}%</span><p>Part Healthy</p></div>
          <div className="analytics-stat"><span>{DATASET_STATS.damagedPercent}%</span><p>Part Damaged (anomalies)</p></div>
        </div>

        {/* Graphiques */}
        <div className="danalytics__grid">
          <div className="chart-panel">
            <h4>Répartition du dataset (fenêtres)</h4>
            <DatasetDonut />
          </div>
          <div className="chart-panel">
            <h4>Performances du modèle</h4>
            <ModelMetricsChart />
          </div>
          <div className="chart-panel">
            <h4>Composition Healthy vs Damaged</h4>
            <CompositionChart />
          </div>
          <div className="chart-panel">
            <h4>Dernière analyse (live)</h4>
            <LastAnalysisDonut result={result} />
          </div>
        </div>
      </section>

      {/* -------------------------------- TEST ------------------------------- */}
      <section className="dtest" id="test">
        <h2>Tester le modèle</h2>
        <p className="dtest__intro">
          Importe un fichier de données vibratoires pour l'envoyer à l'API
          FastAPI et obtenir la prédiction du modèle en temps réel.
        </p>

        <div className="dtest__panel">
          {/* Dropzone */}
          <div
            className={`dropzone${isDragging ? " dropzone--active" : ""}${
              file ? " dropzone--filled" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <span className="dropzone__icon">
              <StatIcon id="upload" />
            </span>

            {file ? (
              <>
                <p className="dropzone__filename">{file.name}</p>
                <p className="dropzone__filesize">
                  {(file.size / 1024).toFixed(1)} Ko
                </p>
              </>
            ) : (
              <>
                <p className="dropzone__text">
                  Glisse-dépose ton fichier ici, ou
                </p>
                <label className="dropzone__browse">
                  parcourir
                  <input
                    type="file"
                    accept=".csv,.mat,.npy,.txt"
                    onChange={(e) => onSelectFile(e.target.files?.[0])}
                    hidden
                  />
                </label>
              </>
            )}
          </div>

          <div className="dtest__actions">
            <button
              className="btn btn--primary"
              onClick={handleAnalyze}
              disabled={!file || isLoading}
            >
              {isLoading ? "Analyse en cours…" : "Analyser le fichier"}
            </button>
            {file && (
              <button className="btn btn--ghost" onClick={resetFile}>
                Réinitialiser
              </button>
            )}
          </div>

          {error && <div className="dtest__error">{error}</div>}
        </div>

        {/* --- Résultat = le composant AnalysisReport, style maquette --- */}
        {result && (
          <div className="dtest__report">
            <AnalysisReport
              analysisId={result.analysisId}
              status={result.isHealthy ? "Healthy" : "Damaged"}
              isHealthy={result.isHealthy}
              probability={Number((result.probability * 100).toFixed(2))}
              riskLevel={result.riskLevel}
              riskPercent={result.riskPercent}
              date={result.date}
              features={[
                `Fenêtres analysées : ${result.numberOfWindows}`,
                `Fenêtres saines : ${result.healthyWindows} (${result.healthyPercentage}%)`,
                `Fenêtres endommagées : ${result.damagedWindows} (${result.damagedPercentage}%)`,
                `Fichier : ${result.filename}`,
              ]}
              onExport={() => window.print()}
            />
          </div>
        )}
      </section>
    </div>
  );
}