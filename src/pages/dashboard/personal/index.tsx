"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Dialog,
  DialogContent,
} from "@mui/material";

import { useTranslation } from "react-i18next";

import { TimeOffLayout } from "../../../components/dashboard/time-off/time-off-layout";
import { TeamAbsences } from "../../../components/dashboard/time-off/team-absences";
import { RequestTimeOffForm } from "../../../components/dashboard/time-off/request-time-off-form";
import { PersonalInfoPanel } from "../../../components/dashboard/personal/personal-info-panel"; // 🆕 import your component

type ViewState = "dashboard" | "request-form";

export function Page() {
  const { t } = useTranslation("personal");
  const [viewState, setViewState] = useState<ViewState>("dashboard");
  const [teamAbsencesOpen, setTeamAbsencesOpen] = useState(false);

  const handleRequestTimeOff = () => setViewState("request-form");
  const handleViewTeamAbsences = () => setTeamAbsencesOpen(true);
  const handleCloseTeamAbsences = () => setTeamAbsencesOpen(false);

  const handleRequestSubmit = (data: any) => {
    console.log("Submitted request:", data);
    setViewState("dashboard");
  };

  const handleRequestCancel = () => {
    setViewState("dashboard");
  };

  const getTitle = () => t("title_personal");

  return (
    <>
      <TimeOffLayout
        title={getTitle()}
        onRequestTimeOff={handleRequestTimeOff}
        onViewTeamAbsences={handleViewTeamAbsences}
        showRequestButton={viewState === "dashboard"}
      >
        {viewState === "request-form" ? (
          <RequestTimeOffForm
            onSubmit={handleRequestSubmit}
            onCancel={handleRequestCancel}
          />
        ) : (
          <Paper elevation={1} sx={{ p: { xs: 1, sm: 2 }, borderRadius: 2 }}>
            <PersonalInfoPanel />
          </Paper>
        )}
      </TimeOffLayout>

      <Dialog
        open={teamAbsencesOpen}
        onClose={handleCloseTeamAbsences}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0 }}>
          <TeamAbsences onClose={handleCloseTeamAbsences} />
        </DialogContent>
      </Dialog>
    </>
  );
}
