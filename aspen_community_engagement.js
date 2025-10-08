// Insert your own image URLS in lines 128 and 134 //
// Credit: This code was written primarily by Google Gemini. Use caution. Support cannot be provided. //

<script>
document.addEventListener('DOMContentLoaded', function() {
    
    // -----------------------------------------------------------------
    // A. STYLE RULES DEFINITION (Unchanged - Placeholder)
    // -----------------------------------------------------------------
    
    const styleRules = [
        // ... (Your style rules here) ...
    ];
    
    // -----------------------------------------------------------------
    // B. STYLE APPLICATION FUNCTION (Unchanged)
    // -----------------------------------------------------------------

    function applyAllCustomStyles() {
        // Target and style 'yourCampaignsTable' (lightblue)
        var yourTable = document.getElementById('yourCampaignsTable');
        if (yourTable) {
            yourTable.style.setProperty('width', '100%', 'important'); 
            yourTable.style.setProperty('background-color', 'lightblue', 'important'); 
        }

        // Target and style 'linkedAccountCampaignsTable' (pink)
        var linkedTable = document.getElementById('linkedAccountCampaignsTable');
        if (linkedTable) {
            linkedTable.style.setProperty('width', '100%', 'important');
            linkedTable.style.setProperty('background-color', 'pink', 'important');
        }

        // ... (rest of style application logic) ...
    }

    // -----------------------------------------------------------------
    // C. NEW ROW INJECTION LOGIC (POSITIONING UPDATE)
    // -----------------------------------------------------------------

    /**
     * Finds a table, calculates its column count (using a fixed override for the first table), 
     * and injects a full-width image row. The placement is dynamic for the linked account table.
     * @param {string} tableId The ID of the table to target.
     * @param {string} imageUrl The source URL for the image.
     */
    function injectRowWithImage(tableId, imageUrl) {
        const targetTable = document.getElementById(tableId);

        if (targetTable) {
            const tbody = targetTable.querySelector('tbody');
            const thead = targetTable.querySelector('thead');
            let colCount = 0;

            // --- 1. COLUMN COUNT LOGIC (Unchanged) ---
            if (thead) {
                const headerRow = thead.querySelector('tr');
                if (headerRow) {
                    colCount = headerRow.querySelectorAll('th, td').length;
                }
            }
            if (tbody) {
                 const firstBodyRow = tbody.querySelector('tr');
                 if (firstBodyRow) {
                     colCount = Math.max(colCount, firstBodyRow.querySelectorAll('td, th').length);
                 }
            }

            // CRITICAL FIX: MANUALLY OVERRIDE FOR THE 'yourCampaignsTable'
            if (tableId === 'yourCampaignsTable') {
                 colCount = 8; 
            }
            // ------------------------------------------

            if (tbody && colCount > 0) {
                // --- 2. CREATE NEW ROW AND IMAGE (Unchanged) ---
                const newRow = document.createElement('tr');
                const imageCell = document.createElement('td'); 
                
                const imageTag = document.createElement('img');
                imageTag.setAttribute('src', imageUrl); 
                imageTag.setAttribute('alt', 'Campaign Banner');
                imageTag.setAttribute('style', 'max-width: 100%; height: auto; display: block; margin: 0 auto;');
                
                imageCell.setAttribute('colspan', colCount);
                imageCell.setAttribute('style', 'padding: 0; border: none; text-align: center;');

                imageCell.appendChild(imageTag);
                newRow.appendChild(imageCell);
                
                // --- 3. INSERTION LOGIC (Updated Here) ---
                let insertionPoint = null;

                if (tableId === 'linkedAccountCampaignsTable') {
                    // Search for the row containing the cell with "Winter Reading Challenge"
                    // Get all 'td' elements
                    const tdCells = tbody.querySelectorAll('td');
                    for (const cell of tdCells) {
                        // Check if the cell content matches the target text
                        if (cell.textContent.trim() === 'Winter Reading Challenge') {
                            // Found the cell, set its parent row as the insertion point
                            insertionPoint = cell.closest('tr');
                            break; 
                        }
                    }
                }

                if (insertionPoint) {
                    // Use insertBefore to place the new row *before* the target row
                    tbody.insertBefore(newRow, insertionPoint);
                } else {
                    // Fallback: If 'Winter Reading Challenge' is not found, prepend the row (as you did before)
                    // This is also the default action for 'yourCampaignsTable'
                    tbody.prepend(newRow);
                }
            }
        }
    }

    
    // -----------------------------------------------------------------
    // D. EXECUTION ORDER (Unchanged)
    // -----------------------------------------------------------------

    // 1. Inject the new row into the first table ('yourCampaignsTable')
    injectRowWithImage(
        'yourCampaignsTable', 
        '#'
    ); 
    
    // 2. Inject the new row into the second table ('linkedAccountCampaignsTable')
    injectRowWithImage(
        'linkedAccountCampaignsTable', 
        '#'
    );
    
    // 3. Re-apply custom styles with a slight delay.
    setTimeout(applyAllCustomStyles, 50); 

});



// Insert new text

// --- GLOBAL COLLAPSE FUNCTION (Generic) ---

/**
 * Toggles the visibility of any collapsible content wrapper (div).
 * This function calculates the required height dynamically for a smooth transition.
 * * @param {string} containerId - The ID of the container element to collapse/expand.
 */
function toggleCollapse(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Find the button associated with this container via aria-controls
    const button = document.querySelector('button[aria-controls="' + containerId + '"]');
    const icon = button ? button.querySelector('svg') : null;

    if (!button || !icon) return;

    // Check if the content is currently collapsed (has the 'collapsed' class)
    const isCollapsed = container.classList.contains('collapsed');

    if (isCollapsed) {
        // --- EXPAND ---
        // 1. Set max-height to the calculated scrollHeight for smooth transition
        container.style.maxHeight = container.scrollHeight + "px"; 
        
        // 2. Remove the collapsed class
        container.classList.remove('collapsed');
        
        // 3. Rotate the icon to point up and update ARIA
        icon.style.transform = 'rotate(180deg)';
        button.setAttribute('aria-expanded', 'true');
        
        // 4. After the transition completes (350ms), remove max-height to allow dynamic sizing
        setTimeout(() => container.style.maxHeight = '', 350); 
    } else {
        // --- COLLAPSE ---
        // 1. Lock the current calculated height before collapsing
        container.style.maxHeight = container.scrollHeight + "px"; 
        
        // Use requestAnimationFrame for immediate height lock before applying collapse styles
        requestAnimationFrame(() => { 
            // 2. Add the collapsed class (sets max-height to 0 in CSS)
            container.classList.add('collapsed');
            
            // 3. Rotate the icon to point down and update ARIA
            icon.style.transform = 'rotate(0deg)';
            button.setAttribute('aria-expanded', 'false');
        });
    }
}


// --- SETUP FUNCTION ---

/**
 * Wraps a set of elements (H3 and Table, or just Table) and injects a toggle button into the H2 above it.
 * * @param {HTMLElement} h2Title - The H2 element to inject the button into.
 * @param {HTMLElement} contentStart - The first element to be wrapped (H3 or Table).
 * @param {HTMLElement} tableElement - The table element to be wrapped.
 * @param {string} containerId - Unique ID for the new wrapper div.
 * @param {boolean} startCollapsed - True to apply the 'collapsed' class initially.
 */
function setupTableCollapse(h2Title, contentStart, tableElement, containerId, startCollapsed) {
    const mainContent = h2Title.parentNode;

    // A. WRAP CONTENT
    const container = document.createElement('div');
    container.id = containerId;
    container.classList.add('h2-collapse-container'); // Apply generic CSS class
    
    // Set initial state
    if (startCollapsed) {
        container.classList.add('collapsed');
    }
    
    // 1. Insert the container before the first content element
    mainContent.insertBefore(container, contentStart);
    
    // 2. Move content into the container
    if (contentStart !== tableElement) {
         container.appendChild(contentStart); // Move the H3 (or other element)
    }
    container.appendChild(tableElement); // Move the Table


    // B. INJECT TOGGLE BUTTON INTO H2
    
    // 1. Create a wrapper around the H2 text and the button for flex alignment
    const h2Wrapper = document.createElement('div');
    h2Wrapper.classList.add('h2-toggle-container'); 
    
    // Replace the H2 with the H2 Wrapper
    h2Title.parentNode.insertBefore(h2Wrapper, h2Title);
    h2Wrapper.appendChild(h2Title);

    // Determine initial icon rotation based on state
    const initialRotation = startCollapsed ? '0deg' : '180deg';
    const initialAria = startCollapsed ? 'false' : 'true';

    // 2. Create the toggle button HTML structure
    const toggleButtonHTML = `
        <button id="toggle-${containerId}-Button" 
                class="btn btn-sm // btn-primary//  ml-2" 
                aria-expanded="${initialAria}" 
                aria-controls="${containerId}"
                onclick="toggleCollapse('${containerId}')">
            <svg id="icon-${containerId}" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="transition: transform 0.3s ease; transform: rotate(${initialRotation});">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
    `;
    
    // 3. Inject the button right next to the H2 text
    h2Title.innerHTML += toggleButtonHTML;
}


// --- DOM CONTENT LOADED LOGIC FOR SETUP ---

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. INJECT COLLAPSE CSS STYLES (Styles must be generic)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Main Collapse Container (Class applied to wrapper div) */
        .h2-collapse-container {
            overflow: hidden;
            transition: max-height 0.35s ease-in-out, opacity 0.35s ease-in-out;
            opacity: 1;
        }

        /* Collapsed State Class */
        .h2-collapse-container.collapsed {
            max-height: 0px !important; 
            opacity: 0;
        }
        
        /* H2 wrapper for button alignment */
        .h2-toggle-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        /* Ensure H2 title element doesn't have conflicting margins */
        .h2-toggle-container h2 {
            margin: 0;
            padding-right: 10px;
        }
    `;
    document.head.appendChild(style);


    // 2. FIND ELEMENTS AND SETUP COLLAPSE FOR ALL SECTIONS

    const mainContent = document.getElementById('main-content-with-sidebar');
    if (mainContent) {
        
        // Find all H2s once for stable indexing, regardless of DOM manipulation
        // H2 Indices: 0:Your Campaigns, 1:Linked, 2:Past, 3:Your Past
        const h2s = mainContent.querySelectorAll('h2');

        // --- 2.1 LINKED ACCOUNT CAMPAIGNS (H2: index 1) ---
        const linkedH2 = h2s[1];
        const linkedTable = document.getElementById('linkedAccountCampaignsTable');
        const linkedH3 = linkedTable ? linkedTable.previousElementSibling : null; 
        
        if (linkedH2 && linkedH3 && linkedTable && linkedH3.tagName === 'H3') {
            setupTableCollapse(
                linkedH2, 
                linkedH3, // Start wrapping from H3
                linkedTable, 
                'linkedCampaignsContainer', 
                true // START COLLAPSED
            );
        }
        
        // --- BREAKS: Between Linked Account Campaigns and Past Campaigns ---
        const pastH2 = h2s[2]; // Target: Past Campaigns H2
        if (pastH2) {
            pastH2.parentNode.insertBefore(document.createElement('br'), pastH2);
            pastH2.parentNode.insertBefore(document.createElement('br'), pastH2);
        }

        // --- 2.2 PAST CAMPAIGNS (H2: index 2, Table has ID) ---
        const pastTable = document.getElementById('pastCampaignsTable');
        
        if (pastH2 && pastTable) {
            // Find the element immediately following the H2
            let contentStart = pastH2.nextElementSibling;
            
            // Traverses siblings until the starting element (the table) is found
            while (contentStart && contentStart.nodeType !== 1) { // nodeType 1 is Element
                contentStart = contentStart.nextElementSibling;
            }
            
            // Check that the found element is indeed the table we expect
            if (contentStart === pastTable) {
                 setupTableCollapse(
                    pastH2, 
                    pastTable, // contentStart
                    pastTable, // tableElement
                    'pastCampaignsContainer', 
                    true // START COLLAPSED
                );
            }
        }
        
        // --- BREAKS: Above Your Past Campaigns ---
        const yourPastH2 = h2s[3]; // Target: Your Past Campaigns H2
        if (yourPastH2) {
            yourPastH2.parentNode.insertBefore(document.createElement('br'), yourPastH2);
            yourPastH2.parentNode.insertBefore(document.createElement('br'), yourPastH2);
        }


        // --- 2.3 YOUR PAST CAMPAIGNS (H2: index 3, Table does not have ID) ---
        
        if (yourPastH2) {
            // Get the element immediately after the H2
            let yourPastTable = yourPastH2.nextElementSibling;

            // This ensures we skip any nodes (like text or comments) until we find the first TABLE element
            while (yourPastTable && yourPastTable.tagName !== 'TABLE') {
                yourPastTable = yourPastTable.nextElementSibling;
            }
            
            if (yourPastTable) {
                // The table is found. Now wrap it.
                setupTableCollapse(
                    yourPastH2, 
                    yourPastTable, // contentStart
                    yourPastTable, // tableElement
                    'yourPastCampaignsContainer', 
                    true // START COLLAPSED
                );
            }
        }
    }
});

</script>
