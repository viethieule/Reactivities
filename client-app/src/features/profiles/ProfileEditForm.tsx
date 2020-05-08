import React from "react";
import { IProfile } from "../../app/models/profile";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import { combineValidators, isRequired } from "revalidate";

interface IProps {
  editProfile: (profile: Partial<IProfile>) => Promise<void>;
  profile: IProfile;
  setEditMode: (editMode: boolean) => void;
}

const validate = combineValidators({
  displayName: isRequired("displayName"),
});

const ProfileEditForm: React.FC<IProps> = ({
  editProfile,
  profile,
  setEditMode,
}) => {
  const handleFinalFormSubmit = async (values: any) => {
    const { displayName, bio } = values;
    await editProfile({ displayName, bio });
    setEditMode(false);
  };
  return (
    <FinalForm
      validate={validate}
      initialValues={profile}
      onSubmit={handleFinalFormSubmit}
      render={({ handleSubmit, submitting, pristine, invalid }) => (
        <Form onSubmit={handleSubmit} error>
          <Field
            name="displayName"
            value={profile!.displayName}
            placehold="Display name"
            component={TextInput}
          />
          <Field
            name="bio"
            value={profile!.bio}
            placehold="Bio"
            rows={3}
            component={TextAreaInput}
          />
          <Button
            loading={submitting}
            disabled={invalid || pristine}
            floated="right"
            positive
            type="submit"
            content="Update profile"
          />
        </Form>
      )}
    />
  );
};

export default ProfileEditForm;
