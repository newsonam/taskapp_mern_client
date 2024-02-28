
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorNotice from "../components/misc/ErrorNotice";

import './style.css';

function ShowTasks() {
    let navigate = useNavigate();
    const [data, setData] = useState([]);
    const [refresh, ] = useState(false);
    const [error, setError] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [filter, setFilter] = useState(data);

    useEffect(() => {
        const getTasksData = async () => {
            const response = await fetch('/tasks');
            const data = await response.json();
            setData(data.data);
            setFilter(data.data);
        }

        getTasksData();

    }, [refresh]);


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
    const handleSearch = (e) => {
        const keyword=e.target.value;
        if (keyword !== '') {
            const filtereddata = data.filter((item) => {
                return item.title.toLowerCase().startsWith(keyword.toLowerCase());
            })
            setFilter(filtereddata);
        }
        else{
            setFilter(data); 
        }
        setSearchInput(keyword);
        
    }

    return (
        <div className="show-wrapper">

            <h2 className="mt-5 font-bold pt-4 text-dark text-center mb-2">Task Details</h2>
            <div className='mb-3 input-wrapper'>
                    <input className='input-search' type="text" placeholder='Search....' value={searchInput} onChange={handleSearch} />
                </div>

            <div className="w-25 mx-auto">
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            </div>

            <div className='show-task-wrapper'>
                {Object.values(filter).map((item) => {
                    return (
                        <div className="card" style={{ width: '20rem', height: '250px', marginTop: '30px' }}>
                            <div className="card-body">

                                <h3 className="card-title">{item.title}</h3>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{item.duedate}</p>
                                <p className="card-text">{item.status}</p>

                                <div className='icons'>
                                    <Link
                                        to={`/task/${item._id}`}

                                    >
                                        <button className="btn btn-danger">View</button>
                                    </Link>
                                    <Link
                                        to={`/edit/${item._id}`}

                                    >
                                        <button className='btn btn-danger' >Edit</button>

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


        </div>
    );
}

export default ShowTasks;
