//Sathyanarayan

const fs = require("fs");
const XLSX = require("xlsx");
const path = "C:/Riomed/Cellma4Automation";
const mysql = require("mysql");
const convertExcelToJson = require("../../../../../../config/global-setupOptimized");

const { test, expect } = require("@playwright/test");
const connectToDatabase = require("../../../../../../manoj").default;
const { executeQuery } = require("../../../../../../databaseWriteFile"); // Update the path accordingly
import compareJsons from "../../../../../../compareFileOrJson";

import logger from "../../../../../../Pages/BaseClasses/logger";
import LoginPage from "../../../../../../Pages/BaseClasses/LoginPage";
import Homepage from "../../../../../../Pages/BaseClasses/Homepage";
import ConfirmExisting from "../../../../../../Pages/PatientDomain/ConfirmExisting";
import ContactHistory from "../../../../../../Pages/ClinicalDomain/PatientSummary/ContactHistory";
import PatientSearch from "../../../../../../Pages/PatientDomain/PatientSearch";
import Environment from "../../../../../../Pages/BaseClasses/Environment";
import Menu from "../../../../../../Pages/BaseClasses/Menu";
import ClinicalSummary from "../../../../../../Pages/ClinicalDomain/PatientSummary/ClinicalSummary";
import ClinicalExtraDetails from "../../../../../../Pages/ClinicalDomain/PatientSummary/ClinicalExtraDetails";


import { TIMEOUT } from "dns";
import { error } from "console";
import { before } from "node:test";
import { toggleDivVisibility } from "../../../../../../UtilFiles/DynamicUtility";

// Array to store console logs

const consoleLogs = [];
let jsonData;

test.describe("Excel Conversion Diagnosis Category", () => {
  test("Extract Patient Summary Details", async ({}) => {
    const excelFilePath =
      process.env.EXCEL_FILE_PATH || "./ExcelFiles/PatientSummary.xlsx";
    const jsonFilePath = "./TestDataWithJSON/PatientDomain/PatientSummary.json";

    console.log("excelFilePath:", excelFilePath);
    console.log("jsonFilePath:", jsonFilePath);
    const conversionSuccess = await convertExcelToJson(
      excelFilePath,
      jsonFilePath
    );
    if (conversionSuccess) {
      // jsonData = require("../../../TestDataWithJSON/PatientDomain/PatientDetails.json");
      jsonData = require("../../../../../../TestDataWithJSON/PatientDomain/PatientSummary.json");
      console.log("Excel file has been converted successfully!");
      console.log("jsonData:", jsonData); // Log the loaded JSON data
      console.log("excelFilePath after conversion:", excelFilePath);
      console.log("jsonFilePath after conversion:", jsonFilePath);
    } else {
      throw new Error("Excel to JSON conversion failed.");
    }
  });
});

test.describe("Diagnosis Category", () => {
  test("Add Diagnosis", async ({ page }) => {
    if (!jsonData || !jsonData.PatientDetails) {
      throw new Error("JSON data is missing or invalid.");
    }
    let index = 0;
    for (const data of jsonData.PatientDetails) {
      const loginpage = new LoginPage(page);
      const homepage = new Homepage(page);
      const environment = new Environment(page);
      const confirmexisting = new ConfirmExisting(page);
      const contacthistory = new ContactHistory(page);
      const patientsearch = new PatientSearch(page);
      const diagnosis = new ClinicalSummary(page);
      const diagnosisExtraDetails = new ClinicalExtraDetails(page);
      

      const menu = new Menu(page);
      await page.goto(environment.Test);
      await loginpage.enterUsername(jsonData.loginDetails[0].username);
      logger.info("Username enter successfully");
      await loginpage.enter_Password(jsonData.loginDetails[0].password);
      logger.info("Password enter successfully");
      await loginpage.clickOnLogin();
      logger.info("Clicked on Login button successfully");
      await homepage.clickOnPatientIcon();
      logger.info("Clicked on Patient Icon successfully");
      await patientsearch.clickOnSearchButton();
      logger.info("Clicked on Search button successfully");
      await patientsearch.enterGivenName(data.pat_firstname);
      logger.info("Given Name entered successfully");
      //await page.pause()
      await patientsearch.enterFamilyName(data.pat_surname);
      logger.info("Family Name entered successfully");
      await patientsearch.selectSex(data.pat_sex);

    await patientsearch.selectBornDate(jsonData.PatientDetails[index].pat_dob);
      //await patientsearch.selectBornDate(formattedDate);
      await patientsearch.clickOnSearchButton();
      await patientsearch.clickOnSearchPatientLink();
      await page.waitForTimeout(1500);
      await confirmexisting.clickOnConfirmExistingDetails();
      // await contacthistory.clickOnMenuIcon()
      // await page.waitForTimeout(2000)
      // await contacthistory.clickOnMenuIcon()
      // await patientsummary.clickOniconExaminationsCategory()
     // await page.pause();
      await contacthistory.selectServiceFilter("General Medicine Automation");
      await contacthistory.selectContactReasonFilter("Assessments");
      await contacthistory.enterContactDate("26/04/2024");
      await contacthistory.selectContactReason("Assessments");
      await contacthistory.selectContactLocation("Cardio Location");
      await contacthistory.enterContactWith("Dr Sathya");
      await contacthistory.clickOnAddContact();
      await diagnosis.clickOnViewContactItemsMenu();
      await diagnosis.clickOnPinContactItemsMenu();
      await diagnosis.selectCategoryFromList("Diagnosis");
      await diagnosis.selectandAddClinicalItem("Dengue haemorrhagic fever"); //This searches item and clicks on add button
      await page.waitForTimeout(2000);      
      await diagnosisExtraDetails.clickOnClincialItemCollapsable();
      await page.waitForTimeout(1000);
      await diagnosisExtraDetails.selectClinicalItemSubcategory("Subsec Diagnosis");
      await diagnosisExtraDetails.enterOnSetDte("26/04/2024");
      await diagnosisExtraDetails.enterDiagnosedDate("26/04/2024");
      await diagnosisExtraDetails.enterDiagnosis1stSeenDate("26/04/2024")
      
      await diagnosisExtraDetails.selectStatus("Suspected")
      await diagnosisExtraDetails.selectSeverity("Mild")
      
      await diagnosisExtraDetails.selectActivity("Remission")
      await diagnosisExtraDetails.searchAndSelectLinktoProcedure("Division of Left Knee Tendon, Open Approach")
      await diagnosisExtraDetails.selectCountryOfDiagnosis("India")
      await diagnosisExtraDetails.searchAndSelectUnderlayingCause("Asthma")
      await page.waitForTimeout(1000)
      await diagnosisExtraDetails.searchAndSelectComplicationsAndDiagnosis("Dengue haemorrhagic fever")
      await diagnosisExtraDetails.searchAndSelectExternalCause("Abnormal findings on diagnostic imaging of other body structures")
     
      await page.pause()   

     // await diagnosisExtraDetails.selectFrequency("1");
      await diagnosisExtraDetails.enterClinicalItemNotes(
        "Added Diagnosis Notes From Playwright"
      );
      await diagnosisExtraDetails.clickOnSave();
      await page.waitForTimeout(500);
      await expect(
        page.getByText("Diagnosis Record Added Successfully")
      ).toHaveText("Diagnosis Record Added Successfully");
    //   await expect(
    //     page.getByText(`${clinicaCatergory} Record Added Successfully`)
    //   ).toHaveText(`${clinicaCatergory} Record Added Successfully`);
    await page.pause();
      await diagnosis.toggleSearchSection(); //Close the search section
      await page.pause();

      await diagnosis.clickOnItemDiv("Dengue haemorrhagic fever");
      await diagnosis.clickOnItemEdit();
      await diagnosisExtraDetails.clickOnClincialItemCollapsable();
      await diagnosisExtraDetails.selectClinicalItemSubcategory("Normal Outcome");
      await diagnosisExtraDetails.enterDateOfOutcome("02/05/2024");
      await diagnosisExtraDetails.selectFrequency("2");
      await diagnosisExtraDetails.enterClinicalItemNotes(
        "Updated Outcome Notes From Playwright"
      );
      await diagnosisExtraDetails.clickOnSave();
      await page.waitForTimeout(1000);
      //await expect(page.getByText('Outcome Record Updated Successfully')).toHaveText('Outcome Record Updated Successfully')
      await diagnosis.clickOnItemHistory();
      await diagnosis.clickOnHistoryItemDiv();
      await page.waitForTimeout(500);
      await diagnosis.closeWindow();
      await page.waitForTimeout(500);
      await diagnosis.clickOnItemReview();
      await page.waitForTimeout(500);
      await diagnosis.clickOnItemHighlightNone();
      await page.waitForTimeout(500);
      await diagnosis.selectLowRiskLevel();
      await page.waitForTimeout(500);
      await diagnosis.selectModerateRiskLevel();
      await page.waitForTimeout(500);
      await diagnosis.selectHighRiskLevel();
      await page.waitForTimeout(500);
      await diagnosis.selectAllRiskLevel();
      await diagnosis.clickOnLevelTwoExtraDetails();
      await diagnosis.clickOnLevelThreeExtraDetails();
      await diagnosis.clickOnLevelOneExtraDetails();
      await diagnosis.clickOnItemEdit();
      await diagnosisExtraDetails.clickOnDelete();
      await diagnosisExtraDetails.clickOnCancelDelete();
      await diagnosisExtraDetails.clickOnDelete();
      await diagnosisExtraDetails.clickOnConfirmDelete();
      await diagnosisExtraDetails.enterDeleteReason("Deleted from playwright");
      await diagnosisExtraDetails.clickOnSaveDeleteReason();
      await diagnosis.clickOnNormalItemsSection();
      await diagnosis.clickOnMigratedItemsSection();
      await diagnosis.clickOnDeletedItemsSection();
      await page.waitForTimeout(1000);
      await diagnosis.clickOnArchivedItemsSection();
      await diagnosis.clickOnAllItemsSection();
      await diagnosis.toggleHistorySection(); // Close the history section

      //   await examinationhome.expandExaminationHistory()
      //   await examinationhome.expandExaminationHistory()
      //   await examinationhome.clickOnAllLinks();
      //  await examinationhome.clickOnHistoryIcon()
      //  await examinationhome.expandsHistoryofExaminationIcon()
      //  await examinationhome.expandsHistoryofExaminationIcon()
      //  await examinationhome.closeExaminationHistoryPopup()
      //  await page.waitForTimeout(2000)
      //  await examinationhome.clickOnReviewExaminationButton()
      //  await page.waitForTimeout(2000)
      //  await examinationhome.clickOnHighlightedNoneRisk()
      //  await page.waitForTimeout(2000)
      //  await examinationhome.clickOnLowRiskLevel()
      //  await page.waitForTimeout(2000)
      //  await examinationhome.clickOnModerateRiskLevel()
      //  await page.waitForTimeout(2000)
      //  await examinationhome.clickOnHighRiskLevel()
      //  await page.waitForTimeout(2000)
      //  await examinationhome.clickOnAllRiskLevel()
      //  await page.waitForTimeout(1000)
      //  await page.pause()
      //  await examinationhome.checkExtradetailsLevel()

      ////////To be utilized to implement pin functionality/////////////
      //   test('Verify pin functionality', async ({ page }) => {
      //     const contactItems = new ContactItems(page);

      //     // Click on the view menu to open the window
      //     await contactItems.clickOnViewMenu();

      //     // Assert that the viewMenu button is hidden and the closeMenu button is visible
      //     expect(await page.isVisible(contactItems.viewMenu)).toBeFalsy();
      //     expect(await page.isVisible(contactItems.closeMenu)).toBeTruthy();

      //     // Click the pinContactItemsMenu button
      //     await contactItems.clickOnPinContactItemsMenu();

      //     // Assert that the pinContactItemsMenu button is hidden and the closeMenu button is visible again
      //     expect(await page.isVisible(contactItems.pinContactItemsMenu)).toBeFalsy();
      //     expect(await page.isVisible(contactItems.closeMenu)).toBeTruthy();

      //     // Click the pinContactItemsMenu button again to revert the state
      //     await contactItems.clickOnPinContactItemsMenu();

      //     // Assert that the pinContactItemsMenu button is visible and the closeMenu button is hidden
      //     expect(await page.isVisible(contactItems.pinContactItemsMenu)).toBeTruthy();
      //     expect(await page.isVisible(contactItems.closeMenu)).toBeFalsy();
      // });

      await page.pause();
    }
  });
});
