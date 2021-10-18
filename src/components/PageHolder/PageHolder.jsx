import React, { useState } from "react";
import ServersSummary from "../ServersSummary/ServersSummary";
import ServersTable from "../ServersTable/ServersTable";

function PageHolder() {
  const [selectedRows, setSelectedRows] = useState([]);
  return (
    <div className="topDiv">
      <div className="pageHolderDiv">
        <ServersSummary selectedRows={selectedRows} />
        <ServersTable setSelectedRows={setSelectedRows} />
      </div>
    </div>
  );
}

export default PageHolder;
