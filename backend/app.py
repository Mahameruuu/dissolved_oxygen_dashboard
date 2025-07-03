from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib
from tensorflow.keras.models import load_model 
from utils.insight import get_insight  # Fungsi insight status DO
from matplotlib.path import Path
import os

app = Flask(__name__)
CORS(app)  # Allow CORS

# ===============================
# 🔹 Load Models
# ===============================
# Model prediksi DO (RandomForest)
model = joblib.load("model/do_model.pkl")

# Model deteksi anomali PCA + Convex Hull
pca = joblib.load("model/pca_model.pkl")
train_pca_data = joblib.load("model/train_pca_data.pkl")
hull_vertices = joblib.load("model/hull_vertices.pkl")

class AnomalyDetectorPCAConvexHull:
    def __init__(self, pca, hull_path):
        self.pca = pca
        self.hull_path = hull_path

    @classmethod
    def load(cls, pca, train_pca_data, hull_vertices):
        hull_path = Path(train_pca_data[hull_vertices])
        return cls(pca, hull_path)

    def predict(self, input_data):
        if input_data.ndim == 1:
            input_data = input_data.reshape(1, -1)
        elif input_data.shape[1] != 3:
            raise ValueError("Input must have 3 features (Temp, pH, DO)")
        pca_transformed = self.pca.transform(input_data)
        is_inside = self.hull_path.contains_point(pca_transformed[0])
        return not is_inside, pca_transformed

detector = AnomalyDetectorPCAConvexHull.load(pca, train_pca_data, hull_vertices)

# Model prediksi LSTM dan scaler
lstm_model = load_model("model/do_lstm_model.keras")
scaler_lstm = joblib.load("model/scaler.save")

# ===============================
# 🔹 Endpoint 1: Prediksi Manual
# ===============================
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        features = [
            float(data["depth"]),
            float(data["temp"]),
            float(data["dosat"]),
            float(data["ph"]),
            float(data["cond"]),
            int(data["month"]),
            int(data["hour"]),
            int(data["day"]),
        ]
        pred = model.predict(np.array([features]))[0]
        return jsonify({
            "predicted_DO": round(pred, 2),
            "insight": get_insight(pred)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ===============================
# 🔹 Endpoint 2: Prediksi Otomatis Dataset
# ===============================
@app.route("/predict-bulk", methods=["GET"])
def predict_bulk():
    try:
        df = pd.read_csv("lake_data/lakeoxygen_cleaned.csv")
        required_cols = ["Depth", "Temp", "DOsat", "pH", "Cond", "Date.Time", "DO"]
        missing = [col for col in required_cols if col not in df.columns]
        if missing:
            return jsonify({"error": f"Kolom hilang: {missing}"}), 400

        df["Date.Time"] = pd.to_datetime(df["Date.Time"], errors="coerce")
        df = df.dropna()
        df_grouped = df.groupby("Date.Time").agg({
            "Depth": "mean",
            "Temp": "mean",
            "DOsat": "mean",
            "pH": "mean",
            "Cond": "mean",
            "DO": "mean",
        }).reset_index()

        df_grouped["month"] = df_grouped["Date.Time"].dt.month
        df_grouped["hour"] = df_grouped["Date.Time"].dt.hour
        df_grouped["day"] = df_grouped["Date.Time"].dt.day

        X = df_grouped[["Depth", "Temp", "DOsat", "pH", "Cond", "month", "hour", "day"]]
        y_pred = model.predict(X)
        insights = [get_insight(val) for val in y_pred]

        df_grouped["predicted_DO"] = y_pred
        df_grouped["insight"] = insights

        return jsonify(df_grouped.tail(100).to_dict(orient="records"))  
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ===============================
# 🔹 Endpoint 3: Deteksi Anomali
# ===============================
@app.route("/detect-anomaly", methods=["POST"])
def detect_anomaly():
    try:
        data = request.json
        features = [
            float(data["temp"]),
            float(data["pH"]),
            float(data["DO"])
        ]
        input_array = np.array(features).reshape(1, -1)
        is_anomaly, pca_point = detector.predict(input_array)
        return jsonify({
            "is_anomaly": is_anomaly,
            "pca_point": pca_point.tolist()
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ===============================
# 🔹 Endpoint 4: Forecast LSTM 24 Jam
# ===============================
@app.route("/predict-forecast", methods=["GET"])
def predict_forecast():
    try:
        df = pd.read_csv("lake_data/lakeoxygen_cleaned.csv", parse_dates=["Date.Time"])
        df = df[["Date.Time", "DO"]].dropna()
        df = df.groupby("Date.Time").mean().sort_index()
        df = df.asfreq("H").fillna(method="ffill")

        last_values = df["DO"].values[-24:].reshape(-1, 1)
        if len(last_values) < 24:
            return jsonify({"error": "Data kurang dari 24 jam terakhir"}), 400

        scaled_input = scaler_lstm.transform(last_values)

        seq_len = 24
        input_seq = scaled_input.copy()
        predictions = []

        for _ in range(24):
            X_input = input_seq[-seq_len:].reshape(1, seq_len, 1)
            pred = lstm_model.predict(X_input, verbose=0)[0][0]
            predictions.append(pred)
            input_seq = np.append(input_seq, [[pred]], axis=0)

        predicted_DO = scaler_lstm.inverse_transform(np.array(predictions).reshape(-1, 1)).flatten()

        last_time = df.index[-1]
        future_times = pd.date_range(start=last_time + pd.Timedelta(hours=1), periods=24, freq="H")

        result = [
            {
                "Date.Time": t.strftime("%Y-%m-%d %H:%M:%S"),
                "predicted_DO": round(do_val, 2),
                "insight": get_insight(do_val)
            }
            for t, do_val in zip(future_times, predicted_DO)
        ]

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ===============================
# 🔹 Run App
# ===============================
if __name__ == "__main__":
    app.run(debug=True)
