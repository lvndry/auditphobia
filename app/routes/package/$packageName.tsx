import { LoaderFunction, useLoaderData } from "remix";

type LoaderData = {
  packageName: string;
};

export const loader: LoaderFunction = async ({ params }) => {
  if (params.packageName) {
    const data: LoaderData = {
      packageName: params.packageName,
    };

    return data;
  }

  return null;
};

const PackageNamePage = () => {
  const { packageName } = useLoaderData<LoaderData>();
  return <div>{packageName}</div>;
};

export default PackageNamePage;
