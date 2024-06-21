import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Dockerlogs = () => {
    const [logs, setLogs] = useState("");

    useEffect(() => {
        const retrieveLogs = async () => {
            try {
                const response = await axios.get("http://localhost:3001/logs");
                setLogs(response.data);
            } catch (error) {
                console.error("Error retrieving logs:", error);
            }
        };

        retrieveLogs();
    }, []);

    return (
        <Box sx={{ p: 2, maxHeight: '300px', overflow: 'auto', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: 'black' }}>
            <Typography variant="h6" gutterBottom>Docker Container Logs</Typography>
            <Typography variant="body1">{logs}</Typography>
        </Box>
    );
};

export default Dockerlogs;
