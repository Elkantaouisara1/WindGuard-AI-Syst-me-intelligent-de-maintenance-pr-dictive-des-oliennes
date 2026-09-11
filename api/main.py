from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO

import numpy as np
import scipy.io
import joblib
import os

from scipy.stats import kurtosis, skew


# =========================================================
# FASTAPI
# =========================================================

app = FastAPI(
    title="Vibration Fault Detection API",
    description="Détection automatique Healthy / Damaged",
    version="1.0"
)


# =========================================================
# CORS - React
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# CHARGEMENT DU MODELE
# =========================================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "models",
    "random_forest.pkl"
)

model = joblib.load(MODEL_PATH)


# =========================================================
# FEATURES
# =========================================================

def extract_features(signal):

    signal = np.asarray(signal).flatten()

    return {
        "mean": float(np.mean(signal)),
        "std": float(np.std(signal)),
        "min": float(np.min(signal)),
        "max": float(np.max(signal)),
        "rms": float(np.sqrt(np.mean(signal ** 2))),
        "variance": float(np.var(signal)),
        "kurtosis": float(kurtosis(signal)),
        "skewness": float(skew(signal)),
        "peak_to_peak": float(np.ptp(signal))
    }


# =========================================================
# WINDOWING
# =========================================================

def create_windows(signal, window_size=10000):

    signal = signal.flatten()

    n_windows = len(signal) // window_size

    windows = []

    for i in range(n_windows):

        start = i * window_size
        end = start + window_size

        windows.append(signal[start:end])

    return windows


# =========================================================
# EXTRACTION DU SIGNAL AN3
# =========================================================

def extract_an3_from_mat(contents):

    mat_data = scipy.io.loadmat(
        BytesIO(contents)
    )

    if "AN3" not in mat_data:

        raise ValueError(
            "Le signal AN3 n'existe pas dans ce fichier .mat"
        )

    signal = mat_data["AN3"]

    return signal.flatten()


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():

    return {
        "message": "Vibration Fault Detection API",
        "status": "running"
    }


# =========================================================
# PREDICTION .MAT
# =========================================================

@app.post("/predict-file")
async def predict_file(
    file: UploadFile = File(...)
):

    if not file.filename.lower().endswith(".mat"):

        return {
            "error": "Veuillez envoyer un fichier .mat"
        }

    try:

        # -------------------------------------------------
        # Lire le fichier
        # -------------------------------------------------

        contents = await file.read()


        # -------------------------------------------------
        # Récupérer AN3
        # -------------------------------------------------

        signal = extract_an3_from_mat(contents)


        # -------------------------------------------------
        # Découpage en fenêtres
        # -------------------------------------------------

        windows = create_windows(
            signal,
            window_size=10000
        )


        if len(windows) == 0:

            raise ValueError(
                "Le signal AN3 est trop court pour créer une fenêtre."
            )


        # -------------------------------------------------
        # Features de chaque fenêtre
        # -------------------------------------------------

        features_list = []

        for window in windows:

            features = extract_features(window)

            features_list.append(features)


        # -------------------------------------------------
        # Construire X
        # -------------------------------------------------

        X = np.array([

            [
                features["mean"],
                features["std"],
                features["min"],
                features["max"],
                features["rms"],
                features["variance"],
                features["kurtosis"],
                features["skewness"],
                features["peak_to_peak"]
            ]

            for features in features_list

        ])


        # -------------------------------------------------
        # Prédictions
        # -------------------------------------------------

        predictions = model.predict(X)

        probabilities = model.predict_proba(X)


        # -------------------------------------------------
        # Nombre Healthy / Damaged
        # -------------------------------------------------

        healthy_count = int(
            np.sum(predictions == 0)
        )

        damaged_count = int(
            np.sum(predictions == 1)
        )

        total = len(predictions)


        healthy_percentage = (
            healthy_count / total * 100
        )

        damaged_percentage = (
            damaged_count / total * 100
        )


        # -------------------------------------------------
        # Décision finale
        # -------------------------------------------------

        if damaged_count > healthy_count:

            final_prediction = 1
            final_label = "Damaged"

        else:

            final_prediction = 0
            final_label = "Healthy"


        # -------------------------------------------------
        # Probabilité moyenne
        # -------------------------------------------------

        avg_probability_healthy = float(
            np.mean(probabilities[:, 0])
        )

        avg_probability_damaged = float(
            np.mean(probabilities[:, 1])
        )


        # -------------------------------------------------
        # Résultat
        # -------------------------------------------------

        return {

            "filename": file.filename,

            "signal": "AN3",

            "window_size": 10000,

            "number_of_windows": total,

            "prediction": final_prediction,

            "label": final_label,

            "healthy_windows": healthy_count,

            "damaged_windows": damaged_count,

            "healthy_percentage": round(
                healthy_percentage,
                2
            ),

            "damaged_percentage": round(
                damaged_percentage,
                2
            ),

            "probability_healthy": round(
                avg_probability_healthy,
                4
            ),

            "probability_damaged": round(
                avg_probability_damaged,
                4
            )

        }


    except Exception as e:

        return {
            "error": str(e)
        }