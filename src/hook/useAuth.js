import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import { auth } from "../components/Auth/firebase";

const useAuth = () => {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        // console.log(user.accessToken);
    }, [user, loading]);

    // return user;
}

export default useAuth;