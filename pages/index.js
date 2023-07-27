import Head from "next/head";
import { getDownloadURL, ref } from "firebase/storage";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Sequence from "../components/Sequence";
import CapturedImages from "../components/CapturedImages";
import supabase, { storage } from "../firebase-config";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [triggerColorize, setTriggerColorize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isColorized, setIsColorized] = useState(false);
  const [limit, setLimit] = useState(5);

  const handleIsColorized = (newValue) => {
    setIsColorized(newValue);
  };

  const handleLoading = (newValue) => {
    setLoading(newValue);
  };

  const handleTriggerColorizeChange = (newValue) => {
    setTriggerColorize(newValue);
  };

  const handleLimitChange = (newValue) => {
    setLimit(newValue);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <div className="w-full ml-32 min-h-screen">
        <Header
          loading={loading}
          isColorized={isColorized}
          onTriggerColorize={handleTriggerColorizeChange}
          handleLimit={handleLimitChange}
          limit={limit}
        />
        <div className="flex">
          <CapturedImages
            handleLoading={handleLoading}
            triggerColorize={triggerColorize}
            handleIsColorized={handleIsColorized}
            limit={limit}
          />
        </div>
        {/* <Sequence /> */}
      </div>
    </div>
  );
}
