import { Box, Typography, } from "@mui/material";

const StatusCard = ({ number, text }) => {
    return (
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "1rem 2rem",
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "200px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {number}
        </Typography>
        <Typography sx={{ mt: "0.5rem", color: "#666" }}>{text}</Typography>
      </Box>
    );
  };

  export default StatusCard;