import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Index from "./routes/Index";
import Download from "./routes/Home";
import "antd/dist/antd.min.css";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route>
            <Route index path="/" element={<Index />} />
            <Route path="/home" element={<Download />} />
          </Route>
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
