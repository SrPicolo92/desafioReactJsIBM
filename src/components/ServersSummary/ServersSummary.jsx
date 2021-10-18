import React, { useEffect, useState } from "react";

function ServersSummary({ selectedRows }) {
  const [rows, setRows] = useState([
    {
      id: 1,
      dataName: "Servidores Selecionados",
      dataResults: 0 + " servidores selecionados",
    },
    { id: 2, dataName: "Total de Memória", dataResults: 0 + " GB" },
    { id: 3, dataName: "Total de CPUs", dataResults: 0 + " vCPUs" },
    { id: 4, dataName: "Total de Discos", dataResults: 0 + " GB" },
  ]);

  useEffect(() => {
    fillRows(selectedRows);
  }, [selectedRows]);

  function fillRows(newRows) {
    let selectedServersNum = newRows.length;
    let memoryTotal = 0;
    let cpuTotal = 0;
    let diskTotal = 0;

    for (let count = 0; count < newRows.length; count++) {
      let formatedMemory = parseFloat(
        newRows[count].memory.replace(/[^\d.-]/g, "")
      );
      memoryTotal = memoryTotal + formatedMemory;
      let formatedCPU = parseInt(newRows[count].vCpus.replace(/[^\d.-]/g, ""));
      cpuTotal = cpuTotal + formatedCPU;
      let formatedDisk = parseFloat(
        newRows[count].disk.replace(/[^\d.-]/g, "")
      );
      diskTotal = diskTotal + formatedDisk;
    }

    let rows = [
      {
        id: 1,
        dataName: "Servidores Selecionados",
        dataResults: selectedServersNum + " servidores selecionados",
      },
      { id: 2, dataName: "Total de Memória", dataResults: memoryTotal + " GB" },
      { id: 3, dataName: "Total de CPUs", dataResults: cpuTotal + " vCPUs" },
      { id: 4, dataName: "Total de Discos", dataResults: diskTotal + " GB" },
    ];

    setRows(rows);
  }

  return (
    <div className="serverSummaryDiv">
      <div className="tituloServerSummaryDiv">
        Sumário dos Recursos dos Servidores
      </div>
      <table>
        <tbody>
          <tr>
            <td className="tdTitle">Servidores Selecionados: </td>
            <td>{rows[0].dataResults}</td>
          </tr>
          <tr>
            <td className="tdTitle">Total de Memória: </td>
            <td>{rows[1].dataResults}</td>
          </tr>
          <tr>
            <td className="tdTitle">Total de CPUs:</td>
            <td>{rows[2].dataResults}</td>
          </tr>
          <tr>
            <td className="tdTitle">Total de Discos:</td>
            <td>{rows[3].dataResults}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ServersSummary;
