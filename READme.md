How this game works?

The game is made using HTML, CSS (Less) and JS (depends strongly on jQuery). Every room, roughly speaking, has simple markup in HTML which defines items (such as table, window, etc.) and click areas. CSS is responsible for graphic and JS for all the rest (DOM animations, interactions, saving game state). Since I had some experience with developing and designing websites I decided that HTML would be the right technology to start with.


A little bit more about scripts:

js/audio.js - all sounds are defined here,
js/data.js - responsible for saving game state,
js/dialogue_box.js - responsible for various popups,
js/game.js - sits on the top of all scripts and uses them to genrate game,
js/items.js - manages items found by a player,
js/npcs.js - non playable charcters,
old_browser.js - fires when not supported browser is detected,
js/room.js - generates rooms, responsible for interaction of the main character wit the game world the A (A-Star),
js/scenes.js - cutscenes are stored here,
js/settings.js - game settings, at the time this file is responsible for reseting the game only :P,
js/text_cloud.js - speech balloons for the main character,
js/tooltip.js - tooltips :),
js/utility.js - super simple tool: I use it to define hit-areas for tha game grid,
js/view.js - generates outside views (when you look throught a window).

Graphic
"Bust Basemesh"
Textures from CG Textures

JavaScript
Modernizr
SoundManager 2
jQuery
jQuery Colors by Edwin Martin
jQuery Preload CSS Images by filament group
jStorage by Andris Reinman
Spritely by Artlogic
jQuerty UI
jQuerty Transit by Rico Sta. Cruz
A* (A-Star) algorithm function by Andrea Giammarchi

Play the game at: https://adiyenuubarii.github.io/Escape-the-House/
