let partInfoCounter = 0;
let recommendationCounter = 0;
let hazardCounter = 0;
let guaranteeCounter = 0;

returnFromSplitFloat = (splitString) =>{
    //if split function removed "$" from the string, the array returned will be > 1
    if((splitString.length > 1)){ 
        return `${parseFloat(splitString[1]).toFixed(2)}`;
    }
    else{
        return `${parseFloat(splitString[0]).toFixed(2)}`;
    }
}

getTotals = (collection, affectedElement) =>{
    let tempTotal = 0;
    Array.prototype.forEach.call(collection, function(totalInput){
        let totalInputVal = parseFloat(returnFromSplitFloat(totalInput.value.split("$")));
        if(!isNaN(totalInputVal)){
            tempTotal+=totalInputVal;
        }
    });
    if(affectedElement.tagName.toLowerCase() === "div"){
        affectedElement.innerText = "$ " + tempTotal.toFixed(2);
    }
    else{
        affectedElement.value = "$ " + tempTotal.toFixed(2);
    }
}

addFormEvents = (model) => {
    let inputTextFieldsRequired = model.querySelectorAll(".inputTextRequired, .inputTextRequiredLarger, .inputNumberRequiredLarger");
    Array.prototype.forEach.call(inputTextFieldsRequired, function(field){
        field.addEventListener("focus", (e) =>
        {
            let selectedLabel = e.target.nextElementSibling;
            if(selectedLabel.className === "labelText" || selectedLabel.className === "labelTextSmall"){
                if(selectedLabel.className === "labelText"){
                    selectedLabel.className = "labelTextUp";
                }
                else{
                    selectedLabel.className = "labelTextUp" 
                    selectedLabel.setAttribute("labelTextSmall", "yes");
                }
            }
            if(e.target.getAttribute("money") && e.target.value === ""){
                e.target.value = "$";
            }
        });
    
        field.addEventListener("blur", (e) => { 
            let totalElement = document.getElementById("totalAmount");  
            let totalPartElement = document.getElementById("partsPayment");
            if(e.target.getAttribute("money") === "true" && e.target.value && !(e.target.value === "$")){
                e.target.value = `$ ${returnFromSplitFloat(e.target.value.split("$"))}`;
            }
            else if(e.target.getAttribute("money") === "true" && e.target.value === "$"){
                e.target.value = "";
            }
    
            let selectedLabel = e.target.nextElementSibling;
    
            if(selectedLabel.className === "labelTextUp" && (!field.value) && !(selectedLabel.getAttribute("labelTextSmall"))){
                selectedLabel.className = "labelText";
            }
            if(selectedLabel.getAttribute("labelTextSmall") && !(field.value)){
                selectedLabel.className = "labelTextSmall";
                selectedLabel.removeAttribute("labelTextSmall");
            }

            if(e.target.getAttribute("money")){
                let totalInputs = document.querySelectorAll('input[addToTotal = "true"]');
                let totalParts = document.querySelectorAll('input[partPrice = "true');
                if(e.target.getAttribute("partPrice") === "true"){
                    getTotals(totalParts, totalPartElement);
                }
                getTotals(totalInputs, totalElement);
            }
        });
    })
}

addAddersEvent = () => {
    document.getElementById("addPartRow").addEventListener("click", () => {
        partInfoCounter++;
        let partInfoContainer = document.getElementById("partInfoContainer");
        let tempNode = document.createElement("div");
        tempNode.innerHTML = `<div class="row pt-4">
        <div class="col-1">
            <div class="formItem">
                <input type="number" id="partQuantity${partInfoCounter}"
                    class="inputNumberRequiredLarger" required="required">
                <label for="partQuantity${partInfoCounter}" class="labelText">Qty.<span
                        class="requiredAsterisk">*</span></label>
            </div>
        </div>
        <div class="col-2">
            <div class="formItem">
                <input type="text" id="partDescription${partInfoCounter}" class="inputTextRequiredLarger"
                    required="required">
                <label for="partDescription${partInfoCounter}"
                    class="labelTextSmall">Unit/Condition</label>
            </div>
        </div>
        <div class="col-3">
            <div class="formItem">
                <input type="text" id="partName${partInfoCounter}" class="inputTextRequiredLarger"
                    required="required">
                <label for="partName${partInfoCounter}" class="labelText">Description /
                    Name</label>
            </div>
        </div>
        <div class="col-2">
            <div class="formItem">
                <input type="text" id="partPrice${partInfoCounter}" partPrice="true" class="inputTextRequiredLarger"
                    required="required" money="true">
                <label for="partPrice${partInfoCounter}" class="labelText">Price</label>
            </div>
        </div>
        <div class="col-2 pe-0">
            <div class="row">
                <div class="col-6 pe-0">
                    <div class="formItemRadio">
                        <input type="radio" name="partMaterial${partInfoCounter}" value="true"
                            id="partMaterialU${partInfoCounter}">
                        <label for="partMaterial${partInfoCounter}" class="">U</label>
                    </div>
                </div>
                <div class="col-6 px-0">
                    <div class="formItemRadio">
                        <input type="radio" name="partMaterial${partInfoCounter}" value="true"
                            id="partMaterialR${partInfoCounter}">
                        <label for="partMaterial${partInfoCounter}" class="">R</label>
                    </div>
                </div>
                <div class="w-100"></div>
                <div class="col-6 pe-0">
                    <div class="formItemRadio">
                        <input type="radio" name="partMaterial${partInfoCounter}" value="true"
                            id="partMaterialRC${partInfoCounter}">
                        <label for="partMaterial${partInfoCounter}" class="">RC</label>
                    </div>
                </div>
                <div class="col-6 px-0">
                    <div class="formItemRadio">
                        <input type="radio" name="partMaterial${partInfoCounter}" value="true"
                            id="partMaterialNone${partInfoCounter}">
                        <label for="partMaterial${partInfoCounter}" class="">N/A</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-2 px-0">
            <div class="formItemCheck">
                <input type="checkbox" id="partWarranty" name="partWarranty">
                <label for="partWarranty">Warranty</label>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-8"></div>
        <div class="col-2">
            <p class="materialLegend">
                U-Used, R-Rebuilt,
                RC-Reconditioned
            </p>
        </div>
    </div>`;
    addFormEvents(tempNode);
    partInfoContainer.children[1].appendChild(tempNode);
    });

    document.getElementById("addRecommendationRow").addEventListener("click", () => {
        recommendationCounter++;
        let recommendationInfoContainer = document.getElementById("recommendationInfoContainer");
        let tempNode = document.createElement("div");
        tempNode.innerHTML = `<div class="row pt-4">
                                <div class="col-12">
                                    <div class="formItem">
                                        <input type="text" id="recommendation${recommendationCounter}" class="inputTextRequiredLarger">
                                        <label for="recommendation${recommendationCounter}"
                                            class="labelText">Recommendations</label>
                                    </div>
                                </div>
                            </div>`;
        addFormEvents(tempNode);
        recommendationInfoContainer.children[1].appendChild(tempNode);
    });

    document.getElementById("addHazardRow").addEventListener("click", () => {
        hazardCounter++;
        let chargeHazardContainer = document.getElementById("chargeHazardContainer");
        let tempNode = document.createElement("div");
        tempNode.innerHTML = `<div class="row pt-4">
                                <div class="col-9">
                                    <div class="formItem">
                                        <input type="text" id="hazardDescription${hazardCounter}" class="inputTextRequiredLarger">
                                        <label for="hazardDescription${hazardCounter}"
                                            class="labelText">Hazardous Material Description</label>
                                    </div>
                                </div>
                                <div class="col-2">
                                    <div class="formItem">
                                        <input type="text" id="chargeHazard${hazardCounter}"
                                            class="inputTextRequiredLarger" money="true">
                                        <label for="chargeHazard${hazardCounter}" class="labelText">Price</label>
                                    </div>
                                </div>
                            </div>`;
        addFormEvents(tempNode);
        chargeHazardContainer.children[1].appendChild(tempNode);
    });

    document.getElementById("addGuaranteeRow").addEventListener("click", () => {
        guaranteeCounter++;
        let guaranteeContainer = document.getElementById("guaranteeContainer");
        let tempNode = document.createElement("div");
        tempNode.innerHTML = `<div class="row">
                                <div class="col-12">
                                    <div class="formItemGuarantee">
                                        <input type="text" id="guaranteedItem${guaranteeCounter}"
                                            class="inputTextRequiredLarger">
                                        <label for="guaranteedItem${guaranteeCounter}"
                                            class="labelText"></label>
                                    </div>
                                </div>
                            </div>`;
        addFormEvents(tempNode);
        guaranteeContainer.children[1].appendChild(tempNode);
    });
}

document.querySelector("#archivedFileInput").addEventListener("change", (e) =>{
    let svgArrow = document.querySelector("#archivedFileSubmit svg");
    if(e.target.value){
        svgArrow.parentElement.classList.remove("disabledPointer");
        svgArrow.classList.replace("fileSubmitArrowDisabled", "fileSubmitArrow");
    }
    else{
        svgArrow.parentElement.classList.add("disabledPointer"); 
        svgArrow.classList.replace("fileSubmitArrow", "fileSubmitArrowDisabled");
    }
}, false);

addFormEvents(document);
addAddersEvent();



