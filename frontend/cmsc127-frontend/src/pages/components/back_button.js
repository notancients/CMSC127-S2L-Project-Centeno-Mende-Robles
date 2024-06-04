import {MdArrowBack as Back} from 'react-icons/md'
import { useNavigate, useHistory, useLocation } from 'react-router-dom';

function BackButton({renderAppBar}) {

    const navigate = useNavigate();

    function goBack() {
        navigate(-1);
        renderAppBar();
    };

    return(
    <>
    <Back onClick={goBack}/>
    </>
    )
}

export default BackButton;