import { useGlobalContext } from "~/components/context/GlobalContext";

export default function Profile() {
  const { userState } = useGlobalContext();
  const data = userState.get();
  console.log("Here is the context data:", data);
  
  return <div>Profile</div>;
}
