import { LoaderFunction, useLoaderData } from "remix"

type LoaderData = {
    packageName: string;
}

export const loader: LoaderFunction = async ({ params }) => {
    const data: LoaderData = {
        packageName: params.packageName ?? "no name"
    }

    return data;
}

const PackageNamePage = () => {
    const { packageName } = useLoaderData<LoaderData>();
    return <div>{packageName}</div>
}

export default PackageNamePage;
