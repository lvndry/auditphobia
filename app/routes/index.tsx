import { LoaderFunction, useLoaderData } from "remix";


export default function Index() {
  const data = useLoaderData<{ packageName: string }>();
  console.log(data);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Auditphobia</h1>
      <form method="post" action="/search">
        <input type="text" name="packageName" placeholder="Find pacakge" />
      </form>
    </div>
  );
}
