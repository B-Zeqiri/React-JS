import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Pbook = () => {

        

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

{/*butoni per editim */}
    const handleEdit =(id)=>{
        alert(id);
    }

{/*butoni per fshirje */}
    const handleDelete =(id)=>{
        if(window.confirm("Do you want to delete this contact?") == true){
            alert(id);
        }
    }

    return(
        <Fragment>
            <Table striped bordered hover size="sm">
      <thead>
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
                        <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
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

    

            </Fragment>

    )
}

export default Pbook