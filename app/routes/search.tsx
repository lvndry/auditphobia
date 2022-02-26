import { ActionFunction, redirect } from "remix";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const packageName = formData.get("packageName");

  return redirect(`package/${packageName}`);
};
