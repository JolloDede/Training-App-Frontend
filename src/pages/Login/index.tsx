import { MouseEvent, MouseEventHandler, useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import TextInput from '../../components/TextInput';
import { useAuth } from '../../context/auth';

function Login() {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const auth = useAuth()!;
  const navigate = useNavigate();

  async function onClickhandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (await auth.login(uname, password) == 200) {
      navigate("/");
    } else {
      console.log(await auth.login(uname, password));
      setErrorMsg("Unable to Login");
      setPassword("");
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <PageTitle>Training app</PageTitle>
      <div className='container p-8 space-y-2 bg-slate-200 rounded-lg shadow'>
        <PageTitle>Sign in to your Account</PageTitle>
        <p className='text-red-700 font-bold'>{errorMsg}</p>
        <form className='space-y-4'>
          <div>
            <label className='block'>Username</label>
            <TextInput value={uname} onChange={e => setUname(e.target.value)} />
          </div>
          <div>
            <label className='block'>Password</label>
            <TextInput password={true} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button onCLick={(e: MouseEvent<HTMLButtonElement>) => onClickhandler(e)}>Submit</Button>
        </form>
      </div>
    </div>
  )
}

export default Login
