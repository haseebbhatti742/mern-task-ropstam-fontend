import React, { useEffect, useState } from "react";
import useAppContext from "../../context/useAppContext";

//mui imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CarRow from "./CarRow";
import jwt from "../../jwtservice/jwtService";

const columns = [
  { id: "category", label: "Category", align:"left" },
  {
    id: "registrationNumber",
    label: "Reg. #",
    align: "right",
  },
  {
    id: "make",
    label: "Make",
    align: "right",
  },
  {
    id: "model",
    label: "Model",
    align: "right",
  },
  {
    id: "color",
    label: "Color",
    align: "right",
  },
  {
    id: "action",
    label: "Action",
    align: "right",
  },
];

function Dashboard() {
  const {getAllCategories, getAllCars, cars} = useAppContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if(jwt.isLogin())
      getAllCategories();
      getAllCars()
    // eslint-disable-next-line
  }, []);

  return <div>
    {cars.length === 0 ? (
        <h3>No cars</h3>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "30px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {cars
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <CarRow columns={columns} row={row} />
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={cars.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
  </div>;
}

export default Dashboard;
