var db = firebase.database().ref();
var articleData = [];

function populate(snapshot) {
  articleData = snapshot["articles"];
  console.log(articleData);
}
db.once('value', snap => populate(snap.val()));

//article is article number, opinion is 0 for yes, 1 for no
function UpdateData(article, opinion) {
	index = opinion == "Real" ? '0' : '1';
	var databaseRef = firebase.database().ref('articles').child(article).child(index);
	databaseRef.transaction(function(value) {
	  if (value) {
	    value = value + 1;
	  }
	  return value;
	});
}

function ButtonClick(item, opinion) {
  var x =  $( item ).parent().children();
  num = $(item).attr('id');
  x.show();
  numerator = opinion === "Real" ? articleData[num][0] : articleData[num][1];
  total = articleData[num][0] + articleData[num][1];
  console.log(articleData[num]);
  x[3].innerHTML = "<div class='percentage'>" + parseInt(numerator/total * 100) + 
  	"%</div>Also chose " + opinion + " out of " + total + " votes";
  console.log(x[3].innerHTML);
  $(item).hide();
  UpdateData(num, opinion);
}
$(".real").click(function() {
	ButtonClick($( this ).parent(), 'Real');
	var x =  $( this ).parent().attr('id');
});
$(".fake").click(function() {
	ButtonClick($( this ).parent(), 'Fake');
	var x =  $( this ).parent().attr('id');
});