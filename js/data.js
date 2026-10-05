// ICD201 Unit 1 dataset. Edit freely. Cards: [topic, front, back]
const TOPICS = ["Page setup", "Text", "Images", "Lists", "Links", "Tables", "Flexbox"];

const CARDS = [
// Page setup
["Page setup", "Which tag sets the text shown on the browser tab?", "`<title>`, placed inside `<head>`."],
["Page setup", "What goes inside `<head>` vs `<body>`?", "`<head>` holds page info (title, styles). `<body>` holds visible content."],
["Page setup", "What file extension does a web page use?", "`.html`"],
["Page setup", "What should the home page be named?", "`index.html`"],
["Page setup", "Why should every page have a unique title?", "It identifies each page in the tab, bookmarks and search results."],
["Page setup", "How do you reuse an earlier page as a starting point?", "Open it, modify it, and save it under the required file name."],
["Page setup", "Where should images be saved so `src=\"Cottage.jpg\"` works?", "In the same folder as the HTML file."],
["Page setup", "Where do you paste old content before rebuilding a page?", "A temporary file (e.g. Notepad) so nothing is lost."],
// Text
["Text", "Which tag wraps a paragraph?", "`<p>`"],
["Text", "Which tag makes text bold (strong importance)?", "`<strong>` (or `<b>`)"],
["Text", "Which tag emphasizes (italic) text?", "`<em>` (or `<i>`)"],
["Text", "Which tag creates a line break?", "`<br>` (it has no closing tag)"],
["Text", "Which tags are the heading levels?", "`<h1>` (largest) to `<h6>` (smallest)"],
["Text", "What is the &copy; symbol's HTML entity?", "`&copy;`"],
["Text", "Why are `<font>` and `align` considered outdated?", "Styling belongs in CSS, not in HTML attributes or deprecated tags."],
["Text", "What is the difference between a tag and an attribute?", "A tag defines an element; an attribute adds info inside the opening tag, like `href=\"...\"`."],
// Images
["Images", "Which tag inserts an image?", "`<img>` (self-closing)"],
["Images", "What are the two required `<img>` attributes?", "`src` (file path) and `alt` (description)."],
["Images", "What is `alt` text for?", "Describes the image for screen readers and shows if the image fails to load."],
["Images", "What does `src` hold?", "The path or file name of the image."],
["Images", "How do you align an image left of text (older HTML)?", "`<img align=\"left\">`. Modern way: CSS `float: left` or flexbox."],
["Images", "How do you make an image a clickable link?", "Wrap the `<img>` in an `<a href>` tag."],
["Images", "What is the file type of the course photos?", "`.jpg`"],
["Images", "Which attributes set image size?", "`width` and `height`."],
// Lists
["Lists", "Which tag makes a bulleted list?", "`<ul>` (unordered list)"],
["Lists", "Which tag makes a numbered list?", "`<ol>` (ordered list)"],
["Lists", "Which tag marks each item in a list?", "`<li>` (list item)"],
["Lists", "What must be the direct child of `<ul>` and `<ol>`?", "`<li>` elements."],
["Lists", "When do you use `<ol>` over `<ul>`?", "When order matters, like sequential steps."],
["Lists", "Name the 3 amenities in the Georgian Bay list.", "Fully equipped rental cottages, boat rentals, guided bird-watching tours."],
["Lists", "Can a list sit inside a paragraph `<p>`?", "No. Close the `<p>` first; lists are block elements."],
// Links
["Links", "Which tag creates a hyperlink?", "`<a>` (anchor)"],
["Links", "Which attribute holds the link destination?", "`href`"],
["Links", "What is a relative link?", "A link to a file in your own site, like `href=\"cottages.html\"`."],
["Links", "What is an external link?", "A full URL to another site, like `href=\"http://www.parrysound.com\"`."],
["Links", "How do you open a link in a new tab?", "`target=\"_blank\"`"],
["Links", "Name the 5 pages in the site navigation.", "Home, Cottages, Boat Rentals, Things to Do, About Us."],
["Links", "Which file does \"Things to Do\" link to?", "`events.html`"],
["Links", "Which file does \"Boat Rentals\" link to?", "`boats.html`"],
["Links", "What are the 3 link states you can colour?", "link (unvisited), visited link, and active link."],
["Links", "What does an active link mean?", "The link at the moment it is being clicked."],
["Links", "Old body attributes for link colours?", "`link`, `vlink`, `alink` (modern CSS: `a:link`, `a:visited`, `a:active`)."],
["Links", "How do you wrap a thumbnail so it navigates?", "`<a href=\"page.html\"><img src=\"pic.jpg\" alt=\"...\"></a>`"],
// Tables
["Tables", "Which tag creates a table?", "`<table>`"],
["Tables", "What does `<tr>` mean?", "Table row."],
["Tables", "What does `<td>` mean?", "Table data cell (a column in a row)."],
["Tables", "What does `border=\"1\"` do on a table?", "Shows layout lines temporarily while building; remove before submitting."],
["Tables", "What column widths were used in Practice 2.4?", "Left (images) 20%, right (text) 80%."],
["Tables", "Name the 4 sections in the table layout.", "Banner image, top navigation, two columns (photos + text), copyright notice."],
["Tables", "How can one cell span all columns?", "`colspan=\"2\"`"],
["Tables", "Why is table layout discouraged today?", "Tables are for data; layout should use CSS (flexbox/grid) for accessibility and flexibility."],
// Flexbox
["Flexbox", "Which CSS turns on flexbox?", "`display: flex;`"],
["Flexbox", "Which property centers items along the main axis?", "`justify-content: center;`"],
["Flexbox", "What does `gap: 20px` do?", "Adds 20px of space between flex items."],
["Flexbox", "What does `flex: 0 0 20%` mean?", "Don't grow, don't shrink, base width 20%. Used for the sidebar."],
["Flexbox", "What does `flex: 1` do?", "Item grows to fill remaining space (main text column)."],
["Flexbox", "Which semantic tags replaced table layout?", "`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`"],
["Flexbox", "Which tag holds the navigation links?", "`<nav>`"],
["Flexbox", "Which tag holds side images or related content?", "`<aside>`"],
["Flexbox", "Where should internal CSS go?", "In `<style>` inside `<head>`."],
["Flexbox", "Why move styling out of inline attributes?", "Cleaner code, reusable rules, easier changes."],
["Flexbox", "Default direction of a flex container?", "`row` (left to right)."],
];

// Hand-written quiz questions. a = index of correct option.
const QUIZ = [
{t:"Page setup", q:"Where does the `<title>` tag belong?", o:["Inside `<body>`","Inside `<head>`","After `</html>`","Inside `<p>`"], a:1, e:"Title is page info, so it goes in `<head>`."},
{t:"Page setup", q:"Image `Cottage.jpg` is in a different folder than your HTML. What happens?", o:["It displays anyway","The image breaks unless the path is correct","The page won't save","The title changes"], a:1, e:"`src` is a path; it must match the file location."},
{t:"Images", q:"Which is a complete, correct image tag?", o:["`<img>Cottage.jpg</img>`","`<image src=\"Cottage.jpg\">`","`<img src=\"Cottage.jpg\" alt=\"A rustic cottage\">`","`<img href=\"Cottage.jpg\">`"], a:2, e:"`<img>` uses `src` and `alt`, and has no closing tag."},
{t:"Images", q:"Best `alt` text for the cottage photo?", o:["image1","A rustic wooden cottage in the woods","click here","Cottage.jpg"], a:1, e:"Alt text describes what the image shows."},
{t:"Lists", q:"Which code makes a bulleted list?", o:["`<ol><li>A</li></ol>`","`<ul><li>A</li></ul>`","`<ul><p>A</p></ul>`","`<li><ul>A</ul></li>`"], a:1, e:"`<ul>` with `<li>` items."},
{t:"Lists", q:"Which list suits sequential steps?", o:["`<ul>`","`<ol>`","`<dl>`","`<nav>`"], a:1, e:"Ordered lists number the steps."},
{t:"Links", q:"Which link opens an external site in a new tab?", o:["`<a href=\"x.com\">`","`<a src=\"http://x.com\">`","`<a href=\"http://x.com\" target=\"_blank\">X</a>`","`<a target=\"http://x.com\">`"], a:2, e:"`href` for the URL and `target=\"_blank\"` for a new tab."},
{t:"Links", q:"Which href goes to the Things to Do page?", o:["`things.html`","`events.html`","`todo.html`","`about.html`"], a:1, e:"Practice 2.2 maps Things to Do to `events.html`."},
{t:"Links", q:"Which link state describes a page the user already opened?", o:["link","active","visited","hover"], a:2, e:"Visited link colour applies after the page was opened."},
{t:"Tables", q:"In a table layout, which tag creates a column cell?", o:["`<tr>`","`<td>`","`<th>`","`<col>`"], a:1, e:"`<td>` cells live inside `<tr>` rows."},
{t:"Tables", q:"Before submitting Practice 2.4 you should…", o:["Add `border=\"1\"`","Remove `border=\"1\"`","Delete the table","Rename the file"], a:1, e:"The border was only for seeing the layout while building."},
{t:"Flexbox", q:"Which CSS places items side by side with space between?", o:["`display: flex; gap: 20px;`","`display: block;`","`float: none;`","`position: fixed;`"], a:0, e:"Flex row with a gap."},
{t:"Flexbox", q:"Which tag best replaces the old left photo column?", o:["`<aside>`","`<footer>`","`<title>`","`<tr>`"], a:0, e:"`<aside>` holds side content."},
{t:"Flexbox", q:"To center nav links in a flex container use…", o:["`text-align: flex`","`justify-content: center`","`align: center`","`gap: center`"], a:1, e:"`justify-content` aligns on the main axis."},
];

// Overview: [topic, title, bullets[]]
const OVERVIEW = [
["Page setup", "Building a page", [
 "A page is a `.html` file; the home page is `index.html`. Keep images in the same folder.",
 "`<head>` holds `<title>` and `<style>`; `<body>` holds what visitors see.",
 "Give every page a unique title (Home, Cottages, Boat Rentals...).",
 "Submission habits: save with the right file name, check image paths, test every link."]],
["Text", "Text and paragraphs", [
 "Wrap body copy in `<p>`. Use `<strong>`/`<em>` for emphasis and `<br>` for line breaks.",
 "Headings run `<h1>` to `<h6>`; one `<h1>` per page.",
 "Avoid deprecated `<font>` and `align`; style with CSS.",
 "Use `&copy;` for the copyright symbol."]],
["Images", "Images", [
 "`<img src=\"Cottage.jpg\" alt=\"A rustic wooden cottage in the woods\">`",
 "`src` = where the file is. `alt` = description for accessibility and failed loads.",
 "Align left with `float: left` (old: `align=\"left\"`).",
 "Wrap in `<a>` to make a clickable thumbnail."]],
["Lists", "Lists", [
 "`<ul>` = bullets, `<ol>` = numbers; both contain `<li>` items.",
 "Use `<ol>` only when order matters.",
 "Put `<p>` around paragraphs, but keep lists outside paragraphs."]],
["Links", "Hyperlinks", [
 "`<a href=\"cottages.html\">Cottages</a>` is a relative link; a full URL is external.",
 "Site map: index (Home), cottages, boats (Boat Rentals), events (Things to Do), about (About Us).",
 "External links use `target=\"_blank\"` to open in a new tab (Parry Sound link).",
 "Link colours: link, visited, active (`link`, `vlink`, `alink` or CSS `a:link`, `a:visited`, `a:active`)."]],
["Tables", "Table layouts (Practice 2.4)", [
 "`<table>` > `<tr>` rows > `<td>` cells. `border=\"1\"` is for debugging only.",
 "Layout: banner row, navigation row, 20% image column + 80% text column, copyright row.",
 "Wrap each preview image in `<a>` so it links to its page.",
 "Tables are for data; modern layout uses CSS."]],
["Flexbox", "Flexbox (Practice 2.5)", [
 "Replace table tags with `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`.",
 "Nav: `display: flex; justify-content: center;`.",
 "Main: `display: flex; gap: 20px;` with sidebar `flex: 0 0 20%;` and text `flex: 1;`.",
 "Put CSS in an internal `<style>` tag instead of inline attributes."]],
];
