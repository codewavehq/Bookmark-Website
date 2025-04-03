let submit = document.getElementById("submit-button");
let cancel_btn = document.getElementById('cancel-button');

let url_input = document.getElementById("url-input");
let name_input = document.getElementById("name-website-input");
let tag_input = document.getElementById("tags-input");

// Load bookmarks when page loads
document.addEventListener('DOMContentLoaded', loadBookmarks);

// Add keypress event listener to the input fields
url_input.addEventListener('keypress', handleKeyPress);
name_input.addEventListener('keypress', handleKeyPress);
//tag_input.addEventListener('keypress', handleKeyPress);

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submit_button_function(); // Call the function when Enter is pressed
    }
}

// Add click event listener to the submit button
submit.addEventListener('click', submit_button_function);
cancel_btn.addEventListener('click', cancel_btn_function);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        cancel_btn_function(); // Call the cancel button function when Escape is pressed
    }
});

function submit_button_function() {
    // Validate inputs
    if (url_input.value.trim() === '' || name_input.value.trim() === '') {
        alert('Enter the URL or Name Please');
        return;
    }

    // Create bookmark object
    const bookmark = {
        name: name_input.value,
        url: url_input.value,
       // tags: tag_input.value
    };

    // Get bookmarks from localStorage
    let bookmarks = getBookmarks();

    // Add new bookmark
    bookmarks.push(bookmark);

    // Save to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Create bookmark element
    createBookmarkElement(bookmark);

    // Clear input fields
    url_input.value = "";
    name_input.value = "";
    //tag_input.value = "";
}

// Get bookmarks from localStorage
function getBookmarks() {
    let bookmarks = localStorage.getItem('bookmarks');
    
    // If no bookmarks exist, return empty array
    if (!bookmarks) {
        return [];
    }
    
    // Parse JSON string to array
    return JSON.parse(bookmarks);
}

// Create bookmark element and add to list
function createBookmarkElement(bookmark) {
    let li = document.createElement('li');
    let a = document.createElement('a');

    a.setAttribute('target', '_blank');
    a.textContent = bookmark.name;
    a.setAttribute('class', 'bookmark-name');
    a.setAttribute('href', bookmark.url);

    li.appendChild(a);

    // Add delete button
    let deleteBtn = document.createElement('button');
    
   
    deleteBtn.setAttribute('class', 'delete-btn');
    deleteBtn.setAttribute('style', 'margin-left: 10px;');
    deleteBtn.style.display = 'none'

    // Add delete icon 
    let deleteIcon = document.createElement('img')
    deleteIcon.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAr0lEQVRIS2NkoDFgpLH5DIQs8Ac6oAOINXA45DpQvASIt+FyKCELXgA1ihPw5T2gvDK5FvyHasTlEELyBIOIkAGE5DEsgGmgNO7hPkb3Os0tgLmcoNfRvIhTPdmRR20L0F1IiA+3n1gfEDKQ4iAatQAjX5EaJKNxQLBoojiICNlAsgUPgSbKETIVTf4BkK+IrgdXTgZVlZ1ArE6kJZeA6iqxVZ2EqkwizcetjOYWAABQeTgZ9V2lcwAAAABJRU5ErkJggg==')
    
    //Styling the delte button
    deleteBtn.style.backgroundColor = 'transparent';
    deleteBtn.style.border = 'none';
    deleteBtn.style.padding = '0';
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.style.width = '30px';
    deleteBtn.style.height = '30px';
    deleteBtn.style.zIndex = '1000';
    deleteBtn.style.outline = 'none';
    deleteBtn.style.position = 'relative';
    
    deleteBtn.appendChild(deleteIcon);


    // Delete button event listener
    deleteBtn.addEventListener('click', function() {
        deleteBookmark(bookmark);
        li.remove();        
    });
    deleteBtn.addEventListener('mouseover', function()
    {
        deleteBtn.style.animation = 'shake 0.5s ease-in-out';
    });
    deleteBtn.addEventListener('mouseout', function()
    {
        
    });

    li.addEventListener('mouseenter', function() {
        deleteBtn.style.display = 'inline-block';
    });

    li.addEventListener('mouseleave', function() {
        deleteBtn.style.display = 'none';


    });

    

    li.appendChild(deleteBtn);

    // If tags exist, add them
   /*if (bookmark.tags) {
        let tagsSpan = document.createElement('span');
        tagsSpan.textContent = ' [' + bookmark.tags + ']';
        tagsSpan.setAttribute('style', 'color: gray; font-size: 0.9em;');
        li.appendChild(tagsSpan);
    }*/

    let ul = document.getElementById('bookmark-list-ul');
    ul.appendChild(li);
}

// Load bookmarks from localStorage
function loadBookmarks() {
    const bookmarks = getBookmarks();
    
    // Create elements for each bookmark
    bookmarks.forEach(bookmark => {
        createBookmarkElement(bookmark);
    });
}

// Delete bookmark
function deleteBookmark(bookmarkToDelete) {
    let bookmarks = getBookmarks();
    
    // Filter out the bookmark to delete
    bookmarks = bookmarks.filter(bookmark => 
        bookmark.url !== bookmarkToDelete.url || 
        bookmark.name !== bookmarkToDelete.name
    );
    
    // Save updated bookmarks back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function cancel_btn_function() {
    // Clear input fields
    url_input.value = '';
    name_input.value = '';
    //tag_input.value = '';

    // Hide the cancel button
}
