import { useState } from "react";
// import axios from 'axios';
import './style.css';
import { useNavigate } from "react-router-dom";
import ErrorNotice from "../components/misc/ErrorNotice";

function CreateTask() {
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
    const postData = async (e) => {
        e.preventDefault();
        const { title, description, duedate, status } = data;
        const response = await fetch('/taskdata', {
            method: "Post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ title, description, duedate, status })
        })
        const resultStatus = await response.status;
        if (resultStatus === 201) {
            setError('data saved successfully');
            navigate('/show');
        }
        else {
            setError('plz fill the data successfully');
            setData({});
        }
    }



    return (
        <div className="create-wrapper">

            <form method="post" className="create-form">
                <h1 className="mt-5 mb-5 create-text">CREATE TASK</h1>
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
                    <label for="exampleInputStatus" className="form-label d-flex justify-content-start">Status</label>
                    <select class="form-select" aria-label="Default select example" id="exampleInputStatus" name="status" value={data.status} onChange={handleInputs} required>
                        <option selected>Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        
                    </select>
                </div>
                <button type="submit" name="submit" value="submit" className="btn-post" onClick={postData} >POST</button>
                {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            </form>
            

        </div>
    );
}

export default CreateTask;