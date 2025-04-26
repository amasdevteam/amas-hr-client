import * as React from "react";
import { Outlet } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import { Layout as DashboardLayout } from "@/components/dashboard/layout/layout";

export const route: RouteObject = {
	path: "dashboard",
	element: (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	),
	children: [
		{
		  index: true,
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/overview");
			return { Component: Page };
		  },
		},
		// {
		//   path: "blank",
		//   lazy: async () => {
		// 	const { Page } = await import("@/pages/dashboard/blank");
		// 	return { Component: Page };
		//   },
		// },
		{
		  path: "performance",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/performance/index");
			return { Component: Page };
		  },
		},
		{
		  path: "training",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/training/index");
			return { Component: Page };
		  },
		},
		{
		  path: "personal",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/personal/index");
			return { Component: Page };
		  },
		},
		{
		  path: "job",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/job/index");
			return { Component: Page };
		  },
		},
		{
		  path: "time-off",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/time-off/index");
			return { Component: Page };
		  },
		},
		{
		  path: "emergency",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/emergency/index");
			return { Component: Page };
		  },
		},
		{
		  path: "benefits",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/benefits/index");
			return { Component: Page };
		  },
		},
		{
		  path: "documents",
		  lazy: async () => {
			const { Page } = await import("@/pages/dashboard/documents/index");
			return { Component: Page };
		  },
		},
		{
			path: "payroll",
			lazy: async () => {
			  const { Page } = await import("@/pages/dashboard/payroll/index");
			  return { Component: Page };
			},
		},
		{
			path: "employees",
			lazy: async () => {
			  const { Page } = await import("@/pages/dashboard/employees/index");
			  return { Component: Page };
			},
		},
	  ],
	  
};
