import Head from 'next/head'
import {login, loginB, logout} from "../store/authSlices";
import {wrapper} from '../store'
import {useSelector, useDispatch} from "react-redux";

export default function Home() {

  const dispatch = useDispatch();

  function gotoLogin(userName) {
    dispatch(login({
      userName
    }))
  }

  function gotoLogout() {
    dispatch(logout())
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <span style={{cursor: 'pointer'}} onClick={() => gotoLogin('A')}>
          <h3>Login UserA</h3>
        </span>
        <span style={{cursor: 'pointer'}} onClick={() => gotoLogin('B')}>
          <h3>Login UserB</h3>
        </span>
        <span style={{cursor: 'pointer'}} onClick={gotoLogout}>
          <h3>Logout</h3>
        </span>
      </main>
    </div>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {

  return {
    props: {}
  };
});
