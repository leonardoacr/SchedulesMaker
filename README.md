<h1 align="center"><a href="https://schedules-maker.onrender.com/">Schedule Maker</a></h1>
Everyone make a "todo list" in the beginning, so I made an effort to bring this exercise to another level - A full web app for Schedule Maker with a functional login-register and notes organization for each day of the week, and you can even customize it changing the theme and background! <a href="https://schedules-maker.onrender.com/">Live Website</a>

<div align="center">
 <a href="#features">Features</a> •
 <a href="#technologies">Technologies</a> •
<a href="#requirements">Requirements</a> •
 <a href="#running">Running the code</a>
</div>

---

<br>

## :camera: Overview
<div align="center" >
  <img src="./Github/desktop.gif" alt="demo-web" height="350">
  <img src="./Github/mobile.gif" alt="demo-mobile" height="350">
</div>

<div id="features">
  <h2>:star: Features</h2>
</div>

- [x] Theme Switcher! Dark & Light Theme;
- [x] Custom Background! You can choose three options: Upload Your Own Image | Random Image (using fetch to get images from Unsplash) | Image URL);
- [x] Login / Register fully working with Passport!
- [x] NoSQL MongoDB Cloud as database, saving notes and config data (Background state & Theme)!
- [x] Complete CRUD! (Create - Read - Update - Delete) notes from your Schedule!
- [x] Compatible with older browser! Webpack 5.0 and Babel compiler;
- [x] Using local storage to save session, theme and background - priority stack is used to check conflicting data with the database;

<br>

<div id="technologies">
  <h2>:rocket: Technologies</h2>
</div>

✔️ Node | ✔️ Typescript | ✔️ Express | ✔️ EJS | ✔️ Passport | ✔️ MongoDB

✔️ HTML | ✔️ CSS | ✔️ Javascript

<br>

<div id="requirements">
  <h2>💻 Requirements</h2>
</div>

Before you can see this running you need to get your hands on Git and Node.js:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

And here the code editor I use and recommend:
[VSCode](https://code.visualstudio.com/)

Now go to MongoDB Cloud and create your free account.
[MongoDB](https://www.mongodb.com/)

Watch this video and learn how to get your own Connection String and paste that on .env example file, change the file name to just '.env'. Please keep the string "name" there because it is being used to change the database name inside the code.
[ConnectionStringVideo](https://youtu.be/oVHQXwkdS6w)

<div id="running">
  <h2>⚙ Running</h2>
</div>

##

```bash
# Clone this repository
$ git clone https://github.com/leonardoacr/SchedulesMaker

# Access the main folder on your terminal:
$ cd SchedulesMaker

# Install node dependencies
$ npm i

# for the next three commands you can just type "npm start-render" and it will run everything at once, otherwise keep following:
# Run tscp to copy non-typescript files to "dist" folder (keep -w if you think about changing anything)
$ tscp -w

# Run tsc to compile typescript code to javascript in dist folder
$ tsc -w

# Run webpack to compile js w/ babel and css files to dist folder as bundles
$ npm run webpack

# Now go to the dist folder
$ cd dist/backend

# Put the server to run on localhost:3000 (use nodemon to keep it running or node to only run one time)
$ nodemon server.js

```

## Improvements for future commits and personal notes from the author:

- The login/register still can be improved adding some break points for simple passwords and adding login w/ Google or external accounts. Also it needs functionality to "Forgot Password", "Change Password" and "Delete Account", once the user make an account he can't change anymore, for now.
- A bug that I couldn't find a way to solve: when we go to "about" page for example, or return to home page, and we were already logged in, the server don't know if the user is still logged and you need to click on login to make your entry again (though if you type the URL manually you can access the private pages because of the sessions) for now I still don't know how to clear this out.
- I gave up on improving this website because while I was making it and studying about technologies I crossed path with React.js and realized if this were fully made with React would be way better, specially the modals to edit notes - in this time I also learned a lot more about folder organization (MVP) and clean code, and also separing the frontend and backend better instead of making the frontend with EJS Templates as I was doing in this one. It would be way too much working remaking it so feel free to change yourself if you feel like it!
