import { Search } from "lucide-react";

const SearchItem = ({setFilter}) => {


    return (
        <div>
            <div className='border w-fit rounded-xl bg-gray-100 flex items-center gap-2 px-3'>
                <div className='flex justify-center'>
                    <Search/>
                </div>
                <input
                    type='text'
                    className='rounded-2xl outline-none p-2 text-sm bg-gray-100' 
                    placeholder='Search'
                    onChange={e => setFilter(e.target.value)}
                />
            </div>
        </div>
    )
}

export default SearchItem;