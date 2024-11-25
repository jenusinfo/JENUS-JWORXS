import { useDropzone } from 'react-dropzone'
import { IoDocumentText } from "react-icons/io5";
import Text from '../ui/Text';
import { FaTrash } from "react-icons/fa6";
import { toast } from 'react-toastify';
import axios from 'axios';

const FileUploader = ({ selectedFiles, setSelectedFiles, allowedMultiple = true, info, setInfo, name, isRepeatable, parentUniqueId, index }: {
    selectedFiles: any
    setSelectedFiles: any
    allowedMultiple: boolean
    info: any
    setInfo: any
    name: string
    isRepeatable: boolean
    parentUniqueId: number
    index: number
}) => {

    const onDrop = (acceptedFiles: any) => {
        console.log(acceptedFiles, "accepted files");

        if (acceptedFiles?.length && acceptedFiles?.length > 0) {

            let existingFiles = selectedFiles;// [...selectedFiles];

            if (allowedMultiple == false) {
                existingFiles = [];
            }

            acceptedFiles.forEach((file: any, i: any) => {
                if (!(existingFiles.some((cond: any) => cond.name == file.name))) {
                    existingFiles.push(file);
                }
            });

            setSelectedFiles((prevState: any) => {
                return [...existingFiles]
            });
        }
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        onDrop,
        multiple: allowedMultiple,
        accept: {
            "application/pdf": [".pdf"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
        }
    });

    const handleRemoveFile = (index: number) => {
        let temp = [...selectedFiles]
        temp.splice(index, 1)
        setSelectedFiles(temp)
    }

    const handleUpload = async () => {
        if (selectedFiles.length <= 0) {
            toast.error("Please select the Document!");
            return;
        }

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        };

        let file = selectedFiles[0]
        let formData = new FormData();
        formData.append("file", file)
        formData.append("extension", file?.name?.split(".")?.reverse()[0]);

        const res: any = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Interviews/Sessions/Attachment/`, formData, config)
        if (res.data.Success) {
            console.log(res.data.Data)
            if (isRepeatable) {
                let temp: any = { ...info }
                temp[parentUniqueId] = []
                temp[parentUniqueId][index] = {}
                temp[parentUniqueId][index][name] = {}
                temp[parentUniqueId][index][name].Id = res.data.Data.Id
                temp[parentUniqueId][index][name].FileName = res.data.Data.FileName
                setInfo(temp)
            } else {
                let temp: any = { ...info }
                temp[parentUniqueId] = {}
                temp[parentUniqueId][name] = {}
                temp[parentUniqueId][name].Id = res.data.Data.Id
                temp[parentUniqueId][name].FileName = res.data.Data.FileName
                setInfo(temp)
            }
        }
    }

    return (
        <div>
            <div
                className={
                    `px-2 py-3 border border-dashed rounded-[4px] ${isDragAccept ? 'border-green-600' : 'border-blue-500'
                    }`
                }
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div className='flex justify-center items-center gap-2'>
                    <IoDocumentText color='#2B8BE9' size={40} />
                    <div>
                        <Text text='Drag and Drop files Here' size={12} color='#2B8BE9' />
                        <Text text='Only documents Acceptable' size={12} color='#8084B4' />
                    </div>
                </div>
            </div>
            <div className='mt-2 flex flex-col items-center gap-1'>
                {
                    selectedFiles &&
                    selectedFiles.length
                    ? selectedFiles.map((file: any, index: number) => (
                        <div key={index} className='bg-blue-400 px-2 flex items-center gap-2' style={{ width: '66%' }}>
                            <Text text={file.name} className='truncate whitespace-nowrap' color='white' size={12} />
                            <FaTrash color='red' onClick={() => handleRemoveFile(index)} className='hover:cursor-pointer' />
                        </div>
                    ))
                    : <></>
                }
            </div>
            {(selectedFiles && selectedFiles.length) ? <div className='flex justify-center' style={{ marginTop: 4 }}>
                <button className='text-xs bg-[#2454DE] rounded-md text-white px-2 rounded-sm' onClick={handleUpload}>upload</button>
            </div> : <></>}
        </div>
    )
}

export default FileUploader