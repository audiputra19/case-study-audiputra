import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../services/apiEmployees";
import moment from "moment";

const Create = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        address: '',
        position: '',
        salary: 0,
        division: '',
        workingStatus: '',
        birthDate: '',
        joinDate: '',
    });
    const {employees, fetchCreateEmployees, loading, error} = useApi();
    const navigate = useNavigate();

    if(error){
        console.error(error);
    }

    const generateNIP = (date, employee) => {
        const formattedDate = moment(date, "DD-MM-YYYY").format("DDMMYYYY");
        if (formattedDate === "Invalid date") {
            console.error("Invalid joinDate format.");
            return null;
        }
        const autoIncreament = employee.length + 1
        const nip = `AQI-${formattedDate}-${autoIncreament.toString().padStart(3, '0')}`;
        return nip
    }
    const handleCreate = async (e) => {
        e.preventDefault();

        const nip = generateNIP(form.joinDate, employees)

        try {
            const response = await fetchCreateEmployees(
                nip,
                form.firstName,
                form.lastName,
                form.address,
                form.position,
                form.salary,
                form.division,
                form.workingStatus,
                form.birthDate,
                form.joinDate
            )

            if(response){
                navigate("/");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        loading ? (
            <p>Loading...</p>
        ) : (
            <div className='min-h-screen w-full'>
                <div className='sticky top-0 bg-white flex justify-between items-center p-5 border-b'>
                    <button
                        type='button'
                        className='text-black'
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft size={28}/>
                    </button>
                    <p className='text-2xl font-bold text-blue-500'>Create Employee</p>
                    <div></div>
                </div>
                <div className='lg:px-16 lg:py-5 bg-gray-50'>
                    <div className='p-5 lg:border lg:rounded-2xl flex justify-center bg-white'>
                        <div className="md:w-3/4 lg:w-1/2 lg:p-5 rounded-2xl">
                            <form onSubmit={handleCreate}>
                                <div className="flex justify-between gap-3">
                                    <div className="w-full">
                                        <label htmlFor="fname" className="text-sm ml-2 font-semibold text-black">First Name</label>
                                        <div className="w-full border border-gray-400 rounded-xl mt-1">
                                            <input
                                                type="text"
                                                id="fname"
                                                className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                                onChange={(e) => 
                                                    setForm(prev => ({
                                                        ...prev,
                                                        firstName: e.target.value
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="lname" className="text-sm ml-2 font-semibold text-black">Last Name</label>
                                        <div className="w-full border border-gray-400 rounded-xl mt-1">
                                            <input
                                                type="text"
                                                id="lname"
                                                className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                                onChange={(e) =>
                                                    setForm(prev => ({
                                                        ...prev,
                                                        lastName: e.target.value
                                                    }))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <label htmlFor="address" className="text-sm ml-2 font-semibold text-black">Address</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <textarea 
                                            className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                            onChange={(e) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    address: e.target.value
                                                }))
                                            }
                                        >
                                        </textarea>
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label htmlFor="position" className="text-sm ml-2 font-semibold text-black">Position</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="position"
                                            className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                            onChange={(e) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    position: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label htmlFor="salary" className="text-sm ml-2 font-semibold text-black">Salary</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="salary"
                                            className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                            onChange={(e) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    salary: Number(e.target.value)
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label htmlFor="division" className="text-sm ml-2 font-semibold text-black">Division</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="division"
                                            className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                            onChange={(e) => 
                                                setForm(prev => ({
                                                    ...prev,
                                                    division: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label htmlFor="workingstatus" className="text-sm ml-2 font-semibold text-black">Working Status</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="workingstatus"
                                            className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                            onChange={(e) => 
                                                setForm(prev => ({
                                                    ...prev,
                                                    workingStatus: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label htmlFor="birthdate" className="text-sm ml-2 font-semibold text-black">Birth Date</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="birthdate"
                                            className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                            onChange={(e) => 
                                                setForm(prev => ({
                                                    ...prev,
                                                    birthDate: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label htmlFor="joindate" className="text-sm ml-2 font-semibold text-black">Join Date</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="joindate"
                                            className="w-full rounded-xl outline-none p-3 text-sm bg-white text-black"
                                            onChange={(e) => 
                                                setForm(prev => ({
                                                    ...prev,
                                                    joinDate: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <button 
                                        className="p-3 bg-blue-500 text-white w-full rounded-xl font-semibold"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Create;