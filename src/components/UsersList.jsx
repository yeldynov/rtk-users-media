import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser } from '../store';
import Button from './Button';
import Skeleton from './Skeleton';

function UsersList() {
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [loadingUsersError, setLoadingUsersError] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [creatingUserError, setCreatingUserError] = useState(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.users); // {data: [], isLoading: false, error: null}

  useEffect(() => {
    setIsLoadingUsers(true);
    dispatch(fetchUsers())
      .unwrap() // unwrap default behavior
      .then(() => {}) // empty, can be removed
      .catch((err) => setLoadingUsersError(err))
      .finally(() => setIsLoadingUsers(false));
  }, [dispatch]);

  const handleUserAdd = () => {
    setIsCreatingUser(true);
    dispatch(addUser())
      .unwrap() // .then() is empty and removed
      .catch((err) => setCreatingUserError(err))
      .finally(() => setIsCreatingUser(false));
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
