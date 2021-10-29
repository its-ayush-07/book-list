let storedLocalBooks = []
// Book class to store info
class book{
    constructor(title,author){
        this.title = title;
        this.author = author;
    }
}

// class for handling the UI
class UI{
    static displayBooks() {
        let storedBooksStr = localStorage.getItem('BookList')
        const storedBooks = JSON.parse(storedBooksStr) 
        const books = storedBooks
        if(books !== null)
        books.forEach((book)=> UI.addBooktoList(book))
    }

    static addBooktoList(book){
        const list = document.getElementById("book-list")
        const row = document.createElement("tr")
        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`
        list.appendChild(row)
    }

    static clearFields(){
        document.getElementById("title").value=''
        document.getElementById("author").value=''
    }

    static deleteEntry(el){
        if(el.classList.contains('delete')){
            storage.deleteFromStorage(el.parentElement.parentElement.firstElementChild.innerHTML)
            el.parentElement.parentElement.remove()
        }
    }

    static showAlert(message,className){
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.getElementById("book-form")
        container.insertBefore(div,form)
    }

    static removeAlert(){
        const divDel = document.querySelector('.alert') 
        divDel.remove()
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded',UI.displayBooks())

//Event: Add book
document.getElementById("book-form").addEventListener("submit",(e)=>{
    // Prevent actual submit
    e.preventDefault() 

    // Get form values
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value

    // Validation
    if(title==='' || author===''){
        UI.showAlert("Please fill out all the fields",'danger')
        setTimeout(()=> UI.removeAlert(),3000)
    }
    else{
    // Instantiate book
        const toAddBook = new book(title,author)
    
    // Add Book to UI
    UI.addBooktoList(toAddBook)

    // Store book to Local storage
    storage.addToStorage(toAddBook)    

    // Book add message
    UI.showAlert("Book added",'success')    
    setTimeout(()=> UI.removeAlert(),3000)

    // Clear field
    UI.clearFields()
    }
})

// Deleting entry
document.querySelector("#book-list").addEventListener('click',(e)=>{
    UI.deleteEntry(e.target)
})

// Local Storage

class storage {
    
    static addToStorage(toAddBook){
        let storedLocalBooksStr = localStorage.getItem('BookList')
        if(storedLocalBooksStr !== null){
            storedLocalBooks = JSON.parse(storedLocalBooksStr) 
        }
        
        storedLocalBooks.push({
            title: toAddBook.title,
            author: toAddBook.author
        })
        localStorage.setItem('BookList',JSON.stringify(storedLocalBooks))
    }

    static deleteFromStorage(text){
        let storedLocalBooksStr = localStorage.getItem('BookList')
        const storedLocalBooks = JSON.parse(storedLocalBooksStr)
        const changedArray = storedLocalBooks.filter((sampleBook)=>{
            return (sampleBook.title !== text)
        })
        localStorage.setItem('BookList',JSON.stringify(changedArray)) 
    }
}