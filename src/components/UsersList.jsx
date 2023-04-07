import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';
import Skeleton from './Skeleton';

function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users); // {data: [], isLoading: false, error: null}

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) return <Skeleton times={6} className='h-10 w-full' />;
  if (error) return <div>Error Fetching data...</div>;

  const renderedUsers = data.map((user) => (
    <div className='mb-2 border rounded' key={user.id}>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        {user.name}
      </div>
    </div>
  ));

  return <div>{renderedUsers}</div>;
}

export default UsersList;
