import type { Access } from "payload/config";
import type { FieldAccess } from "payload/types";

import type { User } from "@/payload-types";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
	if (user) {
		if (user.roles?.includes("admin")) {
			return true;
		}
		return {
			id: {
				equals: user.id,
			},
		};
	}

	return false;
};

export const isAdminOrSelfFieldLevel: FieldAccess<{ id: string }, User> = ({
	req: { user },
	id,
}) => {
	if (user?.roles?.includes("admin")) return true;
	if (user?.id === id) return true;
	return false;
};
