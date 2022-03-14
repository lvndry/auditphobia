import { Form, json, LoaderFunction, useLoaderData, useSubmit } from "remix";

interface NPMSPackage {
  package: {
    name: string;
    scope: string;
    version: `${number}.${number}.${number}`;
    description: string;
    keywords: string[];
    date: string;
    links: {
      npm: string;
      homepage: string;
      repository: string;
      bugs: string;
    };
    author: {
      name: string;
    };
    publisher: {
      username: string;
      email: string;
    };
    maintainers: [
      {
        username: string;
        email: string;
      }
    ];
  };
  score: {
    final: number;
    detail: {
      quality: number;
      popularity: number;
      maintenance: number;
    };
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (query) {
    const LIMIT = 5;
    const NPMS_ENDPOINT = `https://api.npms.io/v2/search/suggestions?size=${LIMIT}&q=${query}`;
    const response = await fetch(NPMS_ENDPOINT);
    const packages: NPMSPackage[] = await response.json();
    return json(packages);
  }

  return json({});
};

export default function Index() {
  const submit = useSubmit();
  const packages: NPMSPackage[] = useLoaderData();

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    submit(event.currentTarget);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Auditphobia</h1>
      <Form autoComplete="off" onChange={(event) => handleChange(event)}>
        <input type="text" name="query" placeholder="find pacakge" />
      </Form>
      <div>
        {packages.length
          ? packages.map((p) => {
              return <div>{p.package.name}</div>;
            })
          : null}
      </div>
    </div>
  );
}
