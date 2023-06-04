import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './formStyling.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Pbook = () => {
//editModal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

//addNewModal
    const [showNew, setShowNew] = useState(false);
    const handleCloseNew = () => setShowNew(false);
    const handleShowNew = () => setShowNew(true);

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
    const[editCity, setEditCity] = useState('');
    const[editCountry, setEditCountry] = useState('');
    const[editEmail, setEditEmail] = useState('');
    const[editPhoneNumber, setEditPhoneNumber] = useState('');

    const contactsData=[

    ]


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
        getData();
    },[])

//funksioni per marrjen e te dhenave
    const getData = () =>{
      axios.get('http://localhost:5109/api/Contacts')
      .then((result)=>{
        setData(result.data)
      })
      .catch((error)=>{
        console.log(error);
      })
    }

//butoni per hapjen e modalit per shtim te kontaktit.
const handleAddNew =(id)=>{
    handleShowNew();
}

//nutoni per shtim te kontaktit
const handleSave=()=>{
  const url = 'http://localhost:5109/api/Contacts';
  const data = {
    "name": name,
    "lastName": lastName,
    "address": address,
    "city": city,
    "country": country,
    "email": email,
    "phoneNumber": phoneNumber
  }

  axios.post(url, data)
  .then((result)=>{
    handleCloseNew();
    getData();
    clear();
    toast.success('Contact has been added.')
  }).catch((error)=>{
    toast.error(error);
  })
}
//funksioni per fshirjen e te gjitha fushave pas shtimit ose editimit te kontaktit
const clear =()=>{
  setName('');
  setLastName('');
  setAddress('');
  setCity('');
  setCountry('');
  setEmail('');
  setPhoneNumber('');

  setEditName('');
  setEditLastName('');
  setEditAddress('');
  setEditCity('');
  setEditCountry('');
  setEditEmail('');
  setEditPhoneNumber('');
  setEditId('');
}

{/*funksioni per editim */}
    const handleEdit =(id)=>{
        handleShow();
        axios.get(`http://localhost:5109/api/Contacts/${id}`)
        .then((result)=>{
          setEditName(result.data.name);
          setEditLastName(result.data.lastName);
          setEditAddress(result.data.address);
          setEditCity(result.data.city);
          setEditCountry(result.data.country);
          setEditEmail(result.data.email);
          setEditPhoneNumber(result.data.phoneNumber);
          setEditId(id);
        }).catch((error)=>{
          console.log(error)
        })
    }

{/*funksioni per fshirje */}
    const handleDelete =(id)=>{
        if(window.confirm("Do you want to delete this contact?") == true){
            axios.delete(`http://localhost:5109/api/Contacts/${id}`)
            .then((result)=>{
              if(result.status == 200)
              {
                toast.success('Contact has been deleted successfully.')
                getData();
              }
            }).catch((error)=>{
              toast.error(error);
            })
            
        }
    }

    const handleUpdate = () =>{
        const url = `http://localhost:5109/api/Contacts/${editId}`;
        const data = {
          "id": editId,
          "name": editName,
          "lastName": editLastName,
          "address": editAddress,
          "city": editCity,
          "country": editCountry,
          "email": editEmail,
          "phoneNumber": editPhoneNumber
        }

         axios.put(url, data)
         .then((result)=>{
          handleClose();
         getData();
         clear();
         toast.success('Contact has been edited.')
         }).catch((error)=>{
         toast.error(error);
         })
        }

    return(
        <Fragment>
          <ToastContainer/>
        <header>
            <h1>Phone Book</h1>
        </header>
            <Table striped bordered hover size="sm">
      <thead>
       
                <Button className="btn btn-primary" onClick={()=>handleAddNew()}>New Contact</Button>

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
      {/*editModal*/}
    </Table>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editing...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <th>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Name..." value={editName} onChange={(e)=> setEditName(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Last Name..." value={editLastName} onChange={(e)=> setEditLastName(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Address..." value={editAddress} onChange={(e)=> setEditAddress(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="City..." value={editCity} onChange={(e)=> setEditCity(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Country..." value={editCountry} onChange={(e)=> setEditCountry(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Email..." value={editEmail} onChange={(e)=> setEditEmail(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Phone..." value={editPhoneNumber} onChange={(e)=> setEditPhoneNumber(e.target.value)}/>
          </tr>
        </th>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/*AddNewModal*/}
      <Modal show={showNew} onHide={handleCloseNew}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <th>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Name..." value={name} onChange={(e)=> setName(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Last Name..." value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Address..." value={address} onChange={(e)=> setAddress(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="City..." value={city} onChange={(e)=> setCity(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Country..." value={country} onChange={(e)=> setCountry(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Email..." value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </tr>
          <tr>
          <input type="text" className="form-control m-2" placeholder="Phone..." value={phoneNumber} onChange={(e)=> setPhoneNumber(e.target.value)}/>
          </tr>
        </th>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseNew}>
            Close
          </Button>
          <Button variant="primary" onClick={()=> handleSave()}>
            New Contact
          </Button>
        </Modal.Footer>
      </Modal>
            </Fragment>

    )
}

export default Pbook