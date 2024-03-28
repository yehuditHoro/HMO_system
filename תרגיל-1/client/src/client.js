import React, { useState, useEffect } from 'react';

const Client = () => {
  let data;
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [IsSick, setSick] = useState(null);
  const [newMember, setNewMember] = useState({
    name: '',
    idNumber: '',
    address: '',
    city: '',
    birthDate: '',
    phone: '',
    mobilePhone: '',
  });
  const url = window.location.pathname.split('/').pop();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New member data:', newMember);
    setNewMember({
      name: '',
      idNumber: '',
      address: '',
      city: '',
      birthDate: '',
      phone: '',
      mobilePhone: '',
    });
  };

  useEffect(() => {
    console.log("in client")
    getMembers();
  }, [url]);

  const selectMember = (member) => {
    let curr_id=member.member_id
    getMembersIfSick(curr_id);
  };

  async function getMembers() {
    try {
      data = await fetch('http://localhost:8080/api/members', { method: 'GET' })
      if (data) {
        data = await data.json();
        console.log(data)
        setMembers(data);
      }
    }
    catch (err) {
      alert(err)
    };
  };
  async function getMembersIfSick(id) {
    try {
      console.log(id)
      data = await fetch(`http://localhost:8080/api/covid_info/${id}`, { method: 'GET' })
      if (data) {
        data = await data.json();
        console.log(data)
        setMembers(data);
      }
    }
    catch (err) {
      alert(err)
    };
  };
  const addMember = () => {
    // 1. Validate newMember data (optional)
    // You might want to add validation for each field before sending data

    fetch('/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMember)
    })
      .then(response => response.json())
      .then(data => {
        // 2. Update members state with new data
        setMembers([...members, data]);

        // 3. Clear form fields (optional)
        setNewMember({
          name: '',
          idNumber: '', 
          address: '',
          city: '',
          birthDate: '',
          phone: '',
          mobilePhone: '',
          vaccinationDate: '',
          illnessDate: '',
          recoveryDate: ''
        });
      })
      .catch(error => {
        console.error('Error adding member:', error);
      });
  };

  const deleteMember = (id) => {
    fetch(`/api/members/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setMembers(members.filter(member => member.id !== id));
      })
      .catch(error => {
        console.error('Error deleting member:', error);
      });
  };

  const editMember = (id, newData) => {
    fetch(`/api/members/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
      .then(response => response.json())
      .then(data => {
        setMembers(members.map(member => (member.id === id ? data : member)));
        setSelectedMember(null);
      })
      .catch(error => {
        console.error('Error editing member:', error);
      });
  };

  return (
    <div>
      <h1>HMO</h1>
      <ul>
        {members.map(member => (
          <li key={member.id} onClick={() => selectMember(member)}>
            {member.name}
          </li>
        ))}
      </ul>
      {IsSick && (
        <div>
          <h2>{selectedMember.name}</h2>
          <p>id number: {selectedMember.idNumber}</p>
          <p>address: {selectedMember.address}</p>
          <p>city:{selectedMember.city}</p>
          <p>date of birth:{selectedMember.birthDate}</p>
          <p>phone: {selectedMember.phone}</p>
          <p>mobile: {selectedMember.mobilePhone}</p>
          <p>vaccinationDate {selectedMember.vaccinationDate}</p>
          <p>illnessDate: {selectedMember.illnessDate}</p>
          <p>recoveryDate:{selectedMember.recoveryDate}</p>
          <button onClick={() => editMember(selectedMember.id, newMember)}>ערוך חבר</button>
        </div>
      )}
      <h2>add new member</h2>
      <form onSubmit={handleSubmit}>
        <h2>Personal Details</h2>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="idNumber">ID Number:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            placeholder="ID Number"
            value={newMember.idNumber}
            onChange={(e) => setNewMember({ ...newMember, idNumber: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            value={newMember.address}
            onChange={(e) => setNewMember({ ...newMember, address: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City"
            value={newMember.city}
            onChange={(e) => setNewMember({ ...newMember, city: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={newMember.birthDate}
            onChange={(e) => setNewMember({ ...newMember, birthDate: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            value={newMember.phone}
            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="mobilePhone">Mobile Number:</label>
          <input
            type="text"
            id="mobilePhone"
            name="mobilePhone"
            placeholder="Mobile Number"
            value={newMember.mobilePhone}
            onChange={(e) => setNewMember({ ...newMember, mobilePhone: e.target.value })}
          />
        </div>
        <button type="submit" onClick={addMember}>Add Member</button>
      </form>
      <button onClick={() => deleteMember(selectedMember.id)}>delete member</button>
    </div>
  );

};
export default Client;
