import HomeScreen from "./HomeScreen";
import AuthScreen from "./AuthScreen";
import { userAuthStore } from "../../store/authStore";

const HomePage = () => {
  const {user}=userAuthStore() ;
  return  <div> {user ? <HomeScreen/>  : <AuthScreen />}
</div>
}
export default HomePage;