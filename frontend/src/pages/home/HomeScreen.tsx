import { userAuthStore } from "../../store/authStore";
const HomeScreen = () => {
    const {logout}=userAuthStore();
return(
  <div>
    <button onClick={logout}>Logout</button>
    </div>
    );
}
export default HomeScreen;