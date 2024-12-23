import { useQuery } from "@tanstack/react-query";

export const getRoles = async () => {
  const response = await fetch(`/api/roles`, {
    method: "GET",
  });

  return response;
};

export const getRoleNames = async (
  setRoles: React.Dispatch<React.SetStateAction<any>>
) => {
  try {
    const response = await getRoles();
    if (response.ok) {
      const rolesData = await response.json();

      setRoles(rolesData);
    }
  } catch (error) {}
};

export const useRoleNames = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: () => getRoles(),
  });
};
