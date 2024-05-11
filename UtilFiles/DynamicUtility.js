//Sathyanarayan


const { clickElement, typeText, selectFromDropdown} = require('../UtilFiles/StaticUtility');

async function locateField(page, selector) {
    try {      
      await page.waitForSelector(selector);        
      const field = await page.$(selector);  
      return field;
    } catch (error) {
      console.error(`Error locating field with selector "${selector}": ${error.message}`);
      throw error;
    }
  }  
  
  async function locateFieldById(page, id) {
      const selector = `#${id}`;      
      try {
       await page.waitForSelector(selector);         
        const field = await page.$(selector);           
        return field;
      } catch (error) {
        console.error(`Error locating field with ID "${id}": ${error.message}`);
        throw error;
      }
    }  
  
    async function locateFieldByLabel(page, label) {
      try {        
        const labelElement = await page.$(`text=${label}`);    
        if (!labelElement) {
          throw new Error(`Label "${label}" not found.`);
        }
        const forAttribute = await labelElement.getAttribute('for');    
        if (!forAttribute) {
          throw new Error(`No "for" attribute found on label "${label}".`);
        }
        const field = await page.$(`#${forAttribute}`);    
        if (!field) {
          throw new Error(`Input field associated with label "${label}" not found.`);
        }    
        return field;
      } catch (error) {
        console.error(`Error locating field by label "${label}": ${error.message}`);
        throw error;
      }
    }  

    // Select item from a dropdown containing a dynamic list
  // async function selectFromSearchResults(page, searchLocator, listItem, addItemLocator=null) {
  //   await searchLocator.waitFor();
  //   await searchLocator.fill(listItem);
  
  //   // Construct the locator for the item based on its role and name
  //   const itemLocator = await page.getByRole('option', { name: `${listItem}` });
  
  //   //const itemLocator = await page.getByRole('option', { name: 'Sleep walking disorder' })
      
  //   // Wait for the item locator to appear
  //   await itemLocator.waitFor({ state: 'visible' });
  //   await itemLocator.click();
  
  //   if (addItemLocator) {
  //     if(typeof addItemLocator === 'string'){
  //       console.log("Waiting for addItemLocator...");
  //       await page.waitForSelector(addItemLocator, { state: 'visible', timeout: 5000 });
  //       console.log("addItemLocator found, clicking...");
  //       await page.click(addItemLocator);
  //     }
  //     else {
  //       await page.waitForTimeout(1000);
  //       addItemLocator.click();
  //     }
  //   } else {
  //       console.log("addItemLocator is not provided.");
  //   }
  // }
  
  async function selectFromSearchResults(page, searchLocator, listItem, addItemLocator=null) {
    try {
        console.log("ListItem:", listItem);
        console.log("Waiting for searchLocator...");
        await searchLocator.waitFor();
        console.log("Filling searchLocator with:", listItem);
        await searchLocator.fill(listItem);
        await page.waitForTimeout(2000)
        // Construct the locator for the item based on its role and name
        console.log("Waiting for itemLocator...");
        // const itemLocator = typeof listItem === 'string' ? `xpath=//li[text()='${listItem}']` : listItem.toString();
        const itemLocator = await page.getByRole('option', { name: `${listItem}` });
        
        console.log("Found itemLocator:", itemLocator);
        
        // Wait for the item locator to appear
        console.log("Waiting for itemLocator to be visible...");
        await itemLocator.waitFor({ state: 'visible' });
        console.log("itemLocator is visible, clicking...");
        await itemLocator.click();
      
        if (addItemLocator) {
          if(typeof addItemLocator === 'string'){
            console.log("Waiting for addItemLocator...");
            await page.waitForSelector(addItemLocator, { state: 'visible', timeout: 5000 });
            console.log("addItemLocator found, clicking...");
            await page.click(addItemLocator);
          }
          else {
            await page.waitForTimeout(1000);
            addItemLocator.click();
          }
        } else {
            console.log("addItemLocator is not provided.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

  async function toggleDivVisibility(page, expandButtonLocator, hideButtonLocator) {
    const isDivVisible = await page.isVisible(expandButtonLocator);
    if (isDivVisible) {
        await clickElement(page, page.locator(expandButtonLocator)); // Click to expand the div
    } else {
        await clickElement(page, page.locator(hideButtonLocator)); // Click to hide the div
    }
  }

  // Dynamic methods 
  async function showClinicalItemByStatus(page, tabText) {
    const locator = `xpath=//div[@class='MuiTabs-flexContainer css-k008qs']//button[contains(text(), '${tabText}')]`;
    try {
      await page.waitForSelector(locator);
      const elementHandle = await page.$(locator);
      if (elementHandle) {
          await elementHandle.click();
      } else {
          console.error(`Element with locator "${locator}" not found.`);
      }
  } catch (error) {
      console.error(`Error clicking on element with locator "${locator}": ${error.message}`);
  }
  }
  
  async function showExtraDetailLevel(page, levelText) {
    const locator = `xpath=//div[@aria-label='levelExtraDetails']//button[@data-testid='${levelText}']`;
    try {
      await page.waitForSelector(locator);
      const elementHandle = await page.$(locator);
      if (elementHandle) {
          await elementHandle.click();
      } else {
          console.error(`Element with locator "${locator}" not found.`);
      }
  } catch (error) {
      console.error(`Error clicking on element with locator "${locator}": ${error.message}`);
  }
  }
  
  //This function can be used to create dynamic locators
  // async function replaceLocatorElements(locator, elements) {
  //   let modifiedLocator = locator;
  //   elements.forEach(element => {
  //       const [key, value] = element.split('=');
  //       modifiedLocator = modifiedLocator.replace(new RegExp(`\\b${key}\\b`, 'g'), `'${value}'`);
  //   });
  //   return modifiedLocator;
// }

async function replaceLocator(locatorString, placeholderValues) {
  let updatedLocator = locatorString;
  for (const [placeholder, value] of Object.entries(placeholderValues)) {
      updatedLocator = updatedLocator.replace(new RegExp(`\\b${placeholder}\\b`, 'g'), value);
  }
  return updatedLocator;
}


async function assertElementHasLabel(page, elementLocator, elementLabel) {
  const element = await page.$(elementLocator);
  if (!element) {
    throw new Error(`Element with locator ${elementLocator} not found.`);
  }
  const labelText = await page.textContent(elementLocator);
  if (!labelText) {
    throw new Error(`No text found for element with locator ${elementLocator}.`);
  }
  if (labelText.trim() !== elementLabel.trim()) {
    throw new Error(`Expected label '${elementLabel}', but found '${labelText}'.`);
  }
  console.log(`Element with label '${elementLabel}' found.`);
}


  // async function clickHistoryTableIconsUsingItemName(page, itemName, ariaLabel, historyPage = null) {
  //   const locator = `//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='${itemName}']//../..//button[@aria-label='${ariaLabel}']`;
  //   try {
  //     await page.waitForSelector(locator);
  //     const elementHandles = await page.$$(locator);
  //     if (elementHandles.length > 0) {
  //       for (let i = historyPage ? 1 : 0; i < elementHandles.length; i++) {
          
  //         await elementHandles[i].click();
  //         await page.waitForTimeout(200);
  //       }
  //     } else {
  //       console.error(`No elements found with locator "${locator}"`);
  //     }
  //   } catch (error) {
  //     console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
  //   }
  // }

  async function clickHistoryTableIconsUsingItemName(page, itemName, ariaLabel, historyPage = null) {
    const locator = `//td[@class='MuiTableCell-root MuiTableCell-body MuiTableCell-sizeMedium css-1obezc4']//*[text()='${itemName}']//../..//button[@aria-label='${ariaLabel}']`;
    try {
        await page.waitForSelector(locator);
	      if(historyPage === null)
        {	
          const elementHandle = await page.$(locator);
          await elementHandle.click()	
        }
        else{
              let pageNumber = 1;
              let startIndex = 1;
              let endIndex = 11;
              while (true) {
                  // Wait for elements to load
                  await page.waitForTimeout(1000);
                  const elementHandles = await page.$$(locator);
                  if (elementHandles.length > 0) 
                   {
                    // If not on history page, loop through elements and click each one
                          for (let i = startIndex; i <= Math.min(elementHandles.length, endIndex); i++) {
                              await elementHandles[i].click();
                              await page.waitForTimeout(200);
                          }
                      const nextPageButtonLocator = `//button[@aria-label='Go to page ${pageNumber + 1}']`;
                      const nextPageButton = await page.$(nextPageButtonLocator);
                      if (nextPageButton) {
                          await nextPageButton.click();
                          pageNumber++;
                          startIndex=0;
                          endIndex = 10;
                      } 
                      else {
                          break;
                      }
                    } else {
                console.error(`No elements found with locator "${locator}"`);
                break;
            }
          }
        }
    } catch (error) {
        console.error(`Error clicking on elements with locator "${locator}": ${error.message}`);
    }
}




  
  
  module.exports = { 
    locateField, 
    locateFieldById, 
    locateFieldByLabel, 
    selectFromSearchResults, 
    toggleDivVisibility, 
    showClinicalItemByStatus, 
    showExtraDetailLevel, 
    clickHistoryTableIconsUsingItemName, 
    replaceLocator,
    assertElementHasLabel
};