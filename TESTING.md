#Table of Contents

## **During Development Testing:**

### ***Manual Testing:***

###***Bugs and Fixes:***

1. **Intended Outcome** - A game play that looped continuously once initiated and takes the appropriate actions based on the users input
   * ***Issue Found***
        * When trying to encase the entire logic in a while loop I was running into an infinite loop.
        * The loop never paused to listen for the events.
   * ***Causes***
        * I was trying to use event listeners as something that happened in the flow of the logic. I was placing them where the users input was required thinking this would pause the loop until the event was triggered.
        * Due to the above the while loop was just running without any exit condition.
   * ***Solution Found***
        * Once I understood event listeners were something that once loaded they were always there, I moved the event listeners into the global scope and used them to trigger functions in a way that looped the game logic using clicks and key down events without the need for a while loop. 
        * Shrunk the scope of the while loop to encompass only the computer turn which required not inputs from the user.
1. **Intended Outcome** - Sub menus that displayed and hid within a single HTML container as required (sub-menu methodology for the final product changed).
   * ***Issue Found***
        * Initially I had only one container for sub-menus in the index.html file. I was using javascript to insert all content into this one section using the javascript inner.HTML method. This worked however The exit button did not work.
   * ***Causes***
        *  Due to the fact the button was also being inserted with the javascript file the event listeners could not find the button upon loading the page meaning the sub-menu exit button did not function.
   * ***Solution Found***
        * By giving the single HTML container a button which was loaded with the DOM the event listener than worked without issue to hide the sub-menu and bring the main menu back into view. This way left only the HTML text being inserted as a child of the sub-menu container by the JS file. 
         
