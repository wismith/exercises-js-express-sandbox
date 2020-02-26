// Node's standard path module
// See https://nodejs.org/api/path.html
let path = require('path');

// The Express web application framework
// See http://expressjs.com/
let express = require('express');

// Library for nicer logging of HTTP requests
// See https://github.com/expressjs/morgan
let logger = require('morgan');

let app = express();

// Tell Express to load static files from the public/ directory
app.use(express.static(path.join(__dirname, 'public')));

// Tell Express to log HTTP requests in the 'dev' format
// See the Morgan documentation for what that looks like
app.use(logger('dev'));

// A helper we wrote to capitalize strings
let capitalize = require('./lib/capitalize');

// The overall layout remains the same between pages, so we use
// this helper function to wrap our page-specific content in the layout.
function getLayoutHTML(content) {
  // Template strings can span multiple lines, making them
  // well-suited for, well, acting as templates.
  let html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Hello, world!</title>

        <link rel="stylesheet" href="/css/normalize.css">
        <link rel="stylesheet" href="/css/main.css">
      </head>
      <body>
        <section id="content">
          ${content}
        </section>
      </body>
    </html>
  `;

  return html;
}

app.get('/', (request, response) => {
  let appDescription = `
    <p>This application is meant to highlight some of the essential ideas in web development.  You should already be familiar with some basic HTML and know how to create a standalone, static HTML document that you can open with your browser.</p>
    <p>At its core, every web application has the same job: listen for incoming requests, generate an HTML document, and send that document back to the browser.  Unlike a static HTML document, a web application can respond to dynamic, user-supplied information.  If a static HTML document is like a vending machine then a web application is like a restaurant with a real, live chef.</p>
  `;

  let content = `
    <h1>Hello, World!</h1>
    ${appDescription}
    <p>Start exploring by clicking the links below.</p>
    <h2>Static Pages</h2>
    <p>These pages don't respond to any user-supplied data.</p>
    <ul>
    <li><a href="/waffles">Plain ol' waffles</a></li>
    <li><a href="/waffles/chocolate">Chocolate waffles</a></li>
    </ul>

    <h2>Dynamic Pages</h2>
    <p>These pages <em>do</em> respond to user-supplied data.  When you visit the links below, look at the URL.  Everything after the <code>?</code> character is called the _query string_ and it's one place we can supply dynamic information. </p>
    <ul>
    <li><a href="/waffles/custom?type=banana">Banana waffles</a></li>
    <li><a href="/waffles/custom?type=blueberry">Blueberry waffles</a></li>
    <li><a href="/waffles/custom?type=nutella">Nutella waffles</a></li>
    <li><a href="/bake?baked_good=cookies&count=10">Bake 10 cookies</a></li>
    <li><a href="/bake?baked_good=loaves+of+bread&count=5">Bake 5 loaves of bread</a> — notice how we represent spaces in the URL.</li>
    <li><a href="/bake?baked_good=cupcakes&count=1138">Bake 1138 cupcakes</a></li>
    </ul>
  `;

  let pageHtml = getLayoutHTML(content);

  response.send(pageHtml);
});

app.get('/waffles', (request, response) => {
  let content = `
    <h1>Waffle Time!</h1>
    <p>Everybody loves waffles.</p>
    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/waffles/chocolate', (request, response) => {
  let content = `
    <h1>Chocolate Waffle time!</h1>
    <p>Chocolate waffles: better than regular waffles.</p>
    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

app.get('/waffles/custom', (request, response) => {
  let waffleType = capitalize(request.query.type);

  let content = `
    <h1>${waffleType} Waffle time!</h1>
    <p>${waffleType} waffles: better than regular waffles.</p>
    <p>Change the value of the <code>type</code> parameter in the URL and see what happens.</p>
    <p><a href="/">Back to the homepage</a></p>
  `;

  response.send(getLayoutHTML(content));
});

// Visit, e.g., /bake?baked_good=waffles&count=20
app.get('/bake', (request, response) => {
  let count = Number.parseInt(request.query.count);
  let bakedGood = request.query.baked_good;

  let content = `
    <h1>Time To Bake ${capitalize(bakedGood)}!</h1>
    <p>
      <a href='/'>Back to the homepage</a>
    </p>
    <p>
      Change the value of the <code>count</code> and <code>baked_good</code> parameters in the URL and see what happens!
    </p>
    <form method="GET" action="/bake">
      <div class="form-section">
        <label for="baked_good">Baked good:</label>
        <input type="text" name="baked_good" id="baked_good" required>
      </div>
      <div class="form-section">
        <label for="count">Number of baked goods:</label>
        <input type="number" name="count" id="count" required>
      </div>
      <div class="form-section">
        <input type="submit" value="Let's bake!">
      </div>
    </form>
    <h2>Our ${capitalize(bakedGood)}</h2>
    <p>
      I like ${bakedGood}, too.  Let's bake ${count} of them.
    </p>
  `;

  content += '<ul>';

  for (let i = 1; i <= count; i++) {
    content += `<li>${bakedGood} number ${i}</li>`;
  }

  content += '</ul>';

  response.send(getLayoutHTML(content));
});

// Page to greet the user based on a name passed to the url
app.get('/greet', (request, response) => {
  let content;
  console.log(request.query);
  if (!request.query.name) {
    content = `
    <h1>Whoops</h1>
    <p>
      I didn't get your name!
    </p>
    `;
  } else {
    let name = capitalize(request.query.name);
    content = `
    <h1>Greetings, ${name}</h1>
    <p>
      Thank you for stopping by this page!  You will see a lot of cool stuff with this repo.
    </p>
    `;
  }
  content += `
    <form id="passName" method="GET" action="/greet">
      <input type="text" id="name" name="name" placeholder="Your name" required>
      <input type="submit" value="Submit">
    </form>
  `;

  response.send(getLayoutHTML(content));
});

let SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}...`);
  console.log('Visit this URL in your browser to see the web app:');
  console.log();
  console.log(`    http://localhost:${SERVER_PORT}`);
  console.log();
});
