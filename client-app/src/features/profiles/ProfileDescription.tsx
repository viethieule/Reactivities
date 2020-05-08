import React, { useContext, useState, Fragment } from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../app/stores/rootStore";
import ProfileEditForm from "./ProfileEditForm";

const ProfileDescription = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    editProfile
  } = rootStore.profileStore;
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated="left" icon="edit" content={`About ${profile!.username}`} />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "Cancel" : "Edit profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? <ProfileEditForm editProfile={editProfile} profile={profile!} setEditMode={setEditMode} /> : <p>{profile!.bio}</p>}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default ProfileDescription;
