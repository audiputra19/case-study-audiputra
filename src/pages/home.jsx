import { Pen, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchItem from '../komponen/searchItem';
import { useApi } from '../services/apiEmployees';
import { useState } from 'react';
const Home = () => {
    const { fetchDeleteEmployees, employees, loading, error } = useApi();
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    if(error){
        console.error(error);
    }

    const employeeFilter = employees.filter(employee => 
        employee.firstName.toLowerCase().includes(filter.toLowerCase()) || 
        employee.lastName.toLowerCase().includes(filter.toLowerCase()) ||
        employee.division.toLowerCase().includes(filter.toLowerCase()) ||
        employee.position.toLowerCase().includes(filter.toLowerCase()) ||
        employee.workingStatus.toLowerCase().includes(filter.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await fetchDeleteEmployees(id);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        loading ? (
            <p>Loading...</p>
        ) : (
            <div className='min-h-screen w-full bg-white'>
                <div className='flex justify-between items-center p-5 border-b'>
                    <p className='text-2xl font-bold text-black'>Dasboard</p>
                    <div>
                        <button
                            type='button'
                            className='bg-blue-500 text-white text-sm font-semibold rounded-full pl-3 pr-5 py-3 flex gap-2 items-center hover:bg-blue-600'
                            onClick={() => navigate('/create')}
                        >
                            <Plus size={20}/>
                            New Employee
                        </button>
                    </div>
                </div>
                <div className='lg:px-16'>
                    <div className='p-5 mt-5 lg:border rounded-2xl'>
                        <div className='overflow-x-auto'>
                            <div className='mb-5'>
                                <SearchItem setFilter={setFilter}/>
                            </div>
                            <table className='table table-zebra'>
                                <thead>
                                    <tr className='text-center text-black'>
                                        <th>No.</th>
                                        <th>NIP</th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Position</th>
                                        <th>Salary</th>
                                        <th>Division</th>
                                        <th>Working Status</th>
                                        <th>Birth Date</th>
                                        <th>Join Date</th>
                                        <th colSpan={2}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeeFilter.length === 0 ? (
                                        <tr className='text-center'>
                                            <td 
                                                colSpan={10} 
                                                className='text-xs text-gray-400'
                                            >
                                                No data available
                                            </td>
                                        </tr>
                                    ) : (
                                        employeeFilter.map((employee, index) => (
                                            <tr key={employee.nip} className='text-center text-black'>
                                                <th>{index + 1}</th>
                                                <td>{employee.nip}</td>
                                                <td>{employee.firstName} {employee.lastName}</td>
                                                <td>{employee.address}</td>
                                                <td>{employee.position}</td>
                                                <td>{employee.salary.toLocaleString("id-ID")}</td>
                                                <td>{employee.division}</td>
                                                <td>{employee.workingStatus}</td>
                                                <td>{employee.birthDate}</td>
                                                <td>{employee.joinDate}</td>
                                                <td className='flex gap-3'>
                                                    <button onClick={() => navigate(`/detail/${employee.id}`)}><Pen size={20}/></button>
                                                    <button onClick={() => handleDelete(employee.id)}><Trash2 size={20}/></button>
                                                </td>
                                            </tr>
                                        ))  
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Home;