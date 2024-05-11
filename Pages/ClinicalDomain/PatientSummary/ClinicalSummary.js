//Sathyanarayan

const {
  clickElement,
  typeText,
  selectFromDropdown,
} = require("../../../UtilFiles/StaticUtility.js");
const {
  selectFromSearchResults,
  locateFieldById,
  toggleDivVisibility,
  showClinicalItemByStatus,
  showExtraDetailLevel,
  clickHistoryTableIconsBeforeItemName,
  clickHistoryTableIconsUsingItemName,
  replaceLocator,
} = require("../../../UtilFiles/DynamicUtility.js");

class ClinicalSummary {
  constructor(page) {
    //sidebar Categories icons
    this.MenuIcon = page.locator(
      "xpath=//button[@aria-label='Menu Button']//*[name()='svg']"
    );

    //Search and Add Items to Contact
    this.allCategory = page.locator("xpath=//input[@id='allCategory']");
    this.allCategorySearchItem = page.locator(
      "xpath=//label[text()='Any Search, Item, Code, Category']"
    );

    //View Menu to View Contact Items
    this.viewContactItemsMenu = page.locator(
      "xpath=//h1[contains(text(), 'View')]/../..//button[@aria-label='Menu Button']"
    );
    this.closeContactItemMenu = page.locator(
      "xpath=//h1[contains(text(), 'Items added to current contact')]/../..//button[@aria-label='Menu Button']"
    );
    this.flag = true;
    this.pinContactItemsMenu = page.locator(
      "xpath=//button[@aria-label='pin']"
    );
    this.page = page;

    //Item Name to be added/updated/deleted
    this.itemName = "";
    this.closeWindowLocator = page.locator(
      "//button[@aria-label='cancelIcon']"
    );

    // Search Clinical Items fields
    this.searchClinicalItem = page.locator(
      "xpath=//label[text()='Any Search, Item, Code, Category']"
    );
    this.addClinicalItem = page.locator("xpath=//button[@aria-label='Add']");

    // Clinical Section Divs - These locators should be declared as string as we will use the toggle function
    this.expandSearchButton =
      "xpath=//div[@data-testid='search']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Expand']";
    this.hideSearchButton =
      "xpath=//div[@data-testid='search']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Hide']";
    this.expandFavouritesButton =
      "xpath=//div[@data-testid='favourites']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Expand']";
    this.hideFavouritesButton =
      "xpath=//div[@data-testid='favourites']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Hide']";
    this.expandHistoryButton =
      "xpath=//div[@data-testid='categoryHistoryAccordion']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Expand']";
    this.hideHistoryButton =
      "xpath=//div[@data-testid='categoryHistoryAccordion']//button[@aria-label='cellmaAccordionIcon']//*[name()='svg'][@aria-label='Hide']";

    // Favourites & Order sets
    // this.orderSetName = "xpath=//h1[text()='Conditions Order Sets']//..//..//button[@aria-label='Condyloma latum']"
    this.orderSetName =
      "xpath=//h1[text()='placeholder1']//..//..//button[@aria-label='placeholder2']";
    // this.favouriteName = "xpath=//h1[text()='Conditions Favourites']//..//..//button[@aria-label='Condyloma latum']"
    this.favouriteName =
      "xpath=//h1[text()='placeholder1']//..//..//button[@aria-label='placeholder2']";
    // this.orderSetItem = "xpath=//a[text()='Metformin 500mg tablets     ']//..//..//input[@class='PrivateSwitchBase-input css-1m9pwf3']"
    this.orderSetItem =
      "xpath=//a[text()='placeholder1']//..//..//input[@class='placeholder2']";
    // this.favouriteItem = "xpath=//a[text()='Metformin 500mg tablets']//..//..//input[@class='PrivateSwitchBase-input css-1m9pwf3']"
    this.favouriteItem =
      "xpath=//a[text()='placeholder1']//..//..//input[@class='placeholder2']";

    //Clinical Details Section (Status wise items and Level of extra details locators are static here!)
    //(Dynamic method is also available for the below locators )
    //Status wise items
    // this.allItems = page.locator("xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), 'All ')]");
    // this.normalItems = page.locator("xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), 'Normal')]");
    // this.migratedItems = page.locator("xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), 'Migrated')]");
    // this.deletedItems = page.locator("xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), 'Deleted')]");
    // this.archivedItems = page.locator("xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), 'Archived')]");

    //Level of extra details
    // this.levelOne = page.locator("xpath=//div[@aria-label='levelExtraDetails']//button[@data-testid='levelOne']")
    // this.levelTwo = page.locator("xpath=//div[@aria-label='levelExtraDetails']//button[@data-testid='levelTwo']")
    // this.levelThree = page.locator("xpath=//div[@aria-label='levelExtraDetails']//button[@data-testid='levelThree']")

    //RiskLevel dropdown
    this.riskLevel = page.locator("xpath=//input[@id='riskLevel']");

    //Locators for Added Item //This is dynamic as well - Done clickOnAddedItemDiv
    // this.expandClinicalRecord = page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='Sleep walking disorder']//parent::td//preceding-sibling::td//button[@aria-label='expandRowIconundefined']"); // This has to be dynamic (Item added to patient - Done clickOnAddedItemDiv)
    // this.historyButton = page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='Sleep walking disorder']//parent::td//following-sibling::td//button[@aria-label='patientHistoryIconButton']")
    // this.reviewButton = page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='Sleep walking disorder']//parent::td//following-sibling::td//button[@aria-label='reviewIconButton']")
    // this.highlightNoneButton = page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='Sleep walking disorder']//parent::td//following-sibling::td//button[@aria-label='highlightNone']")
    // this.highlightModerateButton = page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='Sleep walking disorder']//parent::td//following-sibling::td//button[@aria-label='highlightModerate']")
    // this.highlightHighButton = page.locator("xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='Sleep walking disorder']//parent::td//following-sibling::td//button[@aria-label='highlightHigh']" )
    // this.editButton = "//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='Sleep walking disorder']//parent::td//following-sibling::td//button[@aria-label='editIconButton']"
  }

  ///////////////////////////////BUTTON CLICKS///////////////////////////////////////////////
  /*This method is no longer used as we are clicking it in selectandaddClinicalItem*/
  // // Click on Add Medication button
  // async clickOnAddClinicalItem() {
  //     await this.page.waitForSelector(this.addClinicalItem);
  //     await clickElement(this.page, this.addClinicalItem);
  // }

  //

  async clickOnMenuIcon() {
    await clickElement(this.page, this.MenuIcon);
  }



  async toggleSearchSection() {
    await toggleDivVisibility(
      this.page,
      this.expandSearchButton,
      this.hideSearchButton
    );
  }

  async toggleFavouritesSection() {
    await toggleDivVisibility(
      this.page,
      this.expandFavouritesButton,
      this.hideFavouritesButton
    );
  }

  async toggleHistorySection() {
    await toggleDivVisibility(
      this.page,
      this.expandHistoryButton,
      this.hideHistoryButton
    );
  }

  ///////////////////////////////CHOOSE DYNAMIC DROPDOWN ITEMS//////////////////////////////////

  async selectandAddClinicalItem(clinicalItemName) {
    this.itemName = clinicalItemName;
    await selectFromSearchResults(
      this.page,
      this.searchClinicalItem,
      clinicalItemName,
      this.addClinicalItem
    );
  }

  async selectAllRiskLevel() {
    await selectFromDropdown(this.page, this.riskLevel, "All");
  }

  async selectLowRiskLevel() {
    await selectFromDropdown(this.page, this.riskLevel, "Low Risk");
  }

  async selectModerateRiskLevel() {
    await selectFromDropdown(this.page, this.riskLevel, "Moderate Risk");
  }

  async selectHighRiskLevel() {
    await selectFromDropdown(this.page, this.riskLevel, "High Risk");
  }

  //////////////////////// STATIC METHODS USED TO CLICK ON DYNAMICALLY CREATED LOCATORS /////////////////

  async clickOnAllItemsSection() {
    await showClinicalItemByStatus(this.page, "All");
  }

  async clickOnNormalItemsSection() {
    await showClinicalItemByStatus(this.page, "Normal");
  }

  async clickOnMigratedItemsSection() {
    await showClinicalItemByStatus(this.page, "Migrated");
  }

  async clickOnDeletedItemsSection() {
    await showClinicalItemByStatus(this.page, "Deleted");
  }

  async clickOnArchivedItemsSection() {
    await showClinicalItemByStatus(this.page, "Archived");
  }

  async clickOnStoppedSection() {
    await showClinicalItemByStatus(this.page, "Stopped");
  }

  async clickOnLevelOneExtraDetails() {
    await showExtraDetailLevel(this.page, "levelOne");
  }

  async clickOnLevelTwoExtraDetails() {
    await showExtraDetailLevel(this.page, "levelTwo");
  }

  async clickOnLevelThreeExtraDetails() {
    await showExtraDetailLevel(this.page, "levelThree");
  }

  async clickOnItemDiv(item = null) {
    try {
      if (item) {
        this.itemName = item;
      }
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "expandRowIconundefined"
      ); // Open Div
      await this.page.waitForTimeout(1000); // Wait for some time
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "expandRowIconundefined"
      ); // Close Div
    } catch (error) {
      console.error(`Error clicking on item div: ${error.message}`);
    }
  }

  async clickOnHistoryItemDiv() {
    await clickHistoryTableIconsUsingItemName(
      this.page,
      this.itemName,
      "expandRowIconundefined",
      true
    );
  }

  async clickOnItemHistory(item = null) {
    if (item) {
      this.itemName = item;
      await clickHistoryTableIconsUsingItemName(
        this.page,
        item,
        "patientHistoryIconButton"
      );
    } else {
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "patientHistoryIconButton"
      );
    }
  }

  async clickOnItemReview(item = null) {
    if (item) {
      this.itemName = item;
      await clickHistoryTableIconsUsingItemName(
        this.page,
        item,
        "reviewIconButton"
      );
    } else {
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "reviewIconButton"
      );
    }
  }

  async clickOnItemHighlightNone(item = null) {
    if (item) {
      this.itemName = item;
      await clickHistoryTableIconsUsingItemName(
        this.page,
        item,
        "highlightNone"
      );
    } else {
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "highlightNone"
      );
    }
  }

  async clickOnItemHighlightModerate(item = null) {
    if (item) {
      this.itemName = item;
      await clickHistoryTableIconsUsingItemName(
        this.page,
        item,
        "highlightModerate"
      );
    } else {
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "highlightModerate"
      );
    }
  }

  async clickOnItemHighlightHigh(item = null) {
    if (item) {
      this.itemName = item;
      await clickHistoryTableIconsUsingItemName(
        this.page,
        item,
        "highlightHigh"
      );
    } else {
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "highlightHigh"
      );
    }
  }

  async clickOnItemEdit(item = null) {
    if (item) {
      this.itemName = item;
      await clickHistoryTableIconsUsingItemName(
        this.page,
        item,
        "editIconButton"
      );
    } else {
      await clickHistoryTableIconsUsingItemName(
        this.page,
        this.itemName,
        "editIconButton"
      );
    }
  }

  async closeWindow() {
    await clickElement(this.page, this.closeWindowLocator);
  }

  async clickOnOrderSets(category, ordersets) {
    const favouriteLocator = this.orderSetName;
    const placeholderValues = {
      placeholder1: `${category} Order Sets`,
      placeholder2: ordersets,
    };
    const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
    await clickElement(updatedLocator);
  }

  async clickOnFavourites(category, favourite) {
    const favouriteLocator = this.favouriteName;
    const placeholderValues = {
      placeholder1: `${category} Favourites`,
      placeholder2: favourite,
    };
    const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
    await clickElement(updatedLocator);
  }

  async clickOnOrderSetItem(category, orderSetItem) {
    const favouriteLocator = this.orderSetItem;
    const placeholderValues = {
      placeholder1: orderSetItem,
      placeholder2: ordersets,
    };
    const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
    await clickElement(updatedLocator);
  }

  async clickOnFavouriteItem(category, favourite) {
    const favouriteLocator = this.favouriteName;
    const placeholderValues = {
      placeholder1: `${category} Favourites`,
      placeholder2: favourite,
    };
    const updatedLocator = replaceLocator(favouriteLocator, placeholderValues);
    await clickElement(updatedLocator);
  }

  /////////////////////////////// METHOD TO CREATE LOCATORS DYNAMICALLY ////////////////////////////

  //Status wise items click
  /* Methods to be called as below for required category
    await showClinicalItemByStatus(page, 'All');
    await showClinicalItemByStatus(page, 'Normal');
    await showClinicalItemByStatus(page, 'Migrated');
    await showClinicalItemByStatus(page, 'Deleted');
    await showClinicalItemByStatus(page, 'Archived');
    */
  // async showClinicalItemByStatus(page, tabText) {
  //     const locator = `xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), '${tabText}')]`;
  //     await clickElement(page, locator);
  // }

  //View Level of extra details
  /* Methods to be called as below for required category
    await showExtraDetailLevel(page, 'levelOne');
    await showExtraDetailLevel(page, 'levelTwo');
    await showExtraDetailLevel(page, 'levelThree');
    */
  // async showExtraDetailLevel(page, levelText) {
  //     const locator = `xpath=//div[@aria-label='levelExtraDetails']//button[@data-testid='${levelText}']`;
  //     await clickElement(page, locator);
  // }

  // async clickHistoryTableIconsBeforeItemName(page, itemName, ariaLabel){
  //     const locator= `xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='${itemName}']//parent::td//preceding-sibling::td//button[@aria-label='${ariaLabel}']`;
  //     await clickElement(page, locator);
  // }

  // async clickHistoryTableIconsAfterItemName(page, itemName){
  //     const locator= `xpath=//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='${itemName}']//parent::td//following-sibling::td//button[@aria-label='${ariaLabel}']`;
  //     await clickElement(page, locator);
  // }

  async clickOnViewContactItemsMenu() {
    if (this.flag == true) {
      await clickElement(this.page, this.viewContactItemsMenu);
      this.flag = false;
    }
  }

  async clickOnCloseContactItemMenu() {
    if (this.flag == false) {
      await clickElement(this.page, this.closeContactItemMenu);
      this.flag = true;
    }
  }

  async clickOnPinContactItemsMenu() {
    if (this.flag == false) {
      await clickElement(this.page, this.pinContactItemsMenu);
    }
  }

  // Choose Required Category from Dropdown
  async selectCategoryFromList(category) {
    await selectFromDropdown(this.page, this.allCategory, category);
  }

  async selectClinicalItem(item) {
    await selectFromSearchResults(this.page, this.allCategorySearchItem, item);
  }

  async clickOnViewOrCloseContactItemsMenu() {
    if (this.flag) {
      await clickElement(this.page, this.viewMenu);
    } else {
      await clickElement(this.page, this.closeMenu);
    }
    this.flag = !this.flag;
  }

  async clickOnPinContactItemsMenu() {
    await clickElement(this.page, this.pinContactItemsMenu);
  }
}

module.exports = ClinicalSummary;
