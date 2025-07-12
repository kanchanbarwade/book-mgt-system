import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast } from "react-toastify";
import { getIssuedBooks, returnBook } from "../../services/issueService";

function IssuedBooks() {
  const [issues, setIssues] = useState([]);
  const [user, setUser] = useState({});

  const fetchIssues = async () => {
    try {
      const res = await getIssuedBooks();
      setIssues(res);
    } catch (err) {
      toast.error("Failed to fetch issued books");
    }
  };

  useEffect(() => {
    fetchIssues();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleReturn = async (issueId) => {
    try {
      await returnBook(issueId);
      toast.success("Book returned");
      fetchIssues(); // refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || "Return failed");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f1f8e9" }}>
        <Typography variant="h5" gutterBottom>
          {user?.role === "admin" ? "All Issued Books" : "My Issued Books"}
        </Typography>

        {issues.length === 0 ? (
          <Typography sx={{ mt: 2 }}>No issued books found.</Typography>
        ) : (
          <Table size="small">
            <TableHead sx={{ backgroundColor: "#c8e6c9" }}>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Returned</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue._id} hover>
                  <TableCell>{issue.book?.title}</TableCell>
                  <TableCell>{issue.userEmail}</TableCell>
                  <TableCell>
                    {new Date(issue.issueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{issue.returned ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {!issue.returned && (
                      <Button
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#64b5f6" }}
                        onClick={() => handleReturn(issue._id)}
                      >
                        Return
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}

export default IssuedBooks;
