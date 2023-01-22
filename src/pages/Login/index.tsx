import { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import TextInput from '../../components/TextInput';
import { useAuth } from '../../context/auth';

function Login() {
  const [uname, setUname] = useState("");
  const auth = useAuth()!;
  const navigate = useNavigate();

  function onClickhandler() {
    auth.login(uname);
    navigate("/");
  }

  return (
    <div className='container grid place-items-center'>
      <PageTitle>This is the Login page</PageTitle>
      <label>Username:<br />
        <TextInput value={uname} onChange={e => setUname(e.target.value)} />
      </label>
      <Button onCLick={onClickhandler}>Submit</Button>
    </div>
  )
}

export default Login
