const ProfileIcon = ({ profileName }: { profileName: string }) => {
  return (
    <div className="bg-accent text-accent-foreground mr-4 flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold">
      {profileName.charAt(0).toUpperCase()}
    </div>
  );
};

export default ProfileIcon;
