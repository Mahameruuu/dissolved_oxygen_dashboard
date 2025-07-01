def get_insight(do):
    if do < 4:
        return "⚠️ DO sangat rendah – risiko tinggi!"
    elif do < 5.5:
        return "⚠️ DO rendah – perlu tindakan."
    elif do < 7:
        return "⚠️ DO sedang – tetap waspada."
    else:
        return "✅ DO optimal – kondisi air baik."