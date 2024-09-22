
const { createContext, useState, useEffect, useContext, useCallback } = require("react");
const { axiosInstance } = require("./api");

const ApiContext = createContext();
export const ApiProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [employeesDetail, setEmployeesDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    const fetchDataEmployees = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/employees');
            setEmployees(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchCreateEmployees = async (nip, firstName, lastName, address, position, salary, division, workingStatus, birthDate, joinDate ) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post('/employees', {
                nip, firstName, lastName, address, position, salary, division, workingStatus, birthDate, joinDate
            });
            fetchDataEmployees();
            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchDetailEmployees = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/employees/${id}`);
            // console.log(response.data)
            setEmployeesDetail(response.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [])

    const fetchUpdateEmployees = async (id, nip, firstName, lastName, address, position, salary, division, workingStatus, birthDate, joinDate ) => {
        setLoading(true);
        try {
            const response = await axiosInstance.put(`/employees/${id}`, {
                nip, firstName, lastName, address, position, salary, division, workingStatus, birthDate, joinDate
            });
            fetchDataEmployees();
            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchDeleteEmployees = async (id) => {
        setLoading(true)
        try {
            console.log(id)
            const response = await axiosInstance.delete(`/employees/${id}`);

            setEmployees(prev => prev.filter(employee => employee.id !== id));
            return response.data;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchDataEmployees();
    }, [])

    return (
        <ApiContext.Provider value={{
            employees, 
            employeesDetail, 
            loading, 
            error, 
            fetchCreateEmployees, 
            fetchDeleteEmployees, 
            fetchDetailEmployees, 
            fetchUpdateEmployees
        }}>
            {children}
        </ApiContext.Provider>
    )
}

export const useApi = () => {
    const context = useContext(ApiContext);
    if(!context){
        throw new Error('useApi must be used within an ApiProvider');
    }
    return context;
}