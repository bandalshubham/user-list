import React from "react";
import "../user-list/user-list.css"
import { ReactComponent as NextIcon } from '../../../assets/images/next.svg';
import { ReactComponent as PreviousIcon } from '../../../assets/images/previous.svg';
import "../../../assets/styles/styles.css"


const Pagination = ({totalPages,currentPage,setCurrentPage,users,pageSize})=>{

    const previousPage = ()=> {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
      }
    
    const nextPage=()=> {
        console.log("next");
        const totalPages1 = Math.ceil(users.length / pageSize);
        if (currentPage < totalPages1) {
            setCurrentPage(currentPage + 1);
        }
      }
    
    const  goToPage=(page) =>{
        if (page >= 1 && page <= Math.ceil(users.length / pageSize)) {
            setCurrentPage(page);
        }
      }

    return(
        <>
    <div class="pagination">
                    <div class="pagination-list">
                        {currentPage !== 1 ? 
                            <PreviousIcon icon="navigate_before"  onClick={() => previousPage()} class="sides-pagination sides--1hH+u" />
                        : 
                            <PreviousIcon icon="navigate_before" class="sides-pagination sides--1hH+u previous-opt" />
                        }
                        
                        {totalPages > 3 && currentPage > 2 ? 
                        <>
                            <button class="pageItem" onClick={() => goToPage(1)}>1</button>
                            {currentPage > 3 ? <span>...</span> : ''}
                            </>
                         : ''}
                        
                        {Array.from({ length: totalPages }, (_, index) => index + 1)
                            .slice(Math.max(0, Math.min(totalPages - 3, currentPage - 2)), Math.min(totalPages, Math.max(3, currentPage + 1)))
                            .map((page, _index) => 
                                <button  className={`pageItem ${currentPage === page ? "active-page" : ""}`}  onClick={() => goToPage(page)}>{page}</button>
                        )}
                        
                        {totalPages > 3 && currentPage < totalPages - 1 && (
                           <>
                            {currentPage < totalPages - 2 && <span>...</span>}
                                  <button className="pageItem" onClick={() => goToPage(totalPages)}>{totalPages}</button>
                               </>
                               )}
                        
                        {currentPage !== totalPages ? 
                            <NextIcon  onClick={() => nextPage()} class="sides-pagination sides--1hH+u"/>
                         : 
                            <NextIcon icon="navigate_next" class="sides-pagination sides--1hH+u next-opt"/>
                        }
                    </div>
                </div>
        </>
    )
    
}

export default Pagination;