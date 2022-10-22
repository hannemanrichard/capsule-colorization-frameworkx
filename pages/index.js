import Head from "next/head";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Sequence from "../components/Sequence";
import CapturedImages from "../components/CapturedImages";

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      {/* Content */}
      <div className="w-full ml-32 min-h-screen">
        <Header />
        <div className="flex">
          <CapturedImages />
        </div>
        {/* <Sequence /> */}
      </div>
      {/* Header */}
      {/* SequenceSlider */}

      {/* DiagnosisWrapper */}
      {/* CapturedImages */}
      {/* PreviewImage */}
    </div>
  );
}
