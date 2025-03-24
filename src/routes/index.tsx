import * as React from "react";
import { Navigate, type RouteObject } from "react-router-dom";

import { Page as NotFoundPage } from "@/pages/not-found";

import { route as dashboardRoute } from "./dashboard";
import { route as landingRoute } from "./landing";

export const routes: RouteObject[] = [
	landingRoute,
	// { index: true, element: <Navigate to="/landing" /> },
	{
		path: "errors",
		children: [
			{
				path: "internal-server-error",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/internal-server-error");
					return { Component: Page };
				},
			},
			{
				path: "not-authorized",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/not-authorized");
					return { Component: Page };
				},
			},
			{
				path: "not-found",
				lazy: async () => {
					const { Page } = await import("@/pages/errors/not-found");
					return { Component: Page };
				},
			},
		],
	},
	dashboardRoute, 
	// landingRoute,
	{ path: "*", element: <NotFoundPage /> },
];
