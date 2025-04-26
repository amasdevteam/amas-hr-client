"use client";

import React, { useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Event as EventIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import { TimeOffBalancesRow } from "../../../components/dashboard/time-off/time-off-balances-row";
import { TimeOffLayout } from "../../../components/dashboard/time-off/time-off-layout";
import { UpcomingTimeOff } from "../../../components/dashboard/time-off/upcoming-time-off";
import { RequestTimeOffForm } from "../../../components/dashboard/time-off/request-time-off-form";
import { TimeOffCalendar } from "../../../components/dashboard/time-off/time-off-calender";
import TimeOffHistory from "../../../components/dashboard/time-off/time-off-history";
import { TeamAbsences } from "../../../components/dashboard/time-off/team-absences";

// Sample data
const sampleBalances = {
  vacation: 16,
  sick: 8,
  workFromHome: 12,
};

const sampleUpcomingEvents = [
  {
    id: "1",
    date: "2025-03-31",
    title: "Eid El-Fitr",
    type: "holiday" as const,
    status: "approved" as const,
  },
  {
    id: "2",
    date: "2025-04-07",
    endDate: "2025-04-07",
    title: "Sheikh Abeid Karume Day",
    type: "holiday" as const,
    status: "approved" as const,
  },
  {
    id: "3",
    date: "2025-04-18",
    endDate: "2025-04-18",
    title: "Good Friday",
    type: "holiday" as const,
    status: "approved" as const,
  },
  {
    id: "4",
    date: "2025-05-01",
    endDate: "2025-05-05",
    title: "Family Vacation",
    type: "vacation" as const,
    status: "pending" as const,
  },
];

const calendarEvents = [
  ...sampleUpcomingEvents,
  {
    id: "5",
    date: "2025-04-12",
    title: "Team Building Day",
    type: "meeting" as const,
  },
  {
    id: "6",
    date: "2025-04-15",
    title: "Quarterly Review",
    type: "meeting" as const,
  },
];

type ViewState = "dashboard" | "history" | "request-form";
type HistoryType = "vacation" | "sick" | "wfh";

export function Page() {
  const { t } = useTranslation("timeOff");
  const [activeTab, setActiveTab] = useState(0);
  const [viewState, setViewState] = useState<ViewState>("dashboard");
  const [historyType, setHistoryType] = useState<HistoryType>("vacation");
  const [teamAbsencesOpen, setTeamAbsencesOpen] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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

  const handleViewHistory = (type: HistoryType) => {
    setHistoryType(type);
    setViewState("history");
  };

  const handleBackFromHistory = () => {
    setViewState("dashboard");
  };

  const getTitle = () => {
    if (viewState === "history") {
      return historyType === "vacation"
        ? t("title_vacationHistory")
        : historyType === "sick"
        ? t("title_sickHistory")
        : t("title_wfhHistory");
    }
    if (viewState === "request-form") {
      return t("title_requestForm");
    }
    return t("title_dashboard");
  };

  return (
    <>
      <TimeOffLayout
        title={getTitle()}
        onRequestTimeOff={handleRequestTimeOff}
        onViewTeamAbsences={handleViewTeamAbsences}
        showRequestButton={viewState === "dashboard"}
      >
        {viewState === "request-form" && (
          <RequestTimeOffForm
            onSubmit={handleRequestSubmit}
            onCancel={handleRequestCancel}
          />
        )}

        {viewState === "history" && (
          <TimeOffHistory
            type={historyType}
            onBack={handleBackFromHistory}
          />
        )}

        {viewState === "dashboard" && (
          <>
            <TimeOffBalancesRow
              balances={sampleBalances}
              taken={{ vacation: 5, sick: 2, workFromHome: 3 }} // Example values for taken
              percentages={{ vacation: 31, sick: 25, workFromHome: 25 }} // Example percentages
              onViewHistory={handleViewHistory}
              onRequest={handleRequestTimeOff}
            />

            <Paper
              elevation={0}
              sx={{
                mb: 4,
                borderRadius: 2,
                boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  borderBottom: "1px solid #e0e0e0",
                  "& .MuiTab-root": {
                    py: 1.5,
                  },
                }}
              >
                <Tab label={t("tab_upcoming")} icon={<EventIcon />} iconPosition="start" />
                <Tab label={t("tab_calendar")} />
              </Tabs>

              <Box sx={{ p: { xs: 1, sm: 2 } }}>
                {activeTab === 0 && (
                  <UpcomingTimeOff
                    events={sampleUpcomingEvents}
                    onEdit={(id) => console.log("Edit event:", id)}
                    onCancel={(id) => console.log("Cancel event:", id)}
                  />
                )}

                {activeTab === 1 && (
                  <TimeOffCalendar
                    events={calendarEvents}
                    onDayClick={(date) => console.log("Clicked day:", date)}
                    onEventClick={(event) => console.log("Clicked event:", event)}
                  />
                )}
              </Box>
            </Paper>
          </>
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
