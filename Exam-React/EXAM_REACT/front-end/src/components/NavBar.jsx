/* eslint-disable no-unused-vars */
import Logout from "./Logout"

const NavBar = () => {
  return (
<>
<header
      className="bg-blue-500 text-white p-4 flex justify-between items-center "
    >
      <nav className="flex space-x-4">
        <a href="/home"  className="bg-white text-blue-500 rounded px-4 py-1">Home</a>
        <a href="/addAppointment"  className="bg-white text-blue-500 rounded px-4 py-1">Add New Appointmnent</a>

      </nav>
<Logout/>
    </header>
</>  )
}

export default NavBar