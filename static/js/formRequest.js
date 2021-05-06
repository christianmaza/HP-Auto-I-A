let submitInvoice = document.getElementById("createInvoice");

submitInvoice.addEventListener("focus", function (e) {
    e.preventDefault();
    partQuantities = document.querySelectorAll(`input[id*="partQuantity"]`);
    partDescriptions = document.querySelectorAll(`input[id*="partDescription"]`);
    partDescriptions = document.querySelectorAll(`input[id*="partName"]`);
    partDescriptions = document.querySelectorAll(`input[id*="partRadio"]`);

    let invoiceObject = {
        parts: [],
        estimates: {
            recommendations: []
        },
        hazardCharges: [],
        guaranteedItems: []
    };

    invoiceObject.car = {
        year: document.getElementById("yearCar").value,
        make: document.getElementById("makeCar").value,
        model: document.getElementById("modelCar").value,
        odometer: document.getElementById("odometerCar").value,
        license: document.getElementById("licenseCar").value
    }

    invoiceObject.customer = {
        firstName: document.getElementById("firstNameForm").value,
        lastName: document.getElementById("lastNameForm").value,
        streetAddress: document.getElementById("streetAddress").value,
        streetAddress2: document.getElementById("streetAddress2").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        telephone1: document.getElementById("telephone1").value,
        telephone2: document.getElementById("telephone2").value
    }

    let allParts = document.querySelectorAll(`div[data-part-count]`);

    Array.prototype.forEach.call(allParts, function (part) {
        invoiceObject.parts.push({
            partQuantity: document.getElementById(`partQuantity${(part.dataset.partCount)}`).value,
            partDescription: document.getElementById(`partDescription${(part.dataset.partCount)}`).value,
            partName: document.getElementById(`partName${(part.dataset.partCount)}`).value,
            partPrice: document.getElementById(`partPrice${(part.dataset.partCount)}`).value,
            partMaterial: document.querySelector(`input[name="partMaterial${(part.dataset.partCount)}"]:checked`).value,
            partWarranty: document.getElementById(`partWarranty${(part.dataset.partCount)}`).checked
        });
    });

    let allRecommendations = document.querySelectorAll(`div[data-recommendation-count]`);

    Array.prototype.forEach.call(allRecommendations, function (recommendation) {
        invoiceObject.estimates.recommendations.push({
            comment: document.getElementById(`recommendation${(recommendation.dataset.recommendationCount)}`).value
        })
    });

    invoiceObject.estimates.estimateCost = document.getElementById("recommendationEstCost").value;
    invoiceObject.estimates.estimateCharge = document.getElementById("recommendationEstCharge").value;
    invoiceObject.estimates.estimateBasisCharge = document.getElementById("recommendationBasisCharge").value;

    let allHazards = document.querySelectorAll(`div[data-hazard-count]`);

    Array.prototype.forEach.call(allHazards, function (hazard) {
        invoiceObject.hazardCharges.push({
            hazardDescription: document.getElementById(`hazardDescription${hazard.dataset.hazardCount}`).value,
            hazardCharge: document.getElementById(`chargeHazard${hazard.dataset.hazardCount}`).value
        });
    });

    invoiceObject.estimateChoice = document.querySelector(`input[name="estimateChoice"]:checked`).value;
    invoiceObject.noReturnInitials = document.getElementById("noReturnInitial").value;
    invoiceObject.teardownFee = document.getElementById("teardownFee").value;

    let allGuarantees = document.querySelectorAll(`div[data-guarantee-count]`);

    Array.prototype.forEach.call(allGuarantees, function (guaranteeItem) {
        invoiceObject.guaranteedItems.push({
            guarantee: document.getElementById(`guaranteedItem${guaranteeItem.dataset.guaranteeCount}`).value
        })
    });

    invoiceObject.guaranteeAcknowledgement = {
        guaranteeTime: document.getElementById("guaranteedItemsTime").value,
        guaranteeMileage: document.getElementById("guaranteedItemsMileage").value
    }

    invoiceObject.paymentMethod = document.querySelector(`input[name="paymentMethods"]:checked`).value;
    invoiceObject.laborRate = document.querySelector(`input[name="laborRate"]:checked`).value;

    invoiceObject.totals = {
        laborTotal: document.getElementById("laborPayment").value,
        partsTotal: document.getElementById("partsPayment").value,
        accessoriesTotal: document.getElementById("accessoriesPayment").value,
        lubeTotal: document.getElementById("lubePayment").value,
        miscellaneousMerchandiseTotal: document.getElementById("miscMerchandisePayment").value,
        subletRepairsTotal: document.getElementById("subletRepairsPayment").value,
        storageFeeTotal: document.getElementById("storagePayment").value,
        taxTotal: document.getElementById("taxPayment").value,
        grandTotal: document.getElementById("totalAmount").textContent
    }


});
