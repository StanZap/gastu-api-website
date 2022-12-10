import { useEffect } from "react";
import { useStore } from "../store";
import { fetchProfile } from "../services/ProfileService";

const useProfileData = (deps = []) => {
  const { profileData, setProfileData } = useStore((state) => {
    return {
      profileData: state.profileData,
      setProfileData: state.setProfileData,
    };
  });

  useEffect(() => {
    if (!profileData) {
      fetchProfile().then((resp) => {
        setProfileData(resp.data.data);
      });
    }
  }, [profileData, ...deps]);

  return profileData;
};

export default useProfileData;
