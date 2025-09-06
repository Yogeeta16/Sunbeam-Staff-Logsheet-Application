// src/components/Table.jsx
import React from "react";
import { cn } from "../../utils/cn";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="table-wrapper">
    <table ref={ref} className={cn("table", className)} {...props} />
  </div>
));
Table.displayName = "Table";

const TableHeader = (props) => <thead className="table-header" {...props} />;
const TableBody = (props) => <tbody className="table-body" {...props} />;
const TableFooter = (props) => <tfoot className="table-footer" {...props} />;
const TableRow = (props) => <tr className="table-row" {...props} />;
const TableHead = (props) => <th className="table-head" {...props} />;
const TableCell = (props) => <td className="table-cell" {...props} />;
const TableCaption = (props) => <caption className="table-caption" {...props} />;

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
