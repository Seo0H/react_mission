import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <>
      설문 시작하기
      <Link to='/question/common'>Start</Link>
    </>
  );
};

export default MainPage;
