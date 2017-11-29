/* 
 * This version has some fixes such us: 
 *	- default password length = 16; 
 *	- at least one special symbol always;
 * 
 * Contributors: Alexey Gribov, 2017
 * Distributed under the BSD License
 */

/* PwdHash-PoC
 * Version of PwdHash amended to fix various flaws in the original implementation
 * This version uses PBKDF2-SHA256 and allows control over the user-specified salt
 * and iteration count.
 * Version 0.1 Copyright (C) Cambridge University 2016
 * Contributors: David Llewellyn-Jones, Graham Rymer
 * Distributed under the BSD License
 */

/*
 * Remote PwdHash
 * A JavaScript implementation of the PwdHash hashing algorithm.
 * Version 1.0 Copyright (C) Stanford University 2004-2006
 * Author: Collin Jackson
 * Other Contributors: Dan Boneh, John Mitchell, Nick Miyake, and Blake Ross
 * Distributed under the BSD License
 * See http://crypto.stanford.edu/PwdHash for more info.
 * Requires the Javascript MD5 library, available here: http://pajhome.org.uk/crypt/md5
 */

/*
 * Initialize page with default hashing parameters.
 */
function Init() {
  document.hashform.domain.value = "http://www.example.com/";
  document.hashform.sitePassword.value = "";
  document.hashform.hashedPassword.value = "Press Generate";
  document.hashform.hashedPassword.disabled = true;
  LoadConfig();
}

var SPH_kPasswordPrefix = "@@";

/*
 * Returns a conforming hashed password generated from the form's field values.
 */
function Generate()
{
  StoreConfig();
  var salt = document.hashform.salt.value;
  var iterations = Number(document.hashform.iterations.value);
  var uri = document.hashform.domain.value;
  var domain = (new SPH_DomainExtractor()).extractDomain(uri);
  var size = SPH_kPasswordPrefix.length;
  var data = document.hashform.sitePassword.value;
  if (data.substring(0, size) == SPH_kPasswordPrefix)
    data = data.substring(size);
  var result = new String(new SPH_HashedPassword(data, domain, salt, iterations));
  return result;
}

/*
 * Obtain a conforming hashed password and put it in the hashed password field
 */
function GenerateToTextField()
{
  document.hashform.hashedPassword.value = Generate();
// document.hashform.hashedPassword.select();
  //document.hashform.hashedPassword.setAttribute("type", "password");
  
document.hashform.hashedPassword.disabled = false;
}

function StoreConfig()
{
	if (typeof(Storage) !== "undefined") {
		localStorage.salt = document.hashform.salt.value;
		localStorage.iterations = Number(document.hashform.iterations.value);
	}
}

function LoadConfig()
{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.salt && localStorage.salt.length > 0) {
			document.hashform.salt.value = localStorage.salt;
		}
		else {
			document.hashform.salt.value = "User_Salt";
		}

		if (localStorage.iterations && Number(localStorage.iterations) > 0) {
			document.hashform.iterations.value = Number(localStorage.iterations);
		}
		else {
			document.hashform.iterations.value = 10000;
		}
	}
}


function reveal_pass(check_box){
    if(document.hashform.reveal.checked.checked)	
   	 document.hashform.hashedPassword.setAttribute("type", "text");
    else
	 document.hashform.hashedPassword.setAttribute("type", "password");

}

