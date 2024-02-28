import React from 'react';
function ErrorNotice(props) {
    return (
        <div className="error-notice">
            <div class="alert alert-success d-flex justify-content-between" role="alert">
                {props.message}
                <button className="btn btn-dark" onClick={props.clearError}>X</button>
            </div>
            
        </div>
    );
}
export default ErrorNotice;