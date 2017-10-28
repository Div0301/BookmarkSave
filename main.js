//listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);


//save bookmark
function saveBookmark(e) {
	
//get values from form
var siteName=document.getElementById('siteName').value;
var siteUrl=document.getElementById('siteUrl').value;

if(!validateForm(siteName,siteUrl)){
	return false;
}


var bookmark={
	name:siteName,
	url:siteUrl
}



/*
localStorage.setItem('test','Hello World');
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
*/

//test if bookmark is null, then initialize an array
if(localStorage.getItem('bookmarks')===null){
	var bookmarks=[];
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}else{
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}

document.getElementById('myForm').reset();

fetchBookmarks();

//prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url){
var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

for(var i=0;i<bookmarks.length;i++){
	if(bookmarks[i].url==url){
		bookmarks.splice(i,1);
	}
}
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

fetchBookmarks();
}

function fetchBookmarks(){
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

	var BookmarksResults=document.getElementById('BookmarksResults');

	BookmarksResults.innerHTML='';

	for(var i=0;i<bookmarks.length;i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;

	BookmarksResults.innerHTML += '<div class="well">'+
									'<h3>'+name+
									'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
									'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'
									+ '</h3>' +
									'</div>';		
	}
}

function validateForm(siteName,siteUrl){
	if(!siteName|| !siteUrl){
	alert('Please fill in the form');
	return false;   //to stop
}

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

if(!siteUrl.match(regex)){
	alert('Please add a valid url');
	return false;
}
return true;
}