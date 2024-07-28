import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeProfileType } from "@/schemas/user.schema";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { imageUrl } from "@/utils/imageUrl";
import { TUser } from "@/models/user.model";

export const ProfileAvatarInput = ({
  form,
  user,
  setIsChange
}: {
  form: UseFormReturn<ChangeProfileType>;
  user: TUser;
  setIsChange: (state: boolean) => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChange(false)
    const file = e.target.files?.[0];
    form.setValue("avatar", file);
  };

  return (
    <FormField
      control={form.control}
      name="avatar"
      render={({ field: { value, onChange, ...field }, formState: { isSubmitting } }) => (
        <FormItem className="mx-auto w-fit">
          <FormLabel className="flex flex-col items-center justify-center gap-3">
            <span className="block">Profile Picture</span>
            <Image
              src={form.getValues("avatar") ? window.URL.createObjectURL(form.getValues("avatar")!) : imageUrl.render(user.avatar?.name)}
              alt="Profile Picture"
              height={150}
              width={150}
              className="aspect-square cursor-pointer overflow-hidden rounded-full border-4 object-cover"
              sizes="150px"
            />
          </FormLabel>

          <FormControl>
            <Input accept="image/*" type="file" className="hidden" disabled={isSubmitting} onChange={handleChange} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
