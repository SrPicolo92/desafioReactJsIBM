import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { Paper, Typography } from "@material-ui/core";

function ServersTable({ setSelectedRows }) {
  const [loadingData, setLoadingData] = useState(true);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "hostname", headerName: "Hostname", width: 150 },
    { field: "memory", headerName: "Memória", width: 150 },
    { field: "vCpus", headerName: "vCPUs", width: 150 },
    { field: "disk", headerName: "Disco", width: 150 },
    { field: "ip", headerName: "IP", width: 150 },
  ];

  useEffect(() => {
    if (loadingData) {
      getData();
    }
  }, []);

  async function getData() {
    await axios.get("http://localhost:3333/servers").then((response) => {
      fillRows(response.data);
      setLoadingData(false);
    });
  }

  function fillRows(responseData) {
    let rowArray = [];
    for (let count = 0; count < responseData.length; count++) {
      let row;
      row = {
        id: count,
        hostname: responseData[count].hostname,
        memory: responseData[count].configuracao.memoryProvisioned + " GB",
        vCpus: responseData[count].configuracao.cpuProvisioned + " vCPUs",
        disk: responseData[count].configuracao.totalDiskGB + " GB",
        ip: responseData[count].ip,
      };
      rowArray.push(row);
    }
    setRows(rowArray);
  }

  return (
      <Paper
        id="serversTableDiv"
        variant="outlined"
        style={{ height: 500, width: "55%" }}
      >
        <Typography
          sx={{ flex: "1 1 100%" }}
          margin="3% 0% 3% 0%"
          variant="h5"
          component="div"
          className="serversTableTitle"
        >
          Tabela de Servidores
        </Typography>
        {loadingData ? (
          <p>Loading Please Wait...</p>
        ) : (
          <DataGrid
            rows={rows}
            style={{border:"none"}}
            columns={columns}
            checkboxSelection
            onSelectionModelChange={(ids) => {
              const selectedIds = new Set(ids);
              const selectedRowData = rows.filter((row) =>
                selectedIds.has(row.id)
              );
              setSelectedRows(selectedRowData);
            }}
          />
        )}
      </Paper>
  );
}

export default ServersTable;
