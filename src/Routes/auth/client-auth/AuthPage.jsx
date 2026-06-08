import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Footer from '../../../components/Footer';
import { useAuthUser } from '../../../app-context/user-context';

const AuthPage = () => {
    const navigate = useNavigate();

    const { authUser } = useAuthUser();
    const user = authUser();

    useEffect(() => {
        if (user) {
          navigate("/dashboard");
        }
    }, []);

    return (
        <div>
            <div className="d-flex flex-column mt-5 container" style={{minHeight: '60vh'}}>
                <div className='row'>
                    <div className="col-md-4 col-sm-12 mb-5">
                        <Login />
                    </div>
                    <div className="col-md-8 col-sm-12 mb-5">
                        <Signup />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AuthPage;