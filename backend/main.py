import flask

app=flask.Flask("__main__")

@app.route('/')
def myIndex():
    return flask.render_template("index.html")
   
app.run(debug=True)