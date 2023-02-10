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
    <div className='container grid place-items-center'>
      <PageTitle>This is the Login page</PageTitle>
      <p className='text-red-700 font-bold'>{errorMsg}</p>
      <form>
        <label>Username:<br />
          <TextInput value={uname} onChange={e => setUname(e.target.value)} />
        </label>
        <br />
        <label>Password:<br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="border border-zinc-200 rounded-lg" />
        </label>
        <Button onCLick={(e: MouseEvent<HTMLButtonElement>) => onClickhandler(e)}>Submit</Button>
      </form>
    </div>
  )
}

export default Login
