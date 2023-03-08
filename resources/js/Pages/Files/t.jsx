

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
            {files?.map((file, index) => (
              <tr key={index}>
                <td>{file.filename}</td>
                <td>{moment(file.created_at).format('MMMM DD, YYYY')}</td>
                <td>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    download
                    href={ file.url }

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