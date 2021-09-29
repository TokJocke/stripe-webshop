import { Link } from 'react-router-dom';
import { btnStyle, contentWrapper } from './success';


export default function AuthError401() {


    return (
        <div style={contentWrapper}>
          
             <p>Du är inte inloggad!</p>
             
             <Link to={"/"} >
                <button className="blueBtnEffect" style={btnStyle}>Tillbaka till start</button> 
            </Link>
        </div>
                
    );
}

