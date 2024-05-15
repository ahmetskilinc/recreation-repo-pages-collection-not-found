import type { Access, FieldAccess } from "payload/types";

import type { User } from "@/payload-types";

export const isAdmin: Access<User> = ({ req: { user } }) => {
	return Boolean(user?.roles?.includes("admin"));
};

export const isAdminFieldLevel: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
	return Boolean(user?.roles?.includes("admin"));
};
