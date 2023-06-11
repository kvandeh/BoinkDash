from flask import Flask, render_template, send_file

app = Flask(
    "BoinkDash",
    template_folder = "public/html",
)

@app.route("/")
async def index():
    return render_template("index.html")

@app.route("/public/<file>")
@app.route("/public/<folder>/<file>")
async def public(**path, ):
    return send_file("public/"+'/'.join([path[x] for x in path]))

if __name__ == "__main__":
    app.run(
        host = "0.0.0.0",
        port = 5000,
    )
