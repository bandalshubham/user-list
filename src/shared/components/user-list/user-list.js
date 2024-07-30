import React, { useContext, useState } from "react";
import "./user-list.css";
import UserListContext from "../../../context/userList-context";
import UserSelect from "../common/select";
import Pagination from "../common/pagination";
import pixlogo from "../../../assets/images/pixlogo.jpg";
import { ReactComponent as MenuIcon } from '../../../assets/images/menu.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/images/arrowUpIcon.svg';
import { ReactComponent as ArrowDownIcon } from '../../../assets/images/arrowDownIcon.svg';


const UserLists = () => {
    const [sortColumn, setSortColumn] = useState("id");
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedCountry, setSelectedCountrytOrder] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const { users,sortedAndFilteredUsers,usersOriginal } = useContext(UserListContext);
    
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    

    const handleSort = (column) => {
        console.log(column);
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        sortedAndFilteredUsers(sortOrder,sortColumn)

        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
        sortedAndFilteredUsers(sortOrder,sortColumn)
    };

    const handleCountrySelected = (e)=>{
        setSelectedCountrytOrder(e.target.value);
        sortedAndFilteredUsers(e.target.value,"")
      }

      const handleGenderSelected = (e)=>{
          setSelectedGender(e.target.value);    
          sortedAndFilteredUsers(e.target.value,"");
      }

    const totalPages = Math.ceil(users.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageUsers = users.slice(startIndex, endIndex);

    return (
        <>
            <div class="container">
                <header class="logo">
                        <div>
                        <img src={pixlogo} width="50px" alt="Pixel6 Logo" />
                    </div>
                        <MenuIcon className="menu_icon" width={24} height={24} />
                </header>
                <div class="filters">
                    <h2>Employees</h2>
                    <div className="filter_container">
                        <UserSelect usercountry={usersOriginal} selectedValue={selectedCountry} handleSelect={(e)=>handleCountrySelected(e)} valuekey="address.country" />
                        <UserSelect usercountry={usersOriginal} selectedValue={selectedGender} handleSelect={(e)=>handleGenderSelected(e)} valuekey="gender" />
                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('id')}>ID
                            {sortColumn == 'id' && (sortOrder == 'asc' ? <ArrowUpIcon className="arrow_icon" /> : <ArrowDownIcon className="arrow_icon"  />)}
                            </th>
                            <th>Image</th>
                            <th onClick={() => handleSort('firstName')}>Full Name 
                                {sortColumn == 'firstName' && (sortOrder == 'asc' ? <ArrowUpIcon className="arrow_icon"  /> : <ArrowDownIcon className="arrow_icon"  />)}</th>
                            <th onClick={() => handleSort('age')}>Demography
                            {sortColumn == 'age' && (sortOrder == 'asc' ? <ArrowUpIcon className="arrow_icon"  /> : <ArrowDownIcon className="arrow_icon"  />)}
                            </th>
                            <th>Designation</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><img src={user.image} alt={user.name} width="50" /></td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{`${user.gender}/${user.age}`}</td>
                                <td>{user.company.title}</td>
                                <td>{user.address.state}, {user.address.country}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {totalPages > 1 ?
                    <Pagination totalPages={totalPages} users={users} pageSize={pageSize} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                    : ''}
            </div>
        </>
    )
}

export default UserLists;