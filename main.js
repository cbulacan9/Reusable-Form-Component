(function(){

	window.Form = function() {
		// FORM ELEMENTS
		this.form = document.createElement("form");
		this.listInput = document.createElement("input");
		this.listItems = document.createElement("ul");
		this.addButton = document.createElement("button");
		this.submitButton = document.createElement("button");
	}

	Form.prototype.create = function(newList) {
		var self = this;
		var addText = document.createTextNode("+")
		var removeText = document.createTextNode("x")
		var submitText = document.createTextNode("Submit")
		var removeForm = document.createElement("button");
		//ELEMENT PROPERTIES
		this.form.setAttribute('action', '/');
		this.form.setAttribute('method', 'POST');
		removeForm.setAttribute("class", "remove-form");
		removeForm.setAttribute("type", "button");
		removeForm.appendChild(removeText);
		this.listInput.setAttribute("class", "add-input");
		this.addButton.appendChild(addText);
		this.addButton.setAttribute("type", "button");
		this.addButton.setAttribute("class", "add");
		this.submitButton.appendChild(submitText);
		this.submitButton.setAttribute("type", "submit");
		this.submitButton.setAttribute("class", "submit");
		this.listInput.setAttribute("placeholder", "Enter list item here.");
		//ADD TO PAGE
		var listSection = document.getElementById('list-section');
		var form = listSection.appendChild(this.form);
		form.appendChild(removeForm);
		form.appendChild(this.listInput);
		form.appendChild(this.addButton);
		form.appendChild(this.listItems);
		form.appendChild(this.submitButton);
		if (newList) {
			newList.forEach(function(e){self.list(e)});
		}
		// FUNCTIONALITY
		removeForm.addEventListener("click", this.remove);
		this.listInput.addEventListener("keypress", this.add.bind(this));
		this.addButton.addEventListener("click", this.add.bind(this));
		this.submitButton.addEventListener("click", this.submit.bind(this));
		this.form.addEventListener("click", this.focus.bind(this));
	}

	Form.prototype.add = function(e) {
		switch(e.type) {
			case 'keypress':
				if(e.keyCode === 13) {
					e.preventDefault();
					this.list(this.listInput.value);
				}
				break;
			case 'click':
				this.list(this.listInput.value);
				break;
		}
	}

	Form.prototype.list = function(input) {
		if (!input.length) {
			alert('Please enter a something!');
		} else {
			var itemText = input;
			// CREATE ELEMENTS
			var itemInput = document.createElement("input");
			var listItem = document.createElement("li");
			var removeButton = document.createElement("button");
			var removeText = document.createTextNode("x");
			// SET ATTRIBUTES
			removeButton.setAttribute("type", "button");
			removeButton.setAttribute("class", "remove-item");
			itemInput.setAttribute("class", "list-item");
			itemInput.setAttribute("type", "text");
			itemInput.setAttribute("name", "item[]");
			itemInput.setAttribute("value", itemText);
			itemInput.setAttribute("readonly", "readonly");
			// ADD TO PAGE
			removeButton.appendChild(removeText);
			listItem.appendChild(removeButton);
			listItem.appendChild(itemInput);
			this.listItems.appendChild(listItem);
			// FUNCTIONALITY
			this.listInput.value = "";
			removeButton.addEventListener("click", this.remove);
		}
	}

	Form.prototype.remove = function(e) {
		e.preventDefault();
		var remove = e.toElement.parentNode;
		remove.parentNode.removeChild(remove);
	}

	Form.prototype.focus = function() {
		if(this.form.getAttribute('class') == null) {
			var forms = document.getElementsByTagName('form');
			for(i=0; i < forms.length; i++) {
				forms[i].removeAttribute('class');
			}
			this.form.setAttribute('class', 'selected');
		}
	}

	Form.prototype.submit = function(e) {
		e.preventDefault();
		var form = e.toElement.parentNode;
		var listItems = e.toElement.form.children[3].children;
		console.log(listItems);
		if(listItems.length > 0) {
			localStorage.clear();
			form.parentNode.removeChild(form);
			this.save();
			form.submit();

		} else {
			alert('Nothing to submit!');
		}
	}

	Form.prototype.save = function() {
		var forms = document.getElementsByTagName('form');
		for(i=0; i<forms.length; i++) {
			var serialList = [];
			if(forms[i].elements['item[]']) {
				for(j=0; j<forms[i].elements['item[]'].length; j++) {
					serialList.push(forms[i].elements['item[]'][j].value);
				}
				localStorage.setItem(i, serialList);
			}
		}
	}

	var newButton = document.getElementById("new-list");
	newButton.addEventListener("click", function(e) {
		var form = new Form;
		form.create();
	})

	for(var x in localStorage) {
		if(localStorage){
			var form = new Form();
			form.create(localStorage[x].split(','));
		} else {
			form.create();
		}
	}
	
})();
