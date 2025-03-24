import * as React from "react";
import type { RouteObject } from "react-router-dom";

export const route: RouteObject = {
	path: "/",
	lazy: async () => {
		const { Page } = await import("@/pages/landing");
		return { Component: Page };
	},
};