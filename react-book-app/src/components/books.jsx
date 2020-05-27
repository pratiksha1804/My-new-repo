import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import Axios from 'axios';
import { Input,FormGroup,Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class MyBook extends Component {
    state={
          books:[],
          newBookData:{
              id:0,
              title:'',
              rating:''
            },
            editBookData:{
                id:0,
                title:'',
                rating:''
              },
              deleteBookData:{
                id:0,
               
              },
          newBookModal:false,
          editBookModal:false
        }
        componentWillMount()
        {
          this._refreshBooks();
        }
        _refreshBooks()
        {
            Axios.get("http://localhost:3001/api/getBooks").then((response)=>
          {
            this.setState({
              books:response.data
            })
           
           
          });
        }
        toggleNewBookModal()
        { 
            this.setState({
                newBookModal:!this.state.newBookModal
            })
            // this.state.newBookModal=true;
        }
        toggleEditBookModal()
        { 
            this.setState({
                editBookModal:!this.state.editBookModal
            })
        }
    
        addBook()
        {
    
            Axios.post("http://localhost:3001/api/CreateBooks",this.state.newBookData).then((response)=>{
                let {books}=this.state;
                // books.push(response.data);
                
                this.setState({books,newBookModal:false,newBookData:{
                    id:0,
                    title:'',
                    rating:''
                  }})
                  this._refreshBooks();
            })
            
        }
        editBook(id,title,rating)
        {
           this.setState({
               editBookData :{id,title,rating},
               editBookModal:!this.state.editBookModal
           })
           
        }
        updateBook()
        {
            Axios.put("http://localhost:3001/api/UpdateBooks",this.state.editBookData).then((response)=>{
                let {books}=this.state
                this.setState({books,editBookModal:false})
                this._refreshBooks();
            })
          
        }
       
        deleteBook(id)
        {
            console.log(id)
           
         console.log("hhdhh",this.state.deleteBookData)
           Axios.delete("http://localhost:3001/api/DeleteBooks?id="+id).then((response)=>
           {
              
                let {books}=this.state
                this.setState({books})
                this._refreshBooks();
                })
        }


    render() { 
        let books=this.state.books.map((book)=>{
            return(
            <tr key={book.Id}>
            <td>{book.Id}</td>
            <td>{book.Title}</td>
            <td>{book.Rating}</td>
            <td>
             <Button color="success" size="sm m-2" onClick={this.editBook.bind(this,book.Id,book.Title,book.Rating)}>Edit</Button>
             <Button color="danger" size="sm m-2" onClick={this.deleteBook.bind(this,book.Id)}>Delete</Button>
            </td>
            </tr> 
            )
        })

        return ( 
            <div className=" MyBook container">
                <h1>Book App</h1>
                 <Button className="my-3" color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
                
                <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)} >
                <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
                <ModalBody>
                <FormGroup>
                <Label for="id">Id</Label>
                <Input type="text" id="id" value={this.state.newBookData.id} onChange={(e)=>{
                    let {newBookData} =this.state;
                    newBookData.id=e.target.value;
                    this.setState({newBookData})
                }}/>
                </FormGroup>
                <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" id="title" value={this.state.newBookData.title} onChange={(e)=>{
                let {newBookData} =this.state;
                newBookData.title=e.target.value;
                this.setState({newBookData})
                }} />
                </FormGroup>
                <FormGroup>
                <Label for="rating">Rating</Label>
                <Input type="text" id="rating" value={this.state.newBookData.rating} onChange={(e)=>{
                    let {newBookData} =this.state;
                    newBookData.rating=e.target.value;
                    this.setState({newBookData})
                }} />
                </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.addBook.bind(this)}>Add</Button>{' '}
                <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
                </ModalFooter>
                </Modal>

                
                <Modal isOpen={this.state.editBookModal} toggle={this.toggleEditBookModal.bind(this)} >
                <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>Edit a book</ModalHeader>
                <ModalBody>
                <FormGroup>
                <Label for="id">Id</Label>
                <Input type="text" id="id" value={this.state.editBookData.id} onChange={(e)=>{
                    let {editBookData} =this.state;
                    editBookData.id=e.target.value;
                    this.setState({editBookData})
                }}/>
                </FormGroup>
                <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" id="title" value={this.state.editBookData.title} onChange={(e)=>{
                let {editBookData} =this.state;
                editBookData.title=e.target.value;
                this.setState({editBookData})
                }} />
                </FormGroup>
                <FormGroup>
                <Label for="rating">Rating</Label>
                <Input type="text" id="rating" value={this.state.editBookData.rating} onChange={(e)=>{
                    let {editBookData} =this.state;
                    editBookData.rating=e.target.value;
                    this.setState({editBookData})
                }} />
                </FormGroup>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.updateBook.bind(this)}>Edit</Button>{' '}
                <Button color="secondary" onClick={this.toggleEditBookModal.bind(this)}>Cancel</Button>
                </ModalFooter>
                </Modal>


     <Table>
       <thead>
         <tr>
           <th>#</th>
           <th>Title</th>
           <th>Ratings</th>
           <th>Actions</th>

         </tr>
       </thead>
       <tbody>
         {books}
       </tbody>
     </Table>
    </div>
);
    }
}
 
export default MyBook;