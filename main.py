# Run `pip install flask["async"]` if you get an import error
from flask import Flask, render_template, send_file # Get Flask (opensource)

app = Flask(
    "BoinkDash", # App Name
    template_folder = "/root/BoinkDash/public/html", # Templates (HTML)
)

@app.route("/") # Home/Index page
async def index():
    return render_template("index.html")

@app.route("/public/<file>") # File only path
@app.route("/public/<folder>/<file>") # Folder file path
async def public(**path, ):
    return send_file("public/"+'/'.join([path[x] for x in path])) # Return file

if __name__ == "__main__": # GUnicorn (Python3 runner for NGINX (web host)) protection
    app.run( # Run web app
        host = "0.0.0.0", # Host on IP
        port = 5000, # Port 5000
    )
