/* Custom CSS Variables for Brand Colors */
:root {
    --brand-blue: #4d81af; /* Primary Brand Blue */
    --brand-blue-dark: #3a6d96; /* Slightly darker shade for interaction/hover */
    --brand-blue-light: #6296c6; /* Slightly lighter shade for a subtle hover effect */
    --brand-light-gray: #f2f5f7; /* Used for content area background/inputs */
    --text-color-dark: #333; /* Dark text for readability on light areas */
    --text-color-light: white; /* Light text for readability on dark areas */
    --danger-color: #c44;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    display: flex;
    background-color: white;
    color: var(--text-color-dark);
    min-height: 100vh;
}

/* DARK MODE */
.dark-mode {
    background-color: #222;
    color: var(--text-color-light);
}

.container {
    display: flex;
    width: 100%;
}

/* --- SIDEBAR STYLING: Solid Dark Blue Background --- */
.sidebar {
    width: 280px;
    /* Use the solid brand blue as the background */
    background: var(--brand-blue);
    padding: 20px;
    height: auto;
    min-height: 100vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
    margin-bottom: 25px;
    /* White text for contrast on the dark background */
    color: var(--text-color-light); 
}

/* --- MENU BUTTON STYLING: White Text on Dark Background --- */
.menu-btn {
    width: 100%;
    padding: 12px 15px;
    margin-bottom: 10px;
    border: none;
    /* Use transparent background so the sidebar color shows */
    background: transparent;
    /* White text */
    color: var(--text-color-light); 
    cursor: pointer;
    border-radius: 6px;
    font-size: 16px;
    text-align: left;
    transition: background 0.2s, color 0.2s;
}

/* Visually indicate the active/selected button */
.menu-btn.active-menu,
.menu-btn:hover {
    /* Use a slightly darker blue or light shade for hover/active */
    background: var(--brand-blue-dark); 
    color: var(--text-color-light);
    font-weight: bold;
    /* Remove box shadow to keep it clean */
    box-shadow: none; 
}

.content {
    flex: 1;
    padding: 40px;
}

.page {
    display: none;
}

.page.active {
    display: block;
}

.page h1 {
    /* Headings in the content area still use the brand color */
    color: var(--brand-blue);
}

.page p {
    max-width: 750px;
    line-height: 1.6;
    font-size: 16px;
}

/* --- INPUTS & SELECT STYLING --- */
input[type="password"],
select {
    width: 100%;
    max-width: 400px;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    box-sizing: border-box;
}

/* --- BUTTON STYLING (General) --- */
.save-btn,
#light,
#dark {
    margin-top: 15px;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    transition: background 0.2s;
}

/* Primary Action Button */
.save-btn,
.logout-everywhere {
    background: var(--brand-blue);
    color: white;
}

.save-btn:hover {
    background: var(--brand-blue-dark);
}

/* Secondary Button for Tema (Light/Dark) */
#light, #dark {
    /* Making these buttons match the primary style better for consistency */
    background: var(--brand-blue);
    color: white;
    margin-right: 10px;
}

#light:hover, #dark:hover {
    background: var(--brand-blue-dark);
    box-shadow: none;
}

.danger {
    background: var(--danger-color);
    color: white;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    border-radius: 6px;
}

.danger:hover {
    background: #a33;
}
