import React from "react";
import type { Schema } from "@/amplify/data/resource";
import { SelectionSet } from "aws-amplify/api";
import Link from "next/link";

const dashboardSelectionSet = [
  "id",
  "title",
  "description",
  "priority",
  "status",
  "tasks.title",
  "tasks.status",
] as const;
type DashboardProject = SelectionSet<
  Schema["Project"]["type"],
  typeof dashboardSelectionSet
>;

const Project: React.FC<DashboardProject> = ({ ...props }) => {
  return (
    <div>
      <div className="relative flex flex-col m-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
        <div className="p-4">
          <h5 className="mb-2 text-slate-800 text-xl font-semibold">
            {props.title}
          </h5>
          <p className="text-slate-600 leading-normal font-light">
            {props.description}
          </p>
          <p>{props.priority}</p>
          <p>{props.status}</p>
          <p className="py-2">Number of tasks: {props.tasks.length}</p>

          <Link
            href={`/projects/${props.id}`}
            key={props.id}
            className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            View Project Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Project;
