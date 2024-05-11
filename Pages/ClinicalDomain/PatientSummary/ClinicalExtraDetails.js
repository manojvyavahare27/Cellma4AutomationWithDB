//Sathyanarayan


const { clickElement, typeText, selectFromDropdown } = require('../../../UtilFiles/StaticUtility.js');
const {selectFromSearchResults} = require('../../../UtilFiles/DynamicUtility.js')

class ClinicalExtraDetails
{
    constructor(page)
    {
        this.page=page  
        //Search Medication fields
       // this.clinicalItemCollapsable = page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-grid-xs-7 css-nxhx07']")
        this.clinicalItemCollapsable=page.locator("xpath=//div[@data-testid='CommonCellmaPopup']//button[@aria-label='cellmaAccordionIcon']")
        this.clinicalItemSubcategory = page.locator("xpath=//input[@id='Sub Category']")
        this.dateOfOutcome = page.locator("xpath=//input[@id='Date of Outcome']")
        this.clinicDate = page.locator("xpath=//input[@id='Clinic Date']")
        this.onSetDate=page.locator("xpath=//input[@id='Onset Date']")
        this.diagnosedDate=page.locator("xpath=//input[@id='Diagnosed Date']")
        this.diagnosis1stSeenDate=page.locator("xpath=//input[@id='1st Seen Date']")
        this.status=page.locator("xpath=//input[@id='Status']")
        this.severity=page.locator("xpath=//input[@id='Severity']")
        this.activity=page.locator("xpath=//input[@id='Activity']")
        this.countryOfDiagnosis=page.locator("xpath=//input[@id='Country of Diagnosis']")
        this.underlayingCause=page.locator("xpath=//input[@id='Underlying Cause']")
        this.complicationAndDiagnosis=page.locator("xpath=//input[@id='Complications and Other Diagnosis']")
        this.externalCause=page.locator("xpath=//input[@id='External Cause']")
        this.linkToProcedure=page.locator("xpath=//input[@id='Link to Procedure']")
       

        this.outcome = page.locator("xpath=//input[@id='Outcome']")
        this.recommendation=page.locator("xpath=//input[@id='Select Recommendation']")
        this.frequency = page.locator("xpath=//input[@id='Frequency']")
        this.notes = page.locator("xpath=//textarea[@id='Notes']")
        this.private = page.locator("xpath=//label[@aria-label='Private Record']//input[@class='PrivateSwitchBase-input css-1m9pwf3']")
        this.setAsDefault = page.locator("xpath=//label[@aria-label='Set as Default']//input[@class='PrivateSwitchBase-input css-1m9pwf3']")
        this.addToFavourites = page.locator("xpath=//label[@aria-label='Add to Favourites']//input[@class='PrivateSwitchBase-input css-1m9pwf3']")
        this.addToOrderSets = page.locator("xpath=//label[@aria-label='Add to Order Set']//input[@class='PrivateSwitchBase-input css-1m9pwf3']")
        this.save = page.locator("xpath=//div[contains(text(),'Save')]")
        this.delete = page.locator("xpath=//button[@data-testid='Delete']")
        this.cancelDelete = page.locator("xpath=//button[@data-testid='Cancel']")
        this.confirmDelete = page.locator("xpath=//button[@data-testid='Ok']")
        this.deleteReason = page.locator("xpath=//textarea[@aria-label='Reason']")
        this.saveDeleteReason = page.locator("xpath=//div[@class='MuiGrid-root MuiGrid-container MuiGrid-item MuiGrid-grid-xs-12 css-6td7do']//button[@data-testid='Save']")
    }
    


//////////////////////////////////TEXTBOX FILLERS//////////////////////////////////////////


    //Fill Outcome Date 
    async enterDateOfOutcome(date) {
        await typeText(this.page, this.dateOfOutcome, date);
    }

    async enterClinicDate(date) {
        await typeText(this.page, this.clinicDate, date);
    }
    async enterOnSetDte(date)
    {
        await typeText(this.page, this.onSetDate, date );
    }
    async enterDiagnosedDate(date)
    {
        await typeText(this.page, this.diagnosedDate, date)
    }
    async enterDiagnosis1stSeenDate(date)
    {
        await typeText(this.page, this.diagnosis1stSeenDate, date)
    }

    //Fill Ouutome Notes 
    async enterClinicalItemNotes(notes) {
        await typeText(this.page, this.notes, notes);
    }
    
    async enterDeleteReason(reason) {
        await typeText(this.page, this.deleteReason, reason);
    }

/////////////////////////////////BUTTON CLICKS///////////////////////////////////////////////

        
    //Click on Collapsable button on Extra Details popup
    async clickOnClincialItemCollapsable() {
        await clickElement(this.page, this.clinicalItemCollapsable)
    }

    //Click on Save Medication button on Extra Details popup
    async clickOnSave() {
        await clickElement(this.page, this.save)
    }

    async clickOnDelete(){
        await clickElement(this.page, this.delete)
    }

    async clickOnCancelDelete(){
        await clickElement(this.page, this.cancelDelete)
    }

    async clickOnConfirmDelete(){
        await clickElement(this.page, this.confirmDelete)
    }
    
    async clickOnSaveDeleteReason(){
        await clickElement(this.page, this.saveDeleteReason)
    }

///////////////////////////////CHOOSE STATIC DROPDOWN ITEM//////////////////////////////////       
       
        async selectClinicalItemSubcategory(subcategory) {
            await selectFromDropdown(this.page, this.clinicalItemSubcategory, subcategory);      
        } 

        async selectFrequency(frequency) {
            await selectFromDropdown(this.page, this.frequency, frequency);      
        }        
        
        async selectOutcome(outcomeName){
            await selectFromDropdown(this.page, this.outcome, outcomeName)
        }

        async selectStatus(statusName)
        {
            await selectFromDropdown(this.page, this.status, statusName)
        }

        async selectSeverity(severityName)
        {
            await selectFromDropdown(this.page,this.severity, severityName)
        }
        async selectActivity(activityName)
        {
            await selectFromDropdown(this.page, this.activity, activityName)
        }
        async selectCountryOfDiagnosis(countryName)
        {
            await selectFromDropdown(this.page, this.countryOfDiagnosis, countryName)
        }

        async searchAndSelectUnderlayingCause(UnderlyingName)
        {
            await selectFromSearchResults(this.page, this.underlayingCause, UnderlyingName)
        }

        async searchAndSelectComplicationsAndDiagnosis(complicationsAndDagnosisName)
        {
            await selectFromSearchResults(this.page, this.complicationAndDiagnosis, complicationsAndDagnosisName)
        }
        async searchAndSelectExternalCause(externalCauseName)
        {
            await selectFromSearchResults(this.page, this.externalCause, externalCauseName)
        }
        async searchAndSelectLinktoProcedure(linkToProcedureName)
        {
            await selectFromSearchResults(this.page, this.linkToProcedure, linkToProcedureName)
        }
        

        async selectRecommendation(recommendation){
            await selectFromDropdown(this.page, this.recommendation, recommendation)
        }




}

module.exports = ClinicalExtraDetails;