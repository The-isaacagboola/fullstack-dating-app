// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MessageBox({ message }: { message: any }) {
  return <>{JSON.stringify(message)}</>;
}
