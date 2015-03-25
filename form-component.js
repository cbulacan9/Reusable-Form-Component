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
		var submitText = document.createTextNode("Submit")
		var removeForm = document.createElement("button");
		//ELEMENT PROPERTIES
		this.form.setAttribute('action', '/');
		this.form.setAttribute('method', 'POST');
		removeForm.setAttribute("class", "remove-form");
		removeForm.setAttribute("type", "button");
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
		// ADD ANY PREVIOUS DATA
		if (newList) {
			newList.forEach(function(e){self.list(e)});
		}
		// FUNCTIONALITY
		removeForm.addEventListener("click", this.remove.bind(this));
		this.listInput.addEventListener("keypress", this.add.bind(this));
		this.addButton.addEventListener("click", this.add.bind(this));
		this.submitButton.addEventListener("click", this.submit.bind(this));
		this.form.addEventListener("click", this.focus.bind(this));
	}

	Form.prototype.add = function(e) {
		switch(e.type) {
			case 'keypress':
				if(e.keyCode === 13) {
					console.log(this.listInput.value);
					e.preventDefault();
					localStorage.clear();
					this.list(this.listInput.value);
					this.save();
				}
				break;
			case 'click':
				localStorage.clear();
				this.list(this.listInput.value);
				this.save();
				break;
		}
	}

	Form.prototype.list = function(input) {
		if (!input.length) {
			alert('Please enter a something!');
		} else {
			var itemText = document.createTextNode(input);
			// CREATE ELEMENTS
			var itemSpan = document.createElement("span");
			var itemInput = document.createElement("input");
			var listItem = document.createElement("li");
			var removeButton = document.createElement("button");
			var removeText = document.createTextNode("x");
			// SET ATTRIBUTES
			removeButton.setAttribute("type", "button");
			removeButton.setAttribute("class", "remove-item");
			itemSpan.setAttribute("class", "view");
			itemInput.setAttribute("class", "view");
			itemInput.setAttribute("type", "text");
			itemInput.setAttribute("name", "item[]");
			itemInput.setAttribute("value", input);
			// ADD TO PAGE
			removeButton.appendChild(removeText);
			itemSpan.appendChild(itemText);
			listItem.appendChild(removeButton);
			listItem.appendChild(itemInput);
			listItem.appendChild(itemSpan);
			this.listItems.appendChild(listItem);
			// FUNCTIONALITY
			this.listInput.value = "";
			removeButton.addEventListener("click", this.remove);
			listItem.addEventListener("dblclick", this.edit.bind(this, itemSpan, itemInput));
			itemInput.addEventListener("keypress", this.edit.bind(this, itemSpan, itemInput));
		}
	}

	Form.prototype.edit = function(span, input, e) {
		switch(e.type) {
			case 'keypress':
				if(e.keyCode === 13) {
					e.preventDefault();
					var itemText = document.createTextNode(input.value);
					span.removeChild(span.childNodes[0]);
					span.appendChild(itemText);
					span.removeAttribute('class');
					input.setAttribute("value", input.value);
					input.removeAttribute('class');
					span.setAttribute('class', 'view');
					input.setAttribute('class', 'view');
				}
				break;
			case 'dblclick':
				e.preventDefault();
				span.removeAttribute('class');
				input.removeAttribute('class');
				span.setAttribute('class', 'edit');
				input.setAttribute('class', 'edit');
				break;
		}
	}

	Form.prototype.remove = function(e) {
		e.preventDefault();
		localStorage.clear();
		var remove = e.target.parentNode;
		remove.parentNode.removeChild(remove);
		console.log(this);
		this.save();
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
		console.log(e);
		e.preventDefault();
		var form = e.target.parentNode;
		var listItems = e.target.form.children[3].children;
		if(listItems.length > 0) {
			form.parentNode.removeChild(form);
			localStorage.clear();
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
			if(forms[i].elements['item[]']){
				switch(!forms[i].elements['item[]'].length) {
					case false:
						for(j=0; j<forms[i].elements['item[]'].length; j++) {
							serialList.push(forms[i].elements['item[]'][j].value);
						}
						localStorage.setItem(i, serialList);
						break;
					case true:
						serialList.push(forms[i].elements['item[]'].value);
						localStorage.setItem(i, serialList);
						break;
				}
			}
		}
	}

})();
