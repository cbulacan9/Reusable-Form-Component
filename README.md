#TripleLift - Reusable Form Component

####To start: 
```javascript
sudo npm install
```
```javascript
npm start
```

###Coding Challenge Prompt
Design a reusable form component that meets the following requirements:

1. The initial state should be an empty input box, and an ADD button.
2. If the user enters input text to the box, clicking ADD should add that text to a list.
3. There should be a way to delete a list element.
4. On form submit, the list elements should be submitted as an array.
5. You should be able to have more than one component per page.

Please use only straight HTML, CSS, and Javascript. Do not use any CSS frameworks or external Javascript libraries.

Feel free to include additional interactions as you see fit. Style to taste. Have fun!

###COMMENTS
- Added express server, to handle POST request.
- Used html5 localStorage to persist data.
- Will only persist lists with any un-submitted lists and saved data on refresh and form.submit().

Interactions
- Can add items to the list ('enter key on input or using + button')
- Can edit items in the list ('double click on list item')
- Can save changes ('enter key inside input')
- Can remove list items.
- Can remove whole list.
- Can submit array of items with form data on POST request.