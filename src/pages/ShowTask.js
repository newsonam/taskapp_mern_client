
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './style.css';

function ShowTask() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getTaskData = async () => {
            const response = await fetch('/getdata');
            const data = await response.json();
            setData(data.data);
        }

        getTaskData();



    }, []);

    // const deleteSdata = async (id) => {
    //     const response = await fetch(`/deletedata/${id}`, {
    //         method: 'post'
    //     });
    //     const status = await response.status;
    //     if (status === 201) {
    //         window.alert("student data deleted");
    //     }
    //     else {
    //         window.alert("error");
    //     }
    // }
    return (
        <div className="task-wrapper">
         
            <div className="card-wrapper">
                {data.map((item) => {
                    return (
                        <div class="card" style={{ width: '18rem' }}>
                            <div class="card-body">
                                <h5 class="card-title">{item.title}</h5>
                                <p class="card-text">{item.description}</p>
                              
                                
                                <Link to={`/postdetails/${item._id}`} >
                                    <button type="button" className="btn btn-primary">Show Details</button></Link>
                                
                                
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* <Link
                to={`/edit/${item._id}`}

            >
                <button className="btn btn-primary">EDIT</button>
            </Link>
            <button className="btn btn-primary" onClick={() => deleteSdata(item._id)}>Delete</button>
 */}



        </div>
    );
}

export default ShowTask;
