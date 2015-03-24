(function(){

	window.Form = function() {

		var self = this;
		var submission = [];

		// FORM ELEMENTS
		self.form = document.createElement("form");
		self.listInput = document.createElement("input");
		self.list = document.createElement("ul");
		self.addButton = document.createElement("button");
		self.submitButton = document.createElement("button");

		//ELEMENT PROPERTIES
		var addText = document.createTextNode("+")
		var submitText = document.createTextNode("Submit")
		self.addButton.appendChild(addText);
		self.addButton.setAttribute("type", "button");
		self.addButton.setAttribute("class", "add");
		self.submitButton.appendChild(submitText);
		self.submitButton.setAttribute("type", "submit");
		self.submitButton.setAttribute("class", "submit");
		self.listInput.setAttribute("placeholder", "Enter list item here.");

		self.listInput.addEventListener("keypress", function(e) {
			if(e.keyCode === 13) {
				e.preventDefault();
				self.add();
			}
		});

		self.addButton.addEventListener("click", function(e) {
			e.preventDefault();
			self.add();
		});

		self.submitButton.addEventListener("click", function(e) {
			e.preventDefault();
			self.submit(e);
		});
		// FORM METHODS
		self.create = function() {
			var form = document.body.appendChild(self.form);
			form.appendChild(self.listInput);
			form.appendChild(self.addButton);
			form.appendChild(self.list);
			form.appendChild(self.submitButton);
		}

		self.add = function() {
			var itemText = document.createTextNode(self.listInput.value);

			if(itemText.length > 0) {
				var itemSpan = document.createElement("span");
				var listItem = document.createElement("li");
				var removeButton = document.createElement("button");
				var removeText = document.createTextNode("x");
				removeButton.setAttribute("type", "button");
				removeButton.setAttribute("class", "remove-item");
				itemSpan.setAttribute("class", "list-item");
				itemSpan.id = "list-item";

				removeButton.appendChild(removeText);
				itemSpan.appendChild(itemText);
				listItem.appendChild(removeButton);
				listItem.appendChild(itemSpan);
				self.list.appendChild(listItem);

				self.listInput.value = "";
				removeButton.addEventListener("click", self.remove);
			} else {
				alert('Please enter a something!');
			}
		}

		self.remove = function(e) {
			e.preventDefault();
			var listItem = e.toElement.parentNode;
			listItem.parentNode.removeChild(listItem);
		}

		self.submit = function(e) {
			var form = e.toElement.parentNode;
			var listItems = e.toElement.form.children[2].children;
			if(listItems.length > 0) {
				submission = [];
				for(i=0; i < listItems.length; i++) {
					submission.push(listItems[i].children[1].textContent);
				}
				console.log(submission);
				form.parentNode.removeChild(form);
			} else {
				alert('Nothing to submit!');
			}
		}

		self.form.addEventListener("click", function(e) {
			var forms = document.getElementsByTagName('form');
			for(i=0; i < forms.length; i++) {
				forms[i].setAttribute('class', '');
			}
			self.form.setAttribute('class', 'selected');
		})

	} 	

	var newButton = document.getElementById("new-form");
	newButton.addEventListener("click", function(e) {
		var form = new Form;
		form.create();
	})

	var form = new Form();
	form.create();
	
})();
