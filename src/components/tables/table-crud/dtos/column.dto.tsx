import { ReactElement } from "react";

export interface Column {
  key: string;
  title: string;
  onShow?: (data: unknown) => string;
  component?: (element: unknown) => ReactElement;
}
