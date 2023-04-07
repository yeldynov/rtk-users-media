import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';
import { useThunk } from '../hooks/use-thunk';

function UsersList() {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => state.users); // {data: [], isLoading: false, error: null}

  useEffect(() => {
    doFetchUsers();
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
  };

  if (isLoadingUsers) return <Skeleton times={6} className='h-10 w-full' />;
  if (loadingUsersError) return <div>Error Fetching data...</div>;

  const renderedUsers = data.map((user) => (
    <div className='mb-2 border rounded' key={user.id}>
      <div className='flex p-2 justify-between items-center cursor-pointer'>
        {user.name}
      </div>
    </div>
  ));

  return (
    <div>
      <div className='flex flex-row justify-between m-3'>
        <h1 className='m-2 text-xl'>Users</h1>
        {isCreatingUser ? (
          'Creating User...'
        ) : (
          <Button primary onClick={handleUserAdd}>
            + Add User
          </Button>
        )}
        {creatingUserError && 'Error creating user'}
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
