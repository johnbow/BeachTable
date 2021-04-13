
var sidebarMenu;
var sidebarLogin;
var menuButton;
var loginButton;

const sidebarAnimationDuration = 350;
const rightArrowSrc = "assets\\right-arrow-img.svg";
const leftArrowSrc = "assets\\left-arrow-img.svg";
const loginButtonSrc = "assets\\login-button-img.svg";
const menuButtonSrc = "assets\\menu-button-img.svg";


$(document).ready(function() {
    sidebarMenu = $("#sidebar-menu")
    sidebarLogin = $("#sidebar-login")
    menuButton = $("#header-menu-button")
    loginButton = $("#header-login-button")

    menuButton.img = $("#header-menu-img")
    loginButton.img = $("#header-login-img")

    sidebarMenu.hide()
    sidebarMenu.isVisible = false
    sidebarMenu.align = "left"

    sidebarLogin.hide()
    sidebarLogin.isVisible = false
    sidebarLogin.align = "right"

    // hide checkbox marks
    checkboxMonthly = $("#monthly-checkbox")
    checkboxMonthly.mark = $("monthly-checkbox-mark")

    menuButton.click(() => toggleSidebar(sidebarMenu, menuButton));
    loginButton.click(() => toggleSidebar(sidebarLogin, loginButton));
});


function toggleSidebar(sidebar, button) {
    sidebar.animate({width:'toggle'}, sidebarAnimationDuration)
    animateButton(sidebar, button)
    sidebar.isVisible = !sidebar.isVisible
}

function animateButton(sidebar, button) {
    if (sidebar.isVisible) {
        const [newSrc, rotation] = sidebar.align === "left" ?
            [menuButtonSrc, "-180deg"] : [loginButtonSrc, "180deg"]
        button.img.animate(
            {rotate: "+=" + rotation},
            sidebarAnimationDuration,
            "linear",
            // after animation complete
            () => button.img.attr("src", newSrc)
        )
    } else {
        const [newSrc, rotation] = sidebar.align === "left" ?
            [rightArrowSrc, "180deg"] : [leftArrowSrc, "-180deg"]
        button.img.attr("src", newSrc)
        button.img.animate(
            {rotate: "+=" + rotation},
            sidebarAnimationDuration,
            "linear"
        )
    }
}

function handleSwipeLeft() {
    if (sidebarLogin.isVisible) 
        toggleSidebar(sidebarLogin, loginButton)  
}

function handleSwipeRight() {
    if (sidebarMenu.isVisible)
        toggleSidebar(sidebarMenu, menuButton)
}


/* Implement swiping for closing sidebars*/

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
}                                               

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown )
        return;

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) 
            handleSwipeRight();
        else 
            handleSwipeLeft()                                                                                      
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
}

