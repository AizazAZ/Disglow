<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>DISGLOW</title>
  <meta name="description" content="The HTML5 Herald">
  <meta name="author" content="SitePoint">

  <script type="text/javascript" src="//use.typekit.net/qls3yzb.js"></script>
  <script type="text/javascript">try{Typekit.load();}catch(e){}</script>

  <link rel="stylesheet" href="{{ cdn('css/styles.css') }}">
</head>

<body>
	<div id="container">
<div class="header">
	<a href="/"><img src="{{ cdn('images/logo.png') }}" class="logo"></a>

	<ul class="login">
		<li><a href="/">Login</a></li>
		<li><a href="/">Register</a></li>
	</ul>


</div>

<div class="section first">
	<h1>A big headline goes here and has a <a href="/">link style</a></h1>
</div>

<div class="section second">
	<h2 class="filter">Section Title with filter</h2>

	<div class="dropdown">Filter: <select>
  <option>Nearest First</option>
  <option>Most Popular</option>
  <option>Most Recent</option>
</select></div>

<div class="party-preview">
	<div class="party-colour"></div>
		<div class="party-info"> 
		<h4><a href="/">Party Name</a></h4>
<img src="{{ cdn('images/playing.gif') }}" class="playing"> Currently Playing: Track name goes here <BR>
Created by: <a href="/">Username</a>
		</div>
		<div class="button"><a href="/">Button Style</a></div>

	</div></div>


<div class="section third">
	<h2>Section Title</h2>

<form action="contact.php" method="post">
    Your name<br>
    <input type="text" name="cf_name"><br>
    Your e-mail<br>
    <input type="text" name="cf_email"><br>
    Message<br>
    <textarea name="cf_message"></textarea><br>



<input type="submit" value="Send">
<input type="reset" value="Clear">
</form>




</div>



<div class="section second">
<h3>Big copy like this: Share your music experience with others live.</h3>
<h3>Listen together with any internet-enabled device.</h3>






</div>



</div>


<footer>

<a href="http://retrofuzz.com" target="_Blank"><img src="{{ cdn('images/rfz.png') }}" class="rfz"></a>
</footer>



</body>
</html>