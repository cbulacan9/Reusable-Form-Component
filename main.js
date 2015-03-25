function start(){
	var newButton = document.getElementById("new-list");
	newButton.addEventListener("click", function(e) {
		var form = new Form;
		form.create();
	})

	// PERSIST DATA ON REFRESH AND SUBMIT
	if(localStorage.length > 0) {
		for(var x in localStorage) {
			var form = new Form();
			form.create(localStorage[x].split(','));
		}
	} else {
		var form = new Form();
		form.create();
	}
};

window.onload = start;