import { ReactNode } from "react";

export default function InProgress({ children }: { children: ReactNode }) {
    return (import.meta.env.DEV ? <>{children}</> : <h1 className="m-5">Page in progress</h1>)
}