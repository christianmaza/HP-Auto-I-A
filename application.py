from flask import Flask, render_template, request
from flask_session import Session
import json
import jsonify


app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/createInvoice", methods=["POST"])
def createInvoice():
    j = request.json
    print(j.get('customer'))
    #data = request.json['name']
    # obj2 = jsonify(obj)
    # print(jsonify(obj))
    # j = request.json['parts']
    # print(obj['paymentMethod'])
    # print(obj2)
    # return data
    return render_template("index.html")
    """
            f = request.form
            for key in f.keys():
                for value in f.getlist(key):
                    print(key, ":", value)
                    return render_template("index.html")
            """
