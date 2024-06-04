import {MdArrowBack as Back} from 'react-icons/md'
import { useNavigate, useHistory, useLocation } from 'react-router-dom';

function BackButton() {

    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
    };

    return(
    <>
    <Back onClick={goBack}/>
    </>
    )
}

export default BackButton;