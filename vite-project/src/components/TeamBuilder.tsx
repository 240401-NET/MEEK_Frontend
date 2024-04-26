import './TeamBuilder.css'
import {NavLink as Link} from "react-router-dom"

export function TeamBuilder()
{
    return (
        <div>
            <p>WOO linking worked</p>
            <Link to="/trainer">
                <button>Show all trainer teams</button>
            </Link>
            <Link to="/">
                <button>Logout</button>
            </Link>
            <div id="teamBuildingContainer">
                <div id="currentActiveTeamMembers">
                    
                </div>
            </div>
        </div>
    )
}