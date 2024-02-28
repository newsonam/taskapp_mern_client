import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ErrorNotice from "../components/misc/ErrorNotice";

import './style.css';

function EditTask() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [data, setData] = useState({
        title: '',
        description: '',
        duedate: '',
        status: ''
    })
    const [error, setError] = useState();

    const handleInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })

    }
    useEffect(() => {
        const getTaskData = async () => {
            const response = await fetch(`/editdata/${id}`);
            const data = await response.json();
            setData({
                ...data,
                title: data.data.title,
                description: data.data.description,
                duedate: data.data.duedate,
                status: data.data.status,

            });
        }

        getTaskData();
    }, [id]);

    const updateData = async (e) => {
        e.preventDefault();
        const { title, description, duedate, status } = data
        const response = await fetch(`/update/${id}`, {
            method: 'Put',
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title, description, duedate, status })
        })
        const resultStatus = await response.status;
        if (resultStatus === 201) {
            setError("data updated");
            navigate('/show');
        }
        else {
            setError("error");
        }
    }

    return (
        <div className="create-wrapper">

            <form method="post" className="edit-form">
                <h1 className=" mt-5 mb-4 edit-text">EDIT TASK</h1>
                <div className="mb-3 text-left">
                    <label for="exampleInputTitle" className="form-label d-flex justify-content-start">Title</label>
                    <input type="text" name="title" className="form-control" id="exampleInputTitle" aria-describedby="emailHelp" value={data.title} onChange={handleInputs} />
                </div>
                <div className="mb-3 text-left">
                    <label for="exampleInputDesc" className="form-label d-flex justify-content-start">Description</label>
                    <input type="text" name="description" className="form-control" id="exampleInputDesc" aria-describedby="emailHelp" value={data.description} onChange={handleInputs} />
                </div>
                <div className="mb-3 text-left">
                    <label for="exampleInputDate" className="form-label d-flex justify-content-start">Due Date</label>
                    <input type="date" name="duedate" className="form-control" id="exampleInputDate" aria-describedby="emailHelp" value={data.duedate} onChange={handleInputs} />

                </div>
                <div className="mb-3  text-left">
                    <label for="exampleInputCourse" className="form-label d-flex justify-content-start">Description</label>
                    <select class="form-select" aria-label="Default select example" id="exampleInputStatus" name="status" value={data.status} onChange={handleInputs} required>
                        <option selected>Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>

                    </select>
                </div>
                <button type="submit" name="submit" value="submit" className="btn-post" onClick={updateData} >UPDATE</button>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}

            </form>
        </div>
    );
}

export default EditTask;