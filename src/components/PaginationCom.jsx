import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PaginationCom = ({ totalPages, currentPage, onPageChange }) => {
    return (
        <div className="d-flex justify-content-end mt-4 me-5">
            <Pagination>
                <Pagination.Prev
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                        key={i + 1}
                        active={i + 1 === currentPage}
                        onClick={() => onPageChange(i + 1)}
                    >
                        {i + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
};

export default PaginationCom;

