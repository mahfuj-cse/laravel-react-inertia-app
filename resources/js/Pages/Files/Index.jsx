import axios from "axios";
import React, { useState } from 'react';
import "./index.css";


const Index = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const hiddenFileInput = React.useRef(null);
    console.log(files, setFiles, error, setError)
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    success &&
        setTimeout(() => {
            setSuccess('');
        }, 1000);

    const handleChange = (e) => {
        setError('');
        setFiles([...files, ...Array.from(e.target.files)]);
    };

    const saveSingleImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        try {
            return await axios.post(route('files.create'), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const handleUpload = async () => {
        if (!files.length) {
            setError('Please select a file to upload.');
            return;
        }
        setLoading(true);
        const promises = files.map(async (file) => {
            return await saveSingleImage(file);
        });
        await Promise.all(promises).then((res) => {
            setLoading(false);
            setSuccess('file saved successfully');
            setFiles([]);
        });
    };

    return (
       
            <section className="container">
                <div className="file-upload">
                    <h3>Upload Files:</h3>
                    <div>
                        {files.length > 0 && (
                            <ul className="p-0 m-0">
                                {files.map((file, index) => (
                                    <p key={index}>{file.name}</p>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div
                        className="flex items-center cursor-pointer"
                        onClick={handleClick}
                    >
                        <section className="custom-select-box">
                            <div>Select</div>
                            <div></div>
                        </section>
                        <div>
                            <label className="cursor-pointer">+</label>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                multiple
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>
                <div className="btn-container">
        <button onClick={handleUpload} disabled={loading}>
          Submit
        </button>
      </div>
      {success && <p className="success-message">{success}</p>}

      {error && <p className="error-message">{error}</p>}
      </section>
      
    );
 }

 export default Index;