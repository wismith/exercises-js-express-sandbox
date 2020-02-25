# Express Sandbox

Let's build our first dynamic web application! We'll be using the [Express][url-express] framework, a lightweight way to write web application

## Contents <!-- omit in toc -->

- [What A Web Application Is](#what-a-web-application-is)
- [Getting Started](#getting-started)
- [Errors And Restarting The Web Server](#errors-and-restarting-the-web-server)
- [Iterations](#iterations)
  - [[v0] Explore](#v0-explore)
  - [[v1] Greeting Page (URL Only)](#v1-greeting-page-url-only)
  - [[v2] Greeting Page (Form)](#v2-greeting-page-form)
  - [[v3] Your Own Page](#v3-your-own-page)

## What A Web Application Is

Originally, the web was invented to share [hypertext documents][wiki-hypertext], mostly among academics. People would write [HTML files][wiki-html] — HTML stands for **H**yper**t**ext **M**arkup **L**anguage — and serve them up using a simple document server (called a web server). Users would navigate between web servers using a browser, a special piece of software that could turn HTML into something graphical and clickable.

Web browsers and web servers communicate using [HTTP][wiki-http], the **H**yper**t**ext **T**ransfer **P**rotocol.

A web application is a program that listens for incoming HTTP requests and responds with a programmatically-generated HTML document.

## Getting Started

1. Fork this repository
1. Use `git clone` to get a local copy of your fork
1. Run `npm install` inside the project directory
1. Run `npm start` to start the web application
1. Navigate to <http://localhost:3000>
1. Start on the [iterations](#iterations)

**Remember**, you have to run `npm install` before any of this will work.

## Errors And Restarting The Web Server

1. You can restart the web server by pressing `Ctrl+C` in the terminal where the web server is running.
1. If you see an error involving `EADDRINUSE` that means you're already running the web server somewhere. You have to kill that copy of the server.

   To do that, run the following:

   ```console
   ps aux | grep app.js
   ```

   You should see a line that contains `node app.js`, like this:

   ```console
   jesse            40313   0.0  0.1  4571396  24564 s000  S+    8:26AM   0:00.15 node app.js
   ```

   The second column is the *process ID*. Run the following to kill that process:

   ```console
   kill 40313
   ```

## Iterations

### [v0] Explore

Before you write any code, get the web server running and visit <http://localhost:3000>. Click around and explore. When you visit a page, look at `app.js` and see what the web application is doing.

Pay attention to how the web application...

- Knows which block of code to run
- Creates the HTML document
- Sends the HTML document back to the browser

### [v1] Greeting Page (URL Only)

Make sure you understand how the web application handles `/bake` before attempting this.

- [ ] As a user, when I visit `/greet?name=WXYZ`, I see a message greeting `WXYZ`. `WXYZ` could be any string, e.g., `/greet?name=Jesse`, `/greet?name=Wilfred`.
- [ ] As a user, when I visit `/greet`, I see a message telling me there's no greeting to give.

### [v2] Greeting Page (Form)

(Again, look at the form on `/bake`) to see how it works.

- [ ] As a user, when I visit `/greet` (with or without parameters), I see a form that allows me to enter a name and submit to see a new greeting.

### [v3] Your Own Page

Add your own page that has dynamic behavior. Servers can read/write to files, so maybe think of information you want to remember between page loads.

For example, you could read the contents of a `todos.txt` and display a list on the page.

Or, you could display the current time.

Or, you could keep track of how many people visited the page.

[url-express]: https://expressjs.com/
[wiki-hypertext]: https://en.wikipedia.org/wiki/Hypertext
[wiki-html]: https://en.wikipedia.org/wiki/HTML
[wiki-http]: https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol
