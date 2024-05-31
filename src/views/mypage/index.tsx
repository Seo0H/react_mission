import { useAuthContext } from '@/hooks/use-auth/auth-context';

const MyPage = () => {
  const { userInfo } = useAuthContext();

  return (
    <div>
      <div>My Page</div>
      <div>name : {userInfo?.name}</div>
      <div>role : {userInfo?.role}</div>
      <div>email: {userInfo?.email}</div>
    </div>
  );
};

export default MyPage;
