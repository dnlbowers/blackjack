#Table of Contents

## **During Development Testing:**

### ***Manual Testing:***

###***Bugs and Fixes:***

1. **Intended Outcome** - A game play that looped continuously once initiated and takes the appropriate actions based on the users input
    * ***Issue Found:***
        * When trying to encase the entire logic in a while loop I was running into an infinite loop.
        * The loop never paused to listen for the events.
    * ***Causes:***
        * I was trying to use event listeners as something that happened in the flow of the logic. I was placing them where the users input was required thinking this would pause the loop until the event was triggered.
        * Due to the above the while loop was just running without any exit condition.
    * ***Solution Found:***
        * Once I understood event listeners were something that once loaded they were always there, I moved the event listeners into the global scope and used them to trigger functions in a way that looped the game logic using clicks and key down events without the need for a while loop. 
        * Shrunk the scope of the while loop to encompass only the computer turn which required not inputs from the user.
1. **Intended Outcome** - Sub menus that displayed and hid within a single HTML container as required (sub-menu methodology for the final product changed).
    * ***Issue Found:***
        * Initially I had only one container for sub-menus in the index.html file. I was using javascript to insert all content into this one section using the javascript inner.HTML method. This worked however The exit button did not work.
    * ***Causes:***
        *  Due to the fact the button was also being inserted with the javascript file the event listeners could not find the button upon loading the page meaning the sub-menu exit button did not function.
    * ***Solution Found:***
        * By giving the single HTML container a button which was loaded with the DOM the event listener than worked without issue to hide the sub-menu and bring the main menu back into view. This way left only the HTML text being inserted as a child of the sub-menu container by the JS file. 
1. **Intended Outcome** - Game rules divided into sub-sections that are clear and fit within the space provided.          
    * ***Issue Found:***
        * Whilst keeping the font large enough to be readable the text over extended the window size on smaller screens.
    * ***Causes:***
        * Larger volume of text on a narrow screen. 
    * ***Solution Found:***
        * To resolve this I created an accordion menu. At first although this looked pretty the issue still remained if more than one section was open at a time. After a bit of research I found by creating a function to close all sections when a new one was clicked I could prevent this issue completely. The end result was an accordion menu that would only open one section at a time which then fit the container height even on smaller screen widths.
1. **Intended Outcome** - Small, frequent, and descriptive commits to ensure best practise of version control.         
    * ***Issue Found:***
        * This one was less of a bug but something to be noted The were at least two very large commits {895c74e} and {d8bcc80} that I caught.
    * ***Causes:***
        * Due to using SVG files for all card images each one was read as multiple lines of code. The above two commits were from adding a selection card backs and removing the unused ones. There was one particularly large svg file of the linux penguin which appears tro account for the bulk of the additions/deletions in the commit.
    * ***Solution Found:***
        * Since this was not a bug, no fix needed.
1. **Intended Outcome** - Cards fanned out on the table in a staggered fashion so only the left side of the card was visible under the card on top.        
    * ***Issue Found:***
        * The first issue was that the function fanCards() would work for the first hand but then when re-dealing the first two cards they would appear to the right as is the original cards were still on the table.
        * 
    * ***Causes:***
        * Due to using SVG files for all card images each one was read as multiple lines of code. The above two commits were from adding a selection card backs and removing the unused ones. There was one particularly large svg file of the linux penguin which appears tro account for the bulk of the additions/deletions in the commit.
    * ***Solution Found:***
        * Since this was not a bug, no fix needed.
