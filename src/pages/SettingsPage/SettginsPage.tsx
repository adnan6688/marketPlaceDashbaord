import { useRef, useState } from "react";
import {
  Upload,
  User,
  Save,
  Camera,
  KeyRound,
} from "lucide-react";
import AuthHook from "../../Hooks/AuthHook";
import userPhoto from "./unknown.png";
import { updateUserInfo } from "./settings";
import Toast from "../../components/Toast";

const SettginsPage = () => {
  const { user, refetchUser } = AuthHook();

  const [name, setName] = useState(user?.fullName || "");
  const [load, setLoad] = useState<boolean>(false)
  const [bio, setBio] = useState(user?.bio ?? "")
  const [preview, setPreview] = useState(user?.avatar || userPhoto);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);







  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };






  const handleSave = async () => {
    setLoad(true)
    try {
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("bio", bio);
      if (imageFile) {
        formData.append("file", imageFile);
      }
      const result = await updateUserInfo(formData);

      if (result?.data?.success) {

        refetchUser()
        Toast({ type: 'success', message: result?.data?.message })
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoad(false)
    }
  };

  const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const currentPassword = form.currentPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-slate-300 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-800 bg-linear-to-r from-slate-900 to-slate-800 px-6 py-5">
            <div className="flex items-center gap-3">
              <User size={22} className="text-blue-400" />
              <div>
                <h2 className="text-xl font-bold text-white">
                  Profile Settings
                </h2>
                <p className="text-sm text-slate-400">
                  Manage your account information
                </p>
              </div>
            </div>


          </div>

          <div className="p-6 md:p-8">
            {/* Avatar Section */}
            <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-slate-800">
              <div className="relative group">
                <img
                  src={preview}
                  alt="avatar"
                  className="h-28 w-28 rounded-full object-cover border-4 border-slate-700 shadow-xl"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition"
                >
                  <Camera size={16} className="text-white" />
                </button>


              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  Profile Picture
                </h3>

                <p className="text-sm text-slate-400">
                  Upload JPG, PNG or WEBP image
                </p>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700 transition"
                >
                  <Upload size={16} />
                  Upload New Image
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

            </div>


            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

              {/* Name */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-slate-500"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Role
                </label>

                <input
                  type="text"
                  value={user?.role}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-slate-500 capitalize"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Bio
                </label>

                <textarea
                  defaultValue={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Write something about yourself..."
                />
              </div>

            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 active:scale-95"
              >
                <Save size={18} />
                {load ? 'Updating..' : 'Save Changes'}
              </button>
            </div>
          </div>
        </section>
      </div>










      <section className="rounded-2xl max-w-5xl mx-auto my-4 border border-slate-800 bg-[#111827] shadow-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-6 py-5">
          {/* <Lock size={20} className="text-blue-400" /> */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              Change Password
            </h2>
            <p className="text-xs text-slate-400">
              Update your account security
            </p>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={changePassword} className="p-6 md:p-8 space-y-6">

          {/* Current Password */}
          <div className="space-y-2 md:w-1/2">
            <label className="text-xs font-medium text-slate-400 tracking-wider">
              Current Password
            </label>

            <input
              name="currentPassword"
              required

              type="password"
              placeholder="Enter current password"
              className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
            />
          </div>

          {/* New Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 tracking-wider">
                New Password
              </label>

              <input
                name="newPassword"
                required

                type="password"
                placeholder="Enter new password"
                className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-400 tracking-wider">
                Confirm Password
              </label>

              <input
                name="confirmPassword"
                required

                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-700 bg-[#0f172a] px-4 py-3 text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700 active:scale-95"
            >
              <KeyRound size={18} />
              Update Password
            </button>
          </div>

        </form>
      </section>
    </div>
  );
};

export default SettginsPage;













