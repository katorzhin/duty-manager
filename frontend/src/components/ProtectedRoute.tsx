import {Navigate} from "react-router-dom";
import type {ReactNode} from "react";
import {permissions, type UserRole} from "../permissions/permissions.ts";

type Permission = keyof typeof permissions.ADMIN;

type Props = {
    children: ReactNode;
    permission?: Permission;
};

export default function ProtectedRoute({
                                           children,
                                           permission,
                                       }: Props) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as UserRole | null;

    if (!token || !role) {
        return <Navigate to="/login" replace/>;
    }

    if (permission && !permissions[role][permission]) {
        return <Navigate to="/" replace/>;
    }

    return <>{children}</>;
}