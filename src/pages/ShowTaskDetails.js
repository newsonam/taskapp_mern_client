import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import ErrorNotice from "../components/misc/ErrorNotice";
import './style.css';
function ShowTaskDetails() {
    let { id } = useParams();
    let navigate = useNavigate();
    console.log(id);
    const [taskdata, setTaskData] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        const getTaskData = async () => {
            const response = await fetch(`/task/${id}`);
            const data = await response.json();
            setTaskData(data);
        }

        getTaskData();
        // eslint-disable-next-line
    }, [id]);

    const handleDelete = async (id) => {
        const res = await fetch(`/tasks/${id}`, { method: "delete" });
        const resultStatus = await res.status;
        if (resultStatus === 201) {
            setError("Post data deleted");
            navigate('/show');
        }
        else {
            setError("data not saved");
        }

    }
    return (
        <div className='details-wrapper'>
            {Object.values(taskdata).map((item) => {
                return (
                    <div className="carddetails" style={{ height: '280px', marginTop: '20px' }}>
                        <div className="card-body">

                            <h3 className="card-title">{item.title}</h3>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">{item.duedate}</p>
                            <p className="card-text">{item.status}</p>

                            <div className='icons'>
                                <Link
                                    to={`/edit/${item._id}`}

                                >
                                    <button  className='btn btn-danger' >Edit</button>

                                </Link>
                                <Link
                                    to={`/delete/${item._id}`}

                                >
                                    <button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button>
                                </Link>
                            </div>
                        </div>

                    </div>
                )

            })}
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

        </div>
    );
}

export default ShowTaskDetails;

