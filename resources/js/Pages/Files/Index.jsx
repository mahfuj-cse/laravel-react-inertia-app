import axios from "axios";
import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = (props) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [renderKey, setRenderKey] = useState(0);
    console.log(files, setFiles, error, setError);
    const handleClick = (event) => {};

    success &&
        setTimeout(() => {
            setSuccess("");
        }, 1000);

    const handleChange = (e) => {
        setError("");
        setFiles([...files, ...Array.from(e.target.files)]);
    };

    const saveSingleImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            return await axios.post(route("files.store"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            ss;
        } catch (err) {
            return Promise.reject(err);
        }
    };

    const handleUpload = async () => {
        if (!files.length) {
            setError("Please select a file to upload.");
            return;
        }
        setLoading(true);
        const promises = files.map(async (file) => {
            return await saveSingleImage(file);
        });
        await Promise.all(promises).then((res) => {
            setLoading(false);
            setSuccess("file saved successfully");
            setFiles([]);
            setRenderKey((prev) => prev + 1);
        });
    };

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <section className="flex flex-col gap-4 h-screen ">
                <div className="max-w-[50%] my-auto ml-[30%]">
                    <div className="w-full">
                        {files.length > 0 && (
                            <ul className="p-0 m-0">
                                {files.map((file, index) => (
                                    <p
                                        className=" border border-gray-300 p-2 mb-2"
                                        key={index}
                                    >
                                        {file.name}
                                    </p>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="pt-4 w-full flex" onClick={handleClick}>
                        <div className="mb-3 w-96">
                            <input
                                key={renderKey}
                                className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out file:-mx-3 file:-my-1.5 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-1.5 file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:bg-white focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:bg-transparent dark:text-neutral-200 dark:focus:bg-transparent"
                                type="file"
                                id="formFileMultiple"
                                multiple
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="pt-4 w-full">
                        <button
                            onClick={handleUpload}
                            disabled={loading}
                            type="button"
                            className="focus:outline-none text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 bg-[#0F9D58] focus:ring-green-800"
                        >
                            Upload
                        </button>
                        {success && <p className="text-green-600">{success}</p>}

                        {error && <p className="text-red-600">{error}</p>}
                    </div>
                </div>

                
            </section>
        </AuthenticatedLayout>
    );
};

export default Index;
