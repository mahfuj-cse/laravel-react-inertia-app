import React from 'react';
import moment from 'moment';
import "./ReadFile.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ReadFile = (props) => {
    const files = props.files.data;
console.log(files)
  return (
    <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Files</h2>}
        >
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
  {
    files.length ?( <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th scope="col" class="px-6 py-3">
                File name
            </th>
            <th scope="col" class="px-6 py-3">
                Time
            </th>
            <th scope="col" class="px-6 py-3">
                File Url
            </th>
           
            <th scope="col" class="px-6 py-3">
                Action
            </th>
        </tr>
    </thead>
    <tbody>
    {files?.map((file, index) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {file.filename}
                </th>
                <td class="px-6 py-4">
                {moment(file.created_at).format('MMMM DD, YYYY')}
                </td>
                <td class="px-6 py-4">
                {file.url}
                </td>
                
                <td class="px-6 py-4">
                    <a  rel="noreferrer"
                    target="_blank"
                    download
                    href={ file.url } class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Download</a>
                </td>
            </tr>
              ))}
      
       
    </tbody>
</table>): (
        <h1>not found {files.length}</h1>
      )
  }
   
</div>
    </AuthenticatedLayout>
  );
};

export default ReadFile;
