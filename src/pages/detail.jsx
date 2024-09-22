import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApi } from "../services/apiEmployees";

const Detail = () => {
    const { employeesDetail, fetchDetailEmployees, fetchUpdateEmployees, loading, error } = useApi();
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
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log(employeesDetail)

    if (error) {
        console.error(error);
    }

    useEffect(() => {
        fetchDetailEmployees(id);
    }, [id, fetchDetailEmployees]);

    useEffect(() => {
        if (employeesDetail) {
            setForm({
                firstName: employeesDetail.firstName || '',
                lastName: employeesDetail.lastName || '',
                address: employeesDetail.address || '',
                position: employeesDetail.position || '',
                salary: employeesDetail.salary || 0,
                division: employeesDetail.division || '',
                workingStatus: employeesDetail.workingStatus || '',
                birthDate: employeesDetail.birthDate || '',
                joinDate: employeesDetail.joinDate || '',
            });
        }
    }, [employeesDetail]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchUpdateEmployees(
                id,
                employeesDetail.nip,
                form.firstName,
                form.lastName,
                form.address,
                form.position,
                Number(form.salary),
                form.division,
                form.workingStatus,
                form.birthDate,
                employeesDetail.joinDate
            );

            if (response) {
                navigate("/");
            }
        } catch (error) {
            console.error(error)
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
                        <ArrowLeft size={28} />
                    </button>
                    <p className='text-2xl font-bold text-blue-500'>Detail Employee</p>
                    <div></div>
                </div>
                <div className='lg:px-16 lg:py-5 bg-gray-50'>
                    <div className='p-5 lg:border lg:rounded-2xl flex justify-center bg-white'>
                        <div className="md:w-3/4 lg:w-1/2 lg:p-5 rounded-2xl">
                            <form onSubmit={handleUpdate}>
                                <div className="w-full">
                                    <label htmlFor="nip" className="text-sm ml-2 font-semibold text-black">NIP</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="nip"
                                            value={employeesDetail.nip}
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between gap-3 mt-5">
                                    <div className="w-full">
                                        <label htmlFor="fname" className="text-sm ml-2 font-semibold text-black">First Name</label>
                                        <div className="w-full border border-gray-400 rounded-xl mt-1">
                                            <input
                                                type="text"
                                                id="fname"
                                                value={form.firstName}
                                                className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
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
                                                value={form.lastName}
                                                className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
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
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
                                            value={form.address}
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
                                            value={form.position}
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
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
                                            value={form.salary}
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
                                            onChange={(e) =>
                                                setForm(prev => ({
                                                    ...prev,
                                                    salary: e.target.value
                                                }))
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <label htmlFor="division" className="text-sm ml-2 font-semibold" >Division</label>
                                    <div className="w-full border border-gray-400 rounded-xl mt-1">
                                        <input
                                            type="text"
                                            id="division"
                                            value={form.division}
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
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
                                            value={form.workingStatus}
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
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
                                            value={form.birthDate}
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
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
                                            value={employeesDetail.joinDate}
                                            className="w-full rounded-xl outline-none p-3 text-sm text-black bg-white"
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="w-full mt-5">
                                    <button
                                        className="p-3 bg-blue-500 text-white w-full rounded-xl font-semibold"
                                    >
                                        Update
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

export default Detail;