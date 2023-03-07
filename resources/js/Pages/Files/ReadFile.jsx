import React from 'react';
import moment from 'moment';
import "./ReadFile.css";
const ReadFile = (props) => {
    const files = props.files;

  return (
    <section>
      {files.length ? (
        <table className="file-table">
          <thead>
            <tr>
              <th>File Name</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.filename}</td>
                <td>{moment(file.created_at).format('MMMM DD, YYYY')}</td>
                <td>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    download
                    // href={url(file.url)}
                    href="{{ asset('storage/uploads/' . file.filename) }}"

                    className="download-link"
                  >
                    Download
                  </a>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>not found {files.length}</h1>
      )}
    </section>
  );
};

export default ReadFile;
