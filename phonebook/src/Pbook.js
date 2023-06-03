import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './formStyling.css';



const Pbook = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//addContanctVariables
    const[name, setName] = useState('');
    const[lastName, setLastName] = useState('');
    const[address, setAddress] = useState('');
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');
    const[email, setEmail] = useState('');
    const[phoneNumber, setPhoneNumber] = useState('');

//editContactVariables
    const[editId, setEditId] =useState('');
    const[editName, setEditName] = useState('');
    const[editLastName, setEditLastName] = useState('');
    const[editAddress, setEditAddress] = useState('');
    const[editity, setEditCity] = useState('');
    const[editCountry, setEditCountry] = useState('');
    const[editEmail, setEditEmail] = useState('');
    const[editPhoneNumber, setEditPhoneNumber] = useState('');


    const contact = [
        {
            id : 2,
            name : 'Besart',
        lastName : 'Zeqiri',
        address : 'Ilmi Bahtiri',
        city : 'Prishtine',
        country : 'Kosove',
        email : 'besartzeqiri54@gmail.com',
        phoneNumber : '04552440'
    },
    {
        
        id : 1,
        name : 'Ariana',
    lastName : 'Zeqiri',
    address : 'Ilmi Bahtiri',
    city : 'Prishtine',
    country : 'Kosove',
    email : 'arianazeqiri34@gmail.com',
    phoneNumber : '04552440'
}
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(contact);
    },[])

    //butoni per shtim te kontakteve
    const handleadd =(id)=>{
        //alert(id);
        handleShow();
    }

{/*butoni per editim */}
    const handleEdit =(id)=>{
        //alert(id);
        handleShow();
    }

{/*butoni per fshirje */}
    const handleDelete =(id)=>{
        if(window.confirm("Do you want to delete this contact?") == true){
            alert(id);
        }
    }

    const handleUpdate = () =>{
        
    }

    return(
        <Fragment>
        <header>
            <h1>Phone Book</h1>
        </header>

             {/*<Container>
                <Row>
                    <Col xs={6} md={4}>
                       <input type="text" className="form-control" placeholder="Name..."/>
                    </Col>
                    <Col xs={6} md={4}>
                       <input type="text" className="form-control" placeholder="Last Name..."/>
                    </Col>
                    <Col xs={6} md={4}>
                       <input type="text" className="form-control" placeholder="Address..."/>
                    </Col>
          </Row>
    </Container>*/}

            <Table striped bordered hover size="sm">
      <thead>
        <Button className="btn btn-primary">New Contact</Button>
        <tr>
          <th>Name</th>
          <th>LastName</th>
          <th>Address</th>
          <th>City</th>
          <th>Country</th>
          <th>Email</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length > 0 ?
            data.map((item, index) => {
                return(
                    <tr key={index}>
                       <td>{item.name}</td>
                       <td>{item.lastName}</td>
                       <td>{item.address}</td>
                       <td>{item.city}</td>
                       <td>{item.country}</td>
                       <td>{item.email}</td>
                       <td>{item.phoneNumber}</td>
                       {/*dy butonat */}
                       <td colSpan={2}>
                        <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button>
                        <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                       </td>
                    </tr>
                )
            })
            :
            'Loading...'
        }
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <th>
          <tr>
          <input type="text" className="form-control " placeholder="Name..."/>
          </tr>
          <tr>
          <input type="text" className="form-control" placeholder="Last Name..."/>
          </tr>
          <tr>
          <input type="text" className="form-control" placeholder="Address..."/>
          </tr>
          <tr>
          <input type="text" className="form-control" placeholder="City..."/>
          </tr>
          <tr>
          <input type="text" className="form-control" placeholder="Country..."/>
          </tr>
          <tr>
          <input type="text" className="form-control" placeholder="Email..."/>
          </tr>
          <tr>
          <input type="text" className="form-control" placeholder="Phone..."/>
          </tr>
        </th>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </Fragment>

    )
}

export default Pbook