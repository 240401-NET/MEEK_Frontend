import './TrainerPage.css'
import {NavLink as Link} from "react-router-dom"
import { useState, useEffect} from 'react';

export function TrainerPage()
{
    const [name, setName] = useState("");

    useEffect(()=> {
        // create call to get trainer name;
        // pass that name into the setName (useState function)
        setName("Red")
    })
    
    return (
        <div id="trainerContainer">
            <div id="trainerHeadingDiv">
                <p id='trainerid' >{name}</p>
                <Link to="/">
                    <button>Logout</button>
                </Link>
            </div>
            
            {/* need to create functions that uses team id and loads sprites, and names of each pokemon on team */}
            <div className="trainerTeamContainer" >
                <div className="teamMember">
                    <p>team member 1</p>
                    <p>sprite:</p>
                </div>
                <div className="teamMember">
                    <p>team member 2</p>
                    <p>sprite:</p>
                </div>
                <div className="teamMember">
                    <p>team member 3</p>
                    <p>sprite:</p>
                </div>
                <div className="teamMember">
                    <p>team member 4</p>
                    <p>sprite:</p>
                </div>
                <div className="teamMember">
                    <p>team member 5</p>
                    <p>sprite:</p>
                </div>
                <div className="teamMember">
                    <p>team member 6</p>
                    <p>sprite:</p>
                </div>
                <div className='teamOptionsDiv'>
                    <Link to="/teambuilder">
                        <button type="button">Create new team</button>
                    </Link>
                    {/* Need function to handle onclick event for deleting team based of trainer id */}
                    <button type="button">Delete Team</button>
                </div>

                {/* Need function to auto generate the above div layout with specific  */}
            </div>
        </div>
    )
}