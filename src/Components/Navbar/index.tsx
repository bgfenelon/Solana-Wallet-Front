import { NavBar } from "./style"

interface Props {
name: string
}
export const Navbar = ({name} : Props)=> {
return(<>
        <NavBar>
        <button onClick={() => window.history.back()}>← Back</button>
        <h2>{name}</h2>
        <h2></h2>
      </NavBar>
</>)
}

export default Navbar