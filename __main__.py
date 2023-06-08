from flask import Flask, render_template, send_file

app = Flask("BoinkDask")

@app.route("/")
async def main():
    print("f")
    return render_template("index.html")

@app.route("/static/<file>")
async def files(file):
    return send_file("./static/"+file)

app.run(debug=True, host="0.0.0.0", port=5000)