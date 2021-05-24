from flask import Flask, render_template, request
import re

app = Flask(__name__)

@app.route("/createInvoice", methods=["POST"])
def createInvoice():
    invoiceFormRequest = request.form.to_dict(flat=True)
    customerInfo = {}
    carInfo = {}
    parts = {}
    recommendations = {}
    hazards = {}
    guarantees = {}
    totals = {}
    estimateChoice = request.form.get("estimateChoice")
    noReturnInitial = request.form.get("noReturnInitial")
    teardownFee = request.form.get("teardownFee")
    if(teardownFee):
        teardownFee = teardownFee.strip('$ ')
    paymentMethod = request.form.get("paymentMethods")

    laborRate = request.form.get("laborRate")
    estimateExceedsCharge = request.form.get("noRequestWrittenEstimateCharge")

    if(estimateExceedsCharge):
        estimateExceedsCharge = estimateExceedsCharge.strip('$ ')

    totalAmount = request.form.get("totalAmount")
    if(totalAmount):
        totalAmount = totalAmount.strip('$ ')
    """
    print(invoiceFormRequest)
    print("\n")
    print("\n")
    """
    for key, value in invoiceFormRequest.items():
        if "customer" in str(key):
            customerInfo[key] = value
        if "Car" in str(key):
            carInfo[key] = value
        # do regex with parts and number at the end to avoid the partsPayment conflict
        if "part" in str(key) and re.search("\d$", str(key)):
            if int(f"{str(key)[-1]}") not in parts:
                parts[int(f"{str(key)[-1]}")] = {}
            if int(f"{str(key)[-1]}") in parts:
                parts[int(f"{str(key)[-1]}")][str(key)] = value
        if re.search("recommendation\d", str(key)):
            if 0 not in recommendations:
                recommendations[0] = {}
            if 0 in recommendations:
                recommendations[0][str(key)] = value
        elif "recommendation" in str(key):
            recommendations[key] = value
        if "hazard" in str(key):
            if int(f"{str(key)[-1]}") not in hazards:
                hazards[int(f"{str(key)[-1]}")] = {}
            if int(f"{str(key)[-1]}") in hazards:
                hazards[int(f"{str(key)[-1]}")][str(key)] = value
        if re.search("guaranteedItem\d", str(key)):
            if 0 not in guarantees:
                guarantees[0] = {}
            if 0 in guarantees:
                guarantees[0][str(key)] = value
        elif "guaranteedItems" in str(key):
            guarantees[key] = value
        if "Payment" in str(key):
            value = value.strip('$ ')
            totals[key] = value
    """
    print(customerInfo)
    print("\n")
    print(carInfo)
    print("\n")
    print(parts)
    print("\n")
    print(recommendations)
    print("\n")
    print(hazards)
    print("\n")
    print(estimateChoice)
    print("\n")
    print(noReturnInitial)
    print("\n")
    print(teardownFee)
    print("\n")
    print(paymentMethod)
    print("\n")
    print(laborRate)
    print(guarantees)
    print("\n")
    print(totals)
    print("\n")
    print(estimateExceedsCharge)
    print("\n")
    print("\n")
    # f"part{str(key)[-1]}"
    """
    return render_template("invoice.html", customerInfo=customerInfo, carInfo=carInfo, parts=parts, recommendations=recommendations, hazards=hazards, guarantees=guarantees, estimateChoice=estimateChoice, estimateExceedsCharge=estimateExceedsCharge, laborRate=laborRate, paymentMethod=paymentMethod, teardownFee=teardownFee, noReturnInitial=noReturnInitial, totals=totals, totalAmount=totalAmount)
    """
    f = request.form
    for key in f.keys():
       for value in f.getlist(key):
          print(key, ":", value)
          return render_template("index.html")
    """

@app.route("/")
def index():
    return render_template("index.html")

