import React from "react";
import type { Schema } from "@/amplify/data/resource";
import { SelectionSet } from "aws-amplify/api";
import Link from "next/link";
import { convertStatusText } from "../projects/utils";

const dashboardSelectionSet = [
  "id",
  "title",
  "description",
  "priority",
  "status",
  "updatedAt",
  "tasks.title",
  "tasks.status",
] as const;
type DashboardProject = SelectionSet<
  Schema["Project"]["type"],
  typeof dashboardSelectionSet
>;

const Project: React.FC<DashboardProject> = ({ ...props }) => {
  return (
    <div className="relative flex flex-col m-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 min-h-140">
      <div className="p-4">
        <h5 className="mb-2 text-slate-800 text-xl font-semibold">
          <span className="font-semibold">Project /</span>{" "}
          {props.title ? props.title : `N/A`}
        </h5>
        <p className="text-slate-600 leading-normal font-light pb-2">
          {props.description}
        </p>
        <p>
          {" "}
          <span className="font-bold">Priority: </span>{" "}
          {props.priority
            ? props.priority[0].toUpperCase() + props.priority.slice(1)
            : "N/A"}
        </p>
        <p>
          {" "}
          <span className="font-bold">Status:</span>{" "}
          {convertStatusText(props.status)}
        </p>
        <p>
          <span className="font-bold">Tasks:</span> {props.tasks.length}
        </p>

        <div className="py-4">
          {" "}
          <Link
            href={`/projects/${props.id}`}
            key={props.id}
            className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Project Details
          </Link>
        </div>
        <hr />
        <div className="pt-3">Last Updated: {props.updatedAt}</div>
      </div>
    </div>
  );
};

export default Project;
