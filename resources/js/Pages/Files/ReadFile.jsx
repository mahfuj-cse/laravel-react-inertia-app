import React from 'react';
import axios from 'axios';
import moment from 'moment';
import "./ReadFile.css";
// import { url } from '../../helpers/url'; // URL helper function for Laravel

const ReadFile = () => {
  const [files, setFiles] = React.useState([]);

  React.useEffect(() => {
    axios.get(route('files.show')).then((response) => {
      setFiles(response.data);
    });
  }, []);

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
                <td>{file.url}</td>
                <td>{moment(file.createdOn).format('MMMM DD, YYYY')}</td>
                <td>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    download
                    href={url(file.url)}
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
        ''
      )}
    </section>
  );
};

export default ReadFile;
