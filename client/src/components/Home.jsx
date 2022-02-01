import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'react-confirm-alert/src/react-confirm-alert.css'


const Home = () =>{
    const [userlist,setUserlist] = useState([]);
    const [add,setAdd] = useState(0);
    
    const [user,setUser] = useState({
        _id:"", name:"", age:null, gender:null, scholarship:null, work:null, partner:null, salary:null
    });    

    const getUserlist = async() =>{
        const res = await fetch("http://localhost:5000/api/");
        const data = await res.json();
        if(res.status===500 || !data){
            window.alert(data.error);
        }else{
            setUserlist(data);
        }
    }
    useEffect(()=>{
        getUserlist();
    },[]);

    let name,value;

    const handleInputChange=(e)=>{
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name] : value});
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(add===1){
            const {name, age, gender, scholarship, work, partner, salary} = user;
            const res = await fetch("http://localhost:5000/api/add",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, age, gender, scholarship, work, partner, salary
                })
            })
            const data = await res.json();
            if(res.status===422 || !data){
                window.alert("Insert Failed");
            }else{
                window.alert("Insert success");
                getUserlist();
                setAdd(0);
            }
        }else{
            const {_id, name, age, gender, scholarship, work, partner, salary} = user;
            const res = await fetch("http://localhost:5000/api/update?id="+_id,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, age, gender, scholarship, work, partner, salary
                })
            });
            const data = await res.json();
            if(res.status===500 || !data){
                window.alert("update Failed");
            }else{
                window.alert("update success");
                getUserlist();
                setAdd(0);
            }
        }
    }

    const handleAddButtonClick = ()=>{
        setAdd(add===0?1:0);
        setUser({
            name:"", age:null, gender:null, scholarship:null, work:null, partner:null, salary:null
        })
    }

    const handelDelete = async(uId) => {
        const res = await fetch("http://localhost:5000/api/remove?id="+uId,{
            method:"DELETE"
        });
        const data = await res.json();
        if(res.status===422 || !data){
            window.alert("delete Failed");
        }else{
            window.alert("delete success");
            getUserlist();
        }
    }

    const confirmDelete = (uId) => {
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => handelDelete(uId)
            },
            {
              label: 'No',
              onClick: () => {}
            }
          ]
        })
      };

    const handleEdit=(u)=>{
        window.scrollTo({
            top: 0, 
            behavior: 'auto'
          });
        const {_id,name, age, gender, scholarship, work, partner, salary} = u;
        setUser({_id,name, age, gender, scholarship, work, partner, salary});
        setAdd(2); 
    }


    const gender = ['Female','Male'];
    const age = ['18-21','22-25','above 26'];
    const scholarship = ['None','25%','50%','75%','100%'];
    const partner = ['Married','Single'];
    const salary = ['135-200k','201-270k','271-340k','271-340k','above 410k'];

    return(
        <>
            <span className="title">Higher Study Student Details</span>
            <button type="button" onClick={handleAddButtonClick} className="addButton">{add?<i className="zmdi zmdi-close"><span className="icon-text"> Cancle</span></i>:<i className="zmdi zmdi-plus"><span className="icon-text"> Add</span></i>}</button>
            <div className="main">
                {add?<div className="form-container">
                    <div className="container">
                    {add===1?<form className="add-form" id="add-form">
                        <div className="form-grp">
                        <div className="input-group mb-3">
                            <input type="text" name="name" id="name" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon2" autoComplete="off" value={user.name} onChange={handleInputChange}/>
                        </div>
                        </div>
                        <div className="form-grp">
                            <label>Age</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="age" id="age" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >(18-21)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="age" id="age" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label">(22-25)</label>
                            </div>
                            <div className="form-check form-check-inline"> 
                                <input className="form-check-input" type="radio"  name="age" id="age" value="3" onChange={handleInputChange}/>
                                <label className="form-check-label" >(above 26)</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Gender</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="gender" id="gender" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="gender" id="gender" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label">Female</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Scholarship</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="scholarship" id="scholarship" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >None</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="scholarship" id="scholarship" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >25%</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="scholarship" id="scholarship" value="3" onChange={handleInputChange}/>
                                <label className="form-check-label" >50%</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="scholarship" id="scholarship" value="4" onChange={handleInputChange}/>
                                <label className="form-check-label" >75%</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="scholarship" id="scholarship" value="5" onChange={handleInputChange}/>
                                <label className="form-check-label">100%</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Work Experience</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="work" id="work" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="work" id="work" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >No</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Marital Status</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="partner" id="partner" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >Married</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="partner" id="partner" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >Single</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Salary</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="salary" id="salary" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >135-200k</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="salary" id="salary" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >201-270k</label>
                            </div><div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="salary" id="salary" value="3" onChange={handleInputChange}/>
                                <label className="form-check-label" >271-340k</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="salary" id="salary" value="4" onChange={handleInputChange}/>
                                <label className="form-check-label" >271-340k</label>
                            </div><div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio"  name="salary" id="salary" value="5" onChange={handleInputChange}/>
                                <label className="form-check-label" >above 410k</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <input type="button" value="Add" name="create" id="create" className="form-submit" onClick={handleSubmit}/>
                        </div>
                    </form>
                    :
                    <form className="add-form" id="add-form">
                        <div className="form-grp">
                        <div className="input-group mb-3">
                            <input type="text" name="name" id="name" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon2" autoComplete="off" value={user.name} onChange={handleInputChange}/>
                        </div>
                        </div>
                        <div className="form-grp">
                            <label>Age</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.age === 1} name="age" id="age" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >(18-21)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.age === 2} name="age" id="age" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label">(22-25)</label>
                            </div>
                            <div className="form-check form-check-inline"> 
                                <input className="form-check-input" type="radio" checked={user.age === 3} name="age" id="age" value="3" onChange={handleInputChange}/>
                                <label className="form-check-label" >(above 26)</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Gender</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.gender===2} name="gender" id="gender" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.gender===1} name="gender" id="gender" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label">Female</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Scholarship</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.scholarship===1} name="scholarship" id="scholarship" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >None</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.scholarship===2} name="scholarship" id="scholarship" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >25%</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.scholarship===3} name="scholarship" id="scholarship" value="3" onChange={handleInputChange}/>
                                <label className="form-check-label" >50%</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.scholarship===4} name="scholarship" id="scholarship" value="4" onChange={handleInputChange}/>
                                <label className="form-check-label" >75%</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.scholarship===5} name="scholarship" id="scholarship" value="5" onChange={handleInputChange}/>
                                <label className="form-check-label">100%</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Work Experience</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.work===1} name="work" id="work" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.work===2} name="work" id="work" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >No</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Marital Status</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.partner===1} name="partner" id="partner" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >Married</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.partner===2} name="partner" id="partner" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >Single</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <label>Salary</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.salary===1} name="salary" id="salary" value="1" onChange={handleInputChange}/>
                                <label className="form-check-label" >135-200k</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.salary===2} name="salary" id="salary" value="2" onChange={handleInputChange}/>
                                <label className="form-check-label" >201-270k</label>
                            </div><div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.salary===3} name="salary" id="salary" value="3" onChange={handleInputChange}/>
                                <label className="form-check-label" >271-340k</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.salary===4} name="salary" id="salary" value="4" onChange={handleInputChange}/>
                                <label className="form-check-label" >271-340k</label>
                            </div><div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={user.salary===5} name="salary" id="salary" value="5" onChange={handleInputChange}/>
                                <label className="form-check-label" >above 410k</label>
                            </div>
                        </div>
                        <div className="form-grp">
                            <input type="button" value="Update" name="create" id="create" className="form-submit" onClick={handleSubmit}/>
                        </div>
                    </form>}
                </div>  
                </div>:null}
                <div style={{width:"100%",height:"1px"}}></div>
                <div className="user-lists" style={{ marginTop:add?"550px":"20px"}}>
                    {userlist.map((user, index) => {
                        return(
                            <div key={index} className="user-list">
                                <span className="name">{user.name}</span>
                                <div className="tag-grp">
                                <div className="tags">
                                    <span className="user-font">Age: </span>
                                    <span className="user-font">Gender: </span>
                                    <span className="user-font">Scholarship: </span>
                                    <span className="user-font">Work Experience: </span>
                                    <span className="user-font">Marital Status: </span>
                                    <span className="user-font">Salary: </span>
                                </div>
                                <div className="tag-value">
                                    <span className="user-font">{age[user.age-1]}</span>
                                    <span className="user-font">{gender[user.gender-1]}</span>
                                    <span className="user-font">{scholarship[user.scholarship-1]}</span>
                                    <span className="user-font">{user.work===1?<span className="icon green"><i className="zmdi zmdi-check"></i></span>:<span className="icon red"><i className="zmdi zmdi-close"></i></span>}</span>
                                    <span className="user-font">{partner[user.partner-1]}</span>
                                    <span className="user-font">{salary[user.salary-1]}</span>
                                </div>
                                </div>
                                <div className="action">
                                    <button onClick={()=>handleEdit(user)} className="actionicon green"><i className="zmdi zmdi-edit"></i></button>
                                    <button onClick={()=>confirmDelete(user._id)} className="actionicon red"><i className="zmdi zmdi-delete"></i></button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
 
export default Home;