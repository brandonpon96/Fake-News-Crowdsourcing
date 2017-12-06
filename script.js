var db = firebase.database().ref();
var articleData = [];

function populate(snapshot) {
  articleData = snapshot;
  console.log(articleData);
}
db.once('value', snap => populate(snap.val()));