import Head from "next/head";
import { getDownloadURL, ref } from "firebase/storage";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Sequence from "../components/Sequence";
import CapturedImages from "../components/CapturedImages";
import supabase, { storage } from "../firebase-config";
import { useEffect, useState } from "react";
import axios from "axios";

import { sequence1, sequence2, sequence3 } from "../data/seq";

export default function Home() {
  const [triggerColorize, setTriggerColorize] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isColorized, setIsColorized] = useState(false);
  const [limit, setLimit] = useState(5);
  const [selectedSequence, setSelectedSequence] = useState("sequence1");
  const [selectedSequenceImages, setSelectedSequenceImages] =
    useState(sequence1);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleSequenceChange = (newVal, newSeq) => {
    setSelectedSequence(newVal);
    setSelectedSequenceImages(newSeq);
    // console.log(newSeq);
  };

  return (
    <div className="flex">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="How to use this app?">
          {"How to use this app?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Step 1 - Choose a sequence
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Step 2 - Choose an emergency image number
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Step 3 - Click colorize
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Continue</Button>
        </DialogActions>
      </Dialog>
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
          sequence={selectedSequence}
          onSequenceChange={handleSequenceChange}
        />
        <div className="flex">
          <CapturedImages
            handleLoading={handleLoading}
            triggerColorize={triggerColorize}
            handleIsColorized={handleIsColorized}
            limit={limit}
            selectedSequence={selectedSequence}
            selectedSequenceImages={selectedSequenceImages}
            selectedSequenceChange={handleSequenceChange}
          />
        </div>
        {/* <Sequence /> */}
      </div>
    </div>
  );
}
