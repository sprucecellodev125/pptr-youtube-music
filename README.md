# pptr-youtube-music
Minimalist YouTube music player written in Node.JS

# FAQ
### Uh, is this music bot?
No. this is not a music bot. This is puppeteer script that can be used as YouTube music player (or media player if you change the code a lot).

### Why?
Why not?
<details>
<summary>Reasons</summary>
<p>

This thing is run chrome headlessly so you still can enjoy YouTube music without opening browser and search it manually (or even listen to YouTube music in Linux Terminal in different ways)
  </p>
  </details>

# Alright what should I do to get this?
I assume you have Node.JS and npm installed so you can install the dependencies and launch this thing.
  
1. Install any dependencies. You can install it by typing `npm i` in terminal
2. Run the player. To run it use `node player '<insert song name here>'`. Make sure to have quote (') at song name if it have space like 'dream rainbow liella'. Note if you get command not found error install Xvfb in your Linux distro or edit player.js to set headless: false to headless:true.
3. The music will played shortly. To stop press Ctrl+C

### Um, why I heard ads
~~well, because this is headless browser where you'll get same YouTube experience but without opening browser and search it manually~~ Now puppeteer-extra with Ad-blocker plugin is added. Just pull latest commit and you're good to go